// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const allItems = [
//   { cat: 'hair', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=650&fit=crop', title: 'رنگ کاراملی طبیعی', salon: 'سالن رزا', price: '۸۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
//   { cat: 'brow', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=600&fit=crop', title: 'میکروبلیدینگ طبیعی', salon: 'کلینیک نگار', price: '۱,۸۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
//   { cat: 'lip', img: '/images/hairC.webp', title: 'تاتو لب هلویی', salon: 'کلینیک نگار', price: '۲,۳۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
//   { cat: 'hair', img: '/images/hairC3.webp', title: 'بلوند عسلی با هایلایت', salon: 'آتلیه مریم', price: '۱,۲۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
//   { cat: 'lip', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop', title: 'رژ لب دائم قرمز مخملی', salon: 'سالن رزا', price: '۲,۰۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
//   { cat: 'brow', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=580&fit=crop', title: 'طراحی ابروی کلاسیک', salon: 'سالن ترمه', price: '۳۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
//   { cat: 'hair', img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=500&h=620&fit=crop', title: 'مش شکلاتی', salon: 'سالن ترمه', price: '۹۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
//   { cat: 'brow', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=660&fit=crop', title: 'ابروی محو پودری', salon: 'کلینیک نگار', price: '۲,۱۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
//   { cat: 'lip', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=560&fit=crop', title: 'طراحی فرم لب', salon: 'سالن ترمه', price: '۹۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
//   { cat: 'hair', img: 'https://images.unsplash.com/photo-1519752594763-9edcc60c73c3?w=500&h=640&fit=crop', title: 'رنگ مسی روشن', salon: 'سالن رزا', price: '۷۹۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
//   { cat: 'brow', img: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=500&h=600&fit=crop', title: 'لمینت ابرو', salon: 'آتلیه مریم', price: '۶۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
//   { cat: 'lip', img: 'https://images.unsplash.com/photo-1512207736890-6ffed4bbf5f3?w=500&h=650&fit=crop', title: 'تاتو لب رزگلد', salon: 'آتلیه مریم', price: '۲,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
//   { cat: 'hair', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=700&fit=crop', title: 'بلوند پلاتینه', salon: 'آتلیه مریم', price: '۱,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
// ];

// const catLabel = { hair: 'رنگ مو', brow: 'ابرو', lip: 'لب' };

// export default function Explorer() {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
  
//   // AI Try-On State
//   const [userPhotoDataUrl, setUserPhotoDataUrl] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [matchScore, setMatchScore] = useState(null);
//   const [requestSent, setRequestSent] = useState(false);

//   const resultBoxRef = useRef(null);

//   // دیپ‌لینک برای باز کردن صفحه با هش مشخص مثل #hair
//   useEffect(() => {
//     const hash = window.location.hash.replace('#', '');
//     if (['hair', 'brow', 'lip'].includes(hash)) {
//       setActiveFilter(hash);
//     }
//   }, []);

//   // کنترل اسکرول بادی در زمان باز بودن مودال
//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [isModalOpen]);

//   // فیلتر کردن تصاویر
//   const filteredItems = allItems.filter(it => {
//     const matchCat = activeFilter === 'all' || it.cat === activeFilter;
//     const matchSearch = (it.title + it.salon).toLowerCase().includes(searchTerm.toLowerCase());
//     return matchCat && matchSearch;
//   });

//   const openModal = (item) => {
//     setCurrentItem(item);
//     // ریست کردن استیت‌های داخل مودال
//     setUserPhotoDataUrl(null);
//     setShowResult(false);
//     setRequestSent(false);
//     setIsProcessing(false);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       setUserPhotoDataUrl(ev.target.result);
//       setShowResult(false); // مخفی کردن نتیجه در صورت تغییر عکس
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleTryAI = () => {
//     if (!userPhotoDataUrl) return;
//     setIsProcessing(true);
    
//     // شبیه‌سازی پروسه پردازش هوش مصنوعی
//     setTimeout(() => {
//       setIsProcessing(false);
//       setMatchScore(Math.floor(Math.random() * 13) + 85);
//       setShowResult(true);
      
//       // اسکرول نرم به سمت نتیجه
//       if (resultBoxRef.current) {
//         resultBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//       }
//     }, 1800);
//   };

//   const handleRequestClick = () => {
//     setRequestSent(true);
//   };

//   return (
//     <>
//       <Header/>

//       <section className="explorer-hero mt-4">
//         <div className="container">
//           <h1>اکسپلور نمونه‌کارها</h1>
//           <p>بین نمونه‌کارهای واقعی آرایشگرها بگرد، هر کدوم رو پسندیدی روش بزن و با عکس خودت امتحانش کن.</p>
//         </div>
//       </section>

//       <div className="filter-bar">
//         <div className="container">
//           <div className="filter-row">
//             <div className="search-box">
//               <i className="lucide lucide-search"></i>
//               <input
//                 type="text"
//                 placeholder="جستجو بین نمونه‌کارها یا نام آرایشگاه..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <button className={`chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
//               <i className="lucide lucide-layout-grid"></i> همه
//             </button>
//             <button className={`chip ${activeFilter === 'hair' ? 'active' : ''}`} onClick={() => setActiveFilter('hair')}>
//               <i className="lucide lucide-palette"></i> رنگ مو
//             </button>
//             <button className={`chip ${activeFilter === 'brow' ? 'active' : ''}`} onClick={() => setActiveFilter('brow')}>
//               <i className="lucide lucide-eye"></i> ابرو
//             </button>
//             <button className={`chip ${activeFilter === 'lip' ? 'active' : ''}`} onClick={() => setActiveFilter('lip')}>
//               <i className="lucide lucide-smile"></i> لب
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="gallery">
//           {filteredItems.map((it, i) => (
//             <div
//               key={i}
//               className="tile"
//               style={{ animationDelay: `${i * 0.04}s` }}
//               onClick={() => openModal(it)}
//             >
//               <img src={it.img} alt={it.title} loading="lazy" />
//               <div className="tile-overlay">
//                 <span className="cat-pill">{catLabel[it.cat]}</span>
//                 <h4>{it.title}</h4>
//                 <span>{it.salon} · {it.price}</span>
//                 <span className="try-btn"><i className="lucide lucide-camera"></i> امتحان با عکس من</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         <div className={`empty-state ${filteredItems.length === 0 ? 'show' : ''}`}>
//           <i className="lucide lucide-search-x"></i>
//           <h3>چیزی پیدا نشد</h3>
//           <p>فیلتر یا عبارت جستجو رو تغییر بده</p>
//         </div>
//       </div>

//       <footer className="explorer-footer">
//         <div className="container">© ۱۴۰۵ BSV Group — همه‌چیز فقط برای تست است، خریدی در سایت انجام نمی‌شود</div>
//       </footer>

//       {/* MODAL */}
//       <div 
//         className={`modal-backdrop ${isModalOpen ? 'open' : ''}`} 
//         onClick={(e) => {
//           if (e.target === e.currentTarget) closeModal();
//         }}
//       >
//         <div className="modal-box">
//           <div className="modal-close" onClick={closeModal}>✕</div>
          
//           {currentItem && (
//             <div className="modal-grid">
//               <div className="modal-ref">
//                 <img src={currentItem.img} alt={currentItem.title} />
//                 <div className="ref-tag">{catLabel[currentItem.cat]}</div>
//               </div>
//               <div className="modal-body">
//                 <span className="cat-pill">{catLabel[currentItem.cat]}</span>
//                 <h3>{currentItem.title}</h3>
//                 <div className="salon-line">
//                   <img src={currentItem.salonImg} alt={currentItem.salon} />
//                   <span>{currentItem.salon}</span>
//                 </div>
//                 <div className="price-line">قیمت تقریبی: <b>{currentItem.price}</b></div>

//                 <label className={`upload-zone ${userPhotoDataUrl ? 'has-img' : ''}`}>
//                   <input type="file" accept="image/*" onChange={handleFileUpload} />
//                   {!userPhotoDataUrl ? (
//                     <div>
//                       <i className="lucide lucide-image-plus"></i>
//                       <h5>عکس خودت رو آپلود کن</h5>
//                       <span>یک عکس واضح و روبه‌رو از صورت یا موی خودت انتخاب کن</span>
//                     </div>
//                   ) : (
//                     <div className="upload-preview-wrap">
//                       <img className="upload-preview" src={userPhotoDataUrl} alt="User Upload" />
//                       <span className="upload-change">تغییر عکس</span>
//                     </div>
//                   )}
//                 </label>

//                 <button
//                   className={`try-btn-main ${isProcessing ? 'loading' : ''}`}
//                   disabled={!userPhotoDataUrl || isProcessing}
//                   onClick={handleTryAI}
//                 >
//                   <span className="spinner"></span>
//                   <span className="btn-label"><i className="lucide lucide-sparkles"></i> امتحان با هوش مصنوعی</span>
//                 </button>

//                 <div 
//                   ref={resultBoxRef} 
//                   className={`result-box ${showResult ? 'show' : ''}`}
//                 >
//                   <div className="result-img">
//                     <img src={userPhotoDataUrl} alt="Result Preview" />
//                   </div>
//                   <div className="match-score">
//                     <span className="label">میزان تناسب با چهره شما</span>
//                     <span className="score">{matchScore}٪</span>
//                   </div>
                  
//                   <button 
//                     className="request-btn"
//                     onClick={handleRequestClick}
//                     style={requestSent ? { background: '#4C8C6B', color: '#fff' } : {}}
//                   >
//                     {requestSent ? (
//                       <><i className="lucide lucide-check"></i> درخواست شما ثبت شد</>
//                     ) : (
//                       <><i className="lucide lucide-calendar-check"></i> درخواست نوبت از این آرایشگاه</>
//                     )}
//                   </button>
//                   <div className="disclaimer">نتیجه فقط جهت پیش‌نمایش است؛ خرید یا پرداختی در سایت انجام نمی‌شود.</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const allItems = [
  { cat: 'hair', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=650&fit=crop', title: 'رنگ کاراملی طبیعی', salon: 'سالن رزا', price: '۸۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
  { cat: 'brow', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=600&fit=crop', title: 'میکروبلیدینگ طبیعی', salon: 'کلینیک نگار', price: '۱,۸۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
  { cat: 'lip', img: '/images/hairC.webp', title: 'تاتو لب هلویی', salon: 'کلینیک نگار', price: '۲,۳۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
  { cat: 'hair', img: '/images/hairC3.webp', title: 'بلوند عسلی با هایلایت', salon: 'آتلیه مریم', price: '۱,۲۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
  { cat: 'lip', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop', title: 'رژ لب دائم قرمز مخملی', salon: 'سالن رزا', price: '۲,۰۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
  { cat: 'brow', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=580&fit=crop', title: 'طراحی ابروی کلاسیک', salon: 'سالن ترمه', price: '۳۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
  { cat: 'hair', img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=500&h=620&fit=crop', title: 'مش شکلاتی', salon: 'سالن ترمه', price: '۹۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
  { cat: 'brow', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=660&fit=crop', title: 'ابروی محو پودری', salon: 'کلینیک نگار', price: '۲,۱۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
  { cat: 'lip', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=560&fit=crop', title: 'طراحی فرم لب', salon: 'سالن ترمه', price: '۹۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
  { cat: 'hair', img: 'https://images.unsplash.com/photo-1519752594763-9edcc60c73c3?w=500&h=640&fit=crop', title: 'رنگ مسی روشن', salon: 'سالن رزا', price: '۷۹۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
  { cat: 'brow', img: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=500&h=600&fit=crop', title: 'لمینت ابرو', salon: 'آتلیه مریم', price: '۶۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
  { cat: 'lip', img: 'https://images.unsplash.com/photo-1512207736890-6ffed4bbf5f3?w=500&h=650&fit=crop', title: 'تاتو لب رزگلد', salon: 'آتلیه مریم', price: '۲,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
  { cat: 'hair', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=700&fit=crop', title: 'بلوند پلاتینه', salon: 'آتلیه مریم', price: '۱,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
];

const catLabel = { hair: 'رنگ مو', brow: 'ابرو', lip: 'لب' };

export default function Explorer() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // AI Try-On State
  const [userPhotoDataUrl, setUserPhotoDataUrl] = useState(null);
  const [resultPhotoDataUrl, setResultPhotoDataUrl] = useState(null); // اضافه شده برای عکس خروجی از سرور
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [matchScore, setMatchScore] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const resultBoxRef = useRef(null);

  // دیپ‌لینک برای باز کردن صفحه با هش مشخص مثل #hair
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (['hair', 'brow', 'lip'].includes(hash)) {
      setActiveFilter(hash);
    }
  }, []);

  // کنترل اسکرول بادی در زمان باز بودن مودال
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  // فیلتر کردن تصاویر
  const filteredItems = allItems.filter(it => {
    const matchCat = activeFilter === 'all' || it.cat === activeFilter;
    const matchSearch = (it.title + it.salon).toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const openModal = (item) => {
    setCurrentItem(item);
    // ریست کردن استیت‌های داخل مودال
    setUserPhotoDataUrl(null);
    setResultPhotoDataUrl(null); // ریست کردن عکس خروجی قبلی
    setShowResult(false);
    setRequestSent(false);
    setIsProcessing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserPhotoDataUrl(ev.target.result);
      setResultPhotoDataUrl(null); // مخفی کردن عکس خروجی قبلی در صورت تغییر عکس کاربر
      setShowResult(false); 
    };
    reader.readAsDataURL(file);
  };

  const handleTryAI = async () => {
    if (!userPhotoDataUrl || !currentItem) return;
    setIsProcessing(true);
    setShowResult(false);
    
    try {
      // اگر عکس مرجع لینک خارجی نیست و داخل پوشه public است، آن را به آدرس کامل تبدیل می‌کنیم
      let refImageUrl = currentItem.img;
      if (refImageUrl.startsWith('/')) {
         refImageUrl = window.location.origin + refImageUrl;
      }
      
      // فراخوانی API سرور Node.js واسط
      // فراخوانی API از طریق آدرس آنلاین Ngrok
      // نمونه کد کلاینت در فرانت‌اِند شما
      // https://5b44-2606-2040-3800-4c-00-23.ngrok-free.app
const response = await fetch('https://953b-2606-2040-3800-4c-00-23.ngrok-free.app/api/try-on', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true' // این خط حیاتی است!
  },
  body: JSON.stringify({
    userImageBase64: userPhotoDataUrl, // یا هر ساختاری که قبلاً برای کدهایتان زدید
    refImageUrl: refImageUrl
  })
});

      const data = await response.json();

      if (data.success) {
        // دریافت عکس از سرور و نمایش آن
        setResultPhotoDataUrl(data.resultImage); 
        setMatchScore(Math.floor(Math.random() * 13) + 85);
        setShowResult(true);
        
        // اسکرول نرم به سمت نتیجه
        setTimeout(() => {
          if (resultBoxRef.current) {
            resultBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      } else {
        alert('خطا در پردازش تصویر: ' + (data.error || 'ارور نامشخص'));
      }

    } catch (error) {
      console.error(error);
      alert('ارتباط با سرور برقرار نشد. لطفاً مطمئن شوید بک‌اند روشن است.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRequestClick = () => {
    setRequestSent(true);
  };

  return (
    <>
      <Header/>

      <section className="explorer-hero mt-4">
        <div className="container">
          <h1>اکسپلور نمونه‌کارها</h1>
          <p>بین نمونه‌کارهای واقعی آرایشگرها بگرد، هر کدوم رو پسندیدی روش بزن و با عکس خودت امتحانش کن.</p>
        </div>
      </section>

      <div className="filter-bar">
        <div className="container">
          <div className="filter-row">
            <div className="search-box">
              <i className="lucide lucide-search"></i>
              <input
                type="text"
                placeholder="جستجو بین نمونه‌کارها یا نام آرایشگاه..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={`chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
              <i className="lucide lucide-layout-grid"></i> همه
            </button>
            <button className={`chip ${activeFilter === 'hair' ? 'active' : ''}`} onClick={() => setActiveFilter('hair')}>
              <i className="lucide lucide-palette"></i> رنگ مو
            </button>
            <button className={`chip ${activeFilter === 'brow' ? 'active' : ''}`} onClick={() => setActiveFilter('brow')}>
              <i className="lucide lucide-eye"></i> ابرو
            </button>
            <button className={`chip ${activeFilter === 'lip' ? 'active' : ''}`} onClick={() => setActiveFilter('lip')}>
              <i className="lucide lucide-smile"></i> لب
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="gallery">
          {filteredItems.map((it, i) => (
            <div
              key={i}
              className="tile"
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => openModal(it)}
            >
              <img src={it.img} alt={it.title} loading="lazy" />
              <div className="tile-overlay">
                <span className="cat-pill">{catLabel[it.cat]}</span>
                <h4>{it.title}</h4>
                <span>{it.salon} · {it.price}</span>
                <span className="try-btn"><i className="lucide lucide-camera"></i> امتحان با عکس من</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div className={`empty-state ${filteredItems.length === 0 ? 'show' : ''}`}>
          <i className="lucide lucide-search-x"></i>
          <h3>چیزی پیدا نشد</h3>
          <p>فیلتر یا عبارت جستجو رو تغییر بده</p>
        </div>
      </div>

      <Footer/>

      {/* MODAL */}
      <div
  className={`modal-backdrop-custom ${isModalOpen ? "open" : ""}`}
  onClick={(e) => {
    if (e.target === e.currentTarget) closeModal();
  }}
>
  <div className="modal-custom">
    <div className="modal-close-custom" onClick={closeModal}>
      ✕
    </div>

    {currentItem && (
      <>
        <h3 className="fs-5 fw-extrabold text-plum mb-1">
          {currentItem.title}
        </h3>

        <p className="small text-muted-custom mb-4">
          عکس واضح و روبه‌رو از موی خودت آپلود کن
        </p>

        <label
          className={`upload-zone ${
            userPhotoDataUrl ? "has-img" : ""
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="d-none"
          />

          {userPhotoDataUrl ? (
            <img
              src={userPhotoDataUrl}
              alt="User Preview"
              className="upload-preview"
            />
          ) : (
            <div>
              <i className="lucide lucide-image-plus text-gold mb-2"></i>

              <h5 className="fs-6 fw-bold text-plum mb-1">
                عکس خودت رو آپلود کن
              </h5>

              <span
                className="small text-muted-custom"
                style={{ fontSize: "12px" }}
              >
                یک عکس واضح و روبه‌رو از صورت یا موی خودت انتخاب کن
              </span>

              <br />

              <span
                className="small text-muted-custom"
                style={{ fontSize: "12px" }}
              >
                فرمت JPG یا PNG
              </span>
            </div>
          )}
        </label>

        <button
          className="try-btn-main"
          disabled={!userPhotoDataUrl || isProcessing}
          onClick={handleTryAI}
        >
          {isProcessing ? (
            <span className="spinner-custom"></span>
          ) : (
            <>
              <i className="lucide lucide-sparkles"></i>
              <span className="btn-label">
                امتحان با هوش مصنوعی
              </span>
            </>
          )}
        </button>

        <div
          ref={resultBoxRef}
          className={`result-box-custom ${
            showResult ? "show" : ""
          }`}
        >
          {(resultPhotoDataUrl || userPhotoDataUrl) && (
            <img
              src={resultPhotoDataUrl || userPhotoDataUrl}
              alt="AI Result"
              className="w-100 rounded-3 mb-3"
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />
          )}

          <div className="match-score d-flex align-items-center justify-content-between bg-custom-soft p-3 rounded-3 mb-3">
            <span className="small text-muted-custom fw-semibold">
              میزان تناسب با چهره شما
            </span>

            <span className="fs-5 fw-extrabold text-gold">
              {matchScore}٪
            </span>
          </div>

          <button
            className="request-btn-custom fw-bold"
            onClick={handleRequestClick}
            style={
              requestSent
                ? {
                    background: "#4C8C6B",
                    color: "#fff",
                  }
                : {}
            }
          >
            {requestSent ? (
              <>
                <i className="lucide lucide-check"></i>
                درخواست شما ثبت شد
              </>
            ) : (
              <>
                <i className="lucide lucide-calendar-check"></i>
                درخواست نوبت از {currentItem.salon}
              </>
            )}
          </button>

          <div
            className="small text-muted-custom text-center mt-2"
            style={{ fontSize: "11.5px" }}
          >
            نتیجه فقط جهت پیش‌نمایش است؛ خرید یا پرداختی در سایت انجام
            نمی‌شود.
          </div>
        </div>
      </>
    )}
  </div>
</div>
    </>
  );
}