// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const FormData = require('form-data');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();
// app.use(cors());
// // افزایش محدودیت حجم برای دریافت عکس‌های Base64
// app.use(bodyParser.json({ limit: '50mb' }));

// // آدرس سرور ComfyUI (معمولا پورت 8188 است)
// const COMFYUI_URL = 'http://127.0.0.1:8188';

// // آپلود عکس به ComfyUI
// async function uploadToComfyUI(imageBuffer, filename) {
//     const formData = new FormData();
//     formData.append('image', imageBuffer, { filename });

//     const response = await axios.post(`${COMFYUI_URL}/upload/image`, formData, {
//         headers: formData.getHeaders()
//     });
//     return response.data.name; // نام فایلی که ComfyUI ذخیره کرده است
// }

// // چک کردن وضعیت پردازش و دریافت نتیجه
// async function getComfyUIResult(promptId) {
//     return new Promise((resolve, reject) => {
//         const interval = setInterval(async () => {
//             try {
//                 const historyRes = await axios.get(`${COMFYUI_URL}/history/${promptId}`);
//                 if (historyRes.data[promptId]) {
//                     clearInterval(interval);
//                     // پیدا کردن نام عکس خروجی از نود شماره 94 (SaveImage)
//                     const outputs = historyRes.data[promptId].outputs;
//                     const outputNode = outputs['94']; 
//                     if (outputNode && outputNode.images && outputNode.images.length > 0) {
//                         const filename = outputNode.images[0].filename;
                        
//                         // دانلود عکس نهایی از ComfyUI و تبدیل به Base64
//                         const imageRes = await axios.get(`${COMFYUI_URL}/view?filename=${filename}&type=output`, {
//                             responseType: 'arraybuffer'
//                         });
//                         const base64Image = Buffer.from(imageRes.data, 'binary').toString('base64');
//                         resolve(`data:image/png;base64,${base64Image}`);
//                     } else {
//                         reject('No image found in output');
//                     }
//                 }
//             } catch (error) {
//                 clearInterval(interval);
//                 reject(error);
//             }
//         }, 3000); // هر 3 ثانیه وضعیت را چک میکند
//     });
// }

// app.post('/api/try-on', async (req, res) => {
//     try {
//         const { userImageBase64, refImageUrl } = req.body;

//         // 1. آماده‌سازی عکس کاربر (حذف هدر data:image/...;base64)
//         const userImgBuffer = Buffer.from(userImageBase64.split(',')[1], 'base64');
//         const userImgName = `user_${Date.now()}.png`;

//         // 2. آماده‌سازی عکس مرجع (دانلود از URL یا دریافت به صورت Base64)
//         let refImgBuffer;
//         if (refImageUrl.startsWith('http')) {
//             const response = await axios.get(refImageUrl, { responseType: 'arraybuffer' });
//             refImgBuffer = Buffer.from(response.data);
//         } else {
//             // اگر عکس لوکال است (مثل /images/hairC.webp)، باید از فرانت‌اند Base64 آن ارسال شود.
//             // برای سادگی در این کد فرض میکنیم فرانت همواره Base64 میفرستد یا URL کامل.
//             throw new Error("Reference image must be a full URL for the backend to fetch it.");
//         }
//         const refImgName = `ref_${Date.now()}.png`;

//         // 3. آپلود عکس‌ها در ComfyUI
//         const finalUserImgName = await uploadToComfyUI(userImgBuffer, userImgName);
//         const finalRefImgName = await uploadToComfyUI(refImgBuffer, refImgName);

//         // 4. بارگذاری فایل JSON (تمپلیت شما)
//         // برای خلوت شدن کد، فایل جیسون را از یک فایل کنار سرور میخوانیم
//         const workflow = JSON.parse(fs.readFileSync('./salon.json', 'utf8'));

//         // 5. جایگذاری نام عکس‌ها در نودهای مربوطه
//         workflow["76"].inputs.image = finalUserImgName; // نود عکس کاربر
//         workflow["81"].inputs.image = finalRefImgName;  // نود عکس مرجع

//         // 6. ارسال دستور پردازش به ComfyUI
//         const promptRes = await axios.post(`${COMFYUI_URL}/prompt`, { prompt: workflow });
//         const promptId = promptRes.data.prompt_id;

//         // 7. صبر کردن برای نتیجه و ارسال به فرانت‌اند
//         const resultImageBase64 = await getComfyUIResult(promptId);
        
//         res.json({ success: true, resultImage: resultImageBase64 });

//     } catch (error) {
//         console.error("Error processing AI request:", error);
//         res.status(500).json({ success: false, error: 'AI processing failed' });
//     }
// });

// const PORT = 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));













const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();

// CORS باز برای همه‌ی origin ها (Netlify + هر دستگاهی)
app.use(cors());
// جایگزین کن با:
app.options(/.*/, cors());

app.use(bodyParser.json({ limit: '50mb' }));

const COMFYUI_URL = process.env.COMFYUI_URL || 'http://127.0.0.1:8188';

// ------------------------------------------------------------------
// حافظه‌ی موقت جاب‌ها (برای پروژه‌ی بزرگ‌تر بعداً می‌تونی Redis بذاری)
// ------------------------------------------------------------------
const jobs = new Map(); // jobId -> { status, resultImage?, error?, createdAt }

// پاک‌سازی جاب‌های قدیمی‌تر از ۳۰ دقیقه، هر ۱۰ دقیقه یک‌بار
setInterval(() => {
  const now = Date.now();
  for (const [id, job] of jobs.entries()) {
    if (now - job.createdAt > 30 * 60 * 1000) jobs.delete(id);
  }
}, 10 * 60 * 1000);

// ------------------------------------------------------------------
// هلث‌چک — فرانت قبل از هر پردازش این رو پینگ می‌کنه
// ------------------------------------------------------------------
app.get('/api/try-on', async (req, res) => {
  try {
    // چک می‌کنیم خود ComfyUI هم بالاست، نه فقط نود سرور
    await axios.get(`${COMFYUI_URL}/system_stats`, { timeout: 4000 });
    res.json({ ok: true, comfyui: true, time: Date.now() });
  } catch (e) {
    res.status(503).json({ ok: false, comfyui: false, error: 'ComfyUI در دسترس نیست' });
  }
});

// ------------------------------------------------------------------
// آپلود عکس به ComfyUI
// ------------------------------------------------------------------
async function uploadToComfyUI(imageBuffer, filename) {
  const formData = new FormData();
  formData.append('image', imageBuffer, { filename });
  const response = await axios.post(`${COMFYUI_URL}/upload/image`, formData, {
    headers: formData.getHeaders(),
    timeout: 30000
  });
  return response.data.name;
}

// ------------------------------------------------------------------
// منتظر ماندن برای نتیجه — با سقف زمانی مشخص (بدون leak)
// ------------------------------------------------------------------
async function getComfyUIResult(promptId, { maxWaitMs = 180000, intervalMs = 3000 } = {}) {
  const started = Date.now();
  while (Date.now() - started < maxWaitMs) {
    try {
      const historyRes = await axios.get(`${COMFYUI_URL}/history/${promptId}`, { timeout: 10000 });
      if (historyRes.data[promptId]) {
        const outputs = historyRes.data[promptId].outputs;
        const outputNode = outputs['94'];
        if (outputNode && outputNode.images && outputNode.images.length > 0) {
          const filename = outputNode.images[0].filename;
          const imageRes = await axios.get(
            `${COMFYUI_URL}/view?filename=${filename}&type=output`,
            { responseType: 'arraybuffer', timeout: 30000 }
          );
          const base64Image = Buffer.from(imageRes.data, 'binary').toString('base64');
          return `data:image/png;base64,${base64Image}`;
        }
        throw new Error('خروجی تصویر در نود مربوطه یافت نشد');
      }
    } catch (err) {
      // اگر خطای موقتی شبکه بود، ادامه بده تا سقف زمانی؛ اگر منطقی بود throw کن
      if (err.message.includes('یافت نشد')) throw err;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error('پردازش بیش از حد طول کشید (timeout)');
}

// ------------------------------------------------------------------
// اجرای واقعی پردازش در پس‌زمینه
// ------------------------------------------------------------------
async function processJob(jobId, { userImageBase64, refImageUrl }) {
  try {
    const userImgBuffer = Buffer.from(userImageBase64.split(',')[1], 'base64');
    const userImgName = `user_${Date.now()}.png`;

    let refImgBuffer;
    if (refImageUrl.startsWith('http')) {
      const response = await axios.get(refImageUrl, { responseType: 'arraybuffer', timeout: 20000 });
      refImgBuffer = Buffer.from(response.data);
    } else {
      throw new Error('Reference image must be a full URL');
    }
    const refImgName = `ref_${Date.now()}.png`;

    const finalUserImgName = await uploadToComfyUI(userImgBuffer, userImgName);
    const finalRefImgName = await uploadToComfyUI(refImgBuffer, refImgName);

    const workflow = JSON.parse(fs.readFileSync('./salon.json', 'utf8'));
    workflow['76'].inputs.image = finalUserImgName;
    workflow['81'].inputs.image = finalRefImgName;

    const promptRes = await axios.post(`${COMFYUI_URL}/prompt`, { prompt: workflow }, { timeout: 15000 });
    const promptId = promptRes.data.prompt_id;

    const resultImageBase64 = await getComfyUIResult(promptId);

    jobs.set(jobId, { status: 'done', resultImage: resultImageBase64, createdAt: jobs.get(jobId).createdAt });
  } catch (error) {
    console.error('Job failed:', jobId, error.message);
    jobs.set(jobId, {
      status: 'error',
      error: error.message || 'پردازش هوش مصنوعی با خطا مواجه شد',
      createdAt: jobs.get(jobId)?.createdAt || Date.now()
    });
  }
}

// ------------------------------------------------------------------
// شروع کار — بلافاصله jobId برمی‌گردونه، صبر نمی‌کنه
// ------------------------------------------------------------------
app.post('/api/try-on/start', (req, res) => {
  const { userImageBase64, refImageUrl } = req.body;
  if (!userImageBase64 || !refImageUrl) {
    return res.status(400).json({ success: false, error: 'ورودی ناقص است' });
  }

  const jobId = crypto.randomUUID();
  jobs.set(jobId, { status: 'processing', createdAt: Date.now() });

  // اجرای async بدون بلاک کردن پاسخ
  processJob(jobId, { userImageBase64, refImageUrl });

  res.json({ success: true, jobId });
});

// ------------------------------------------------------------------
// چک وضعیت — فرانت هر ۲-۳ ثانیه این رو صدا می‌زنه
// ------------------------------------------------------------------
app.get('/api/try-on/status/:jobId', (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job) return res.status(404).json({ status: 'not_found' });
  res.json(job);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));