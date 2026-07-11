// // "use client";

// // import React, { useState, useEffect, useRef } from 'react';
// // import Link from 'next/link';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';

// // const allItems = [
// //   { cat: 'hair', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=650&fit=crop', title: 'رنگ کاراملی طبیعی', salon: 'سالن رزا', price: '۸۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
// //   { cat: 'brow', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=600&fit=crop', title: 'میکروبلیدینگ طبیعی', salon: 'کلینیک نگار', price: '۱,۸۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
// //   { cat: 'lip', img: '/images/hairC.webp', title: 'تاتو لب هلویی', salon: 'کلینیک نگار', price: '۲,۳۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
// //   { cat: 'hair', img: '/images/hairC3.webp', title: 'بلوند عسلی با هایلایت', salon: 'آتلیه مریم', price: '۱,۲۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
// //   { cat: 'lip', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop', title: 'رژ لب دائم قرمز مخملی', salon: 'سالن رزا', price: '۲,۰۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
// //   { cat: 'brow', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=580&fit=crop', title: 'طراحی ابروی کلاسیک', salon: 'سالن ترمه', price: '۳۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
// //   { cat: 'hair', img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=500&h=620&fit=crop', title: 'مش شکلاتی', salon: 'سالن ترمه', price: '۹۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
// //   { cat: 'brow', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=660&fit=crop', title: 'ابروی محو پودری', salon: 'کلینیک نگار', price: '۲,۱۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
// //   { cat: 'lip', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=560&fit=crop', title: 'طراحی فرم لب', salon: 'سالن ترمه', price: '۹۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
// //   { cat: 'hair', img: 'https://images.unsplash.com/photo-1519752594763-9edcc60c73c3?w=500&h=640&fit=crop', title: 'رنگ مسی روشن', salon: 'سالن رزا', price: '۷۹۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
// //   { cat: 'brow', img: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=500&h=600&fit=crop', title: 'لمینت ابرو', salon: 'آتلیه مریم', price: '۶۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
// //   { cat: 'lip', img: 'https://images.unsplash.com/photo-1512207736890-6ffed4bbf5f3?w=500&h=650&fit=crop', title: 'تاتو لب رزگلد', salon: 'آتلیه مریم', price: '۲,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
// //   { cat: 'hair', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=700&fit=crop', title: 'بلوند پلاتینه', salon: 'آتلیه مریم', price: '۱,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
// // ];

// // const catLabel = { hair: 'رنگ مو', brow: 'ابرو', lip: 'لب' };

// // export default function Explorer() {
// //   const [activeFilter, setActiveFilter] = useState('all');
// //   const [searchTerm, setSearchTerm] = useState('');
  
// //   // Modal State
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [currentItem, setCurrentItem] = useState(null);
  
// //   // AI Try-On State
// //   const [userPhotoDataUrl, setUserPhotoDataUrl] = useState(null);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [showResult, setShowResult] = useState(false);
// //   const [matchScore, setMatchScore] = useState(null);
// //   const [requestSent, setRequestSent] = useState(false);

// //   const resultBoxRef = useRef(null);

// //   // دیپ‌لینک برای باز کردن صفحه با هش مشخص مثل #hair
// //   useEffect(() => {
// //     const hash = window.location.hash.replace('#', '');
// //     if (['hair', 'brow', 'lip'].includes(hash)) {
// //       setActiveFilter(hash);
// //     }
// //   }, []);

// //   // کنترل اسکرول بادی در زمان باز بودن مودال
// //   useEffect(() => {
// //     if (isModalOpen) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = '';
// //     }
// //     return () => { document.body.style.overflow = ''; };
// //   }, [isModalOpen]);

// //   // فیلتر کردن تصاویر
// //   const filteredItems = allItems.filter(it => {
// //     const matchCat = activeFilter === 'all' || it.cat === activeFilter;
// //     const matchSearch = (it.title + it.salon).toLowerCase().includes(searchTerm.toLowerCase());
// //     return matchCat && matchSearch;
// //   });

// //   const openModal = (item) => {
// //     setCurrentItem(item);
// //     // ریست کردن استیت‌های داخل مودال
// //     setUserPhotoDataUrl(null);
// //     setShowResult(false);
// //     setRequestSent(false);
// //     setIsProcessing(false);
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //   };

// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = (ev) => {
// //       setUserPhotoDataUrl(ev.target.result);
// //       setShowResult(false); // مخفی کردن نتیجه در صورت تغییر عکس
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleTryAI = () => {
// //     if (!userPhotoDataUrl) return;
// //     setIsProcessing(true);
    
// //     // شبیه‌سازی پروسه پردازش هوش مصنوعی
// //     setTimeout(() => {
// //       setIsProcessing(false);
// //       setMatchScore(Math.floor(Math.random() * 13) + 85);
// //       setShowResult(true);
      
// //       // اسکرول نرم به سمت نتیجه
// //       if (resultBoxRef.current) {
// //         resultBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// //       }
// //     }, 1800);
// //   };

// //   const handleRequestClick = () => {
// //     setRequestSent(true);
// //   };

// //   return (
// //     <>
// //       <Header/>

// //       <section className="explorer-hero mt-4">
// //         <div className="container">
// //           <h1>اکسپلور نمونه‌کارها</h1>
// //           <p>بین نمونه‌کارهای واقعی آرایشگرها بگرد، هر کدوم رو پسندیدی روش بزن و با عکس خودت امتحانش کن.</p>
// //         </div>
// //       </section>

// //       <div className="filter-bar">
// //         <div className="container">
// //           <div className="filter-row">
// //             <div className="search-box">
// //               <i className="lucide lucide-search"></i>
// //               <input
// //                 type="text"
// //                 placeholder="جستجو بین نمونه‌کارها یا نام آرایشگاه..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //             <button className={`chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
// //               <i className="lucide lucide-layout-grid"></i> همه
// //             </button>
// //             <button className={`chip ${activeFilter === 'hair' ? 'active' : ''}`} onClick={() => setActiveFilter('hair')}>
// //               <i className="lucide lucide-palette"></i> رنگ مو
// //             </button>
// //             <button className={`chip ${activeFilter === 'brow' ? 'active' : ''}`} onClick={() => setActiveFilter('brow')}>
// //               <i className="lucide lucide-eye"></i> ابرو
// //             </button>
// //             <button className={`chip ${activeFilter === 'lip' ? 'active' : ''}`} onClick={() => setActiveFilter('lip')}>
// //               <i className="lucide lucide-smile"></i> لب
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container">
// //         <div className="gallery">
// //           {filteredItems.map((it, i) => (
// //             <div
// //               key={i}
// //               className="tile"
// //               style={{ animationDelay: `${i * 0.04}s` }}
// //               onClick={() => openModal(it)}
// //             >
// //               <img src={it.img} alt={it.title} loading="lazy" />
// //               <div className="tile-overlay">
// //                 <span className="cat-pill">{catLabel[it.cat]}</span>
// //                 <h4>{it.title}</h4>
// //                 <span>{it.salon} · {it.price}</span>
// //                 <span className="try-btn"><i className="lucide lucide-camera"></i> امتحان با عکس من</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Empty State */}
// //         <div className={`empty-state ${filteredItems.length === 0 ? 'show' : ''}`}>
// //           <i className="lucide lucide-search-x"></i>
// //           <h3>چیزی پیدا نشد</h3>
// //           <p>فیلتر یا عبارت جستجو رو تغییر بده</p>
// //         </div>
// //       </div>

// //       <footer className="explorer-footer">
// //         <div className="container">© ۱۴۰۵ BSV Group — همه‌چیز فقط برای تست است، خریدی در سایت انجام نمی‌شود</div>
// //       </footer>

// //       {/* MODAL */}
// //       <div 
// //         className={`modal-backdrop ${isModalOpen ? 'open' : ''}`} 
// //         onClick={(e) => {
// //           if (e.target === e.currentTarget) closeModal();
// //         }}
// //       >
// //         <div className="modal-box">
// //           <div className="modal-close" onClick={closeModal}>✕</div>
          
// //           {currentItem && (
// //             <div className="modal-grid">
// //               <div className="modal-ref">
// //                 <img src={currentItem.img} alt={currentItem.title} />
// //                 <div className="ref-tag">{catLabel[currentItem.cat]}</div>
// //               </div>
// //               <div className="modal-body">
// //                 <span className="cat-pill">{catLabel[currentItem.cat]}</span>
// //                 <h3>{currentItem.title}</h3>
// //                 <div className="salon-line">
// //                   <img src={currentItem.salonImg} alt={currentItem.salon} />
// //                   <span>{currentItem.salon}</span>
// //                 </div>
// //                 <div className="price-line">قیمت تقریبی: <b>{currentItem.price}</b></div>

// //                 <label className={`upload-zone ${userPhotoDataUrl ? 'has-img' : ''}`}>
// //                   <input type="file" accept="image/*" onChange={handleFileUpload} />
// //                   {!userPhotoDataUrl ? (
// //                     <div>
// //                       <i className="lucide lucide-image-plus"></i>
// //                       <h5>عکس خودت رو آپلود کن</h5>
// //                       <span>یک عکس واضح و روبه‌رو از صورت یا موی خودت انتخاب کن</span>
// //                     </div>
// //                   ) : (
// //                     <div className="upload-preview-wrap">
// //                       <img className="upload-preview" src={userPhotoDataUrl} alt="User Upload" />
// //                       <span className="upload-change">تغییر عکس</span>
// //                     </div>
// //                   )}
// //                 </label>

// //                 <button
// //                   className={`try-btn-main ${isProcessing ? 'loading' : ''}`}
// //                   disabled={!userPhotoDataUrl || isProcessing}
// //                   onClick={handleTryAI}
// //                 >
// //                   <span className="spinner"></span>
// //                   <span className="btn-label"><i className="lucide lucide-sparkles"></i> امتحان با هوش مصنوعی</span>
// //                 </button>

// //                 <div 
// //                   ref={resultBoxRef} 
// //                   className={`result-box ${showResult ? 'show' : ''}`}
// //                 >
// //                   <div className="result-img">
// //                     <img src={userPhotoDataUrl} alt="Result Preview" />
// //                   </div>
// //                   <div className="match-score">
// //                     <span className="label">میزان تناسب با چهره شما</span>
// //                     <span className="score">{matchScore}٪</span>
// //                   </div>
                  
// //                   <button 
// //                     className="request-btn"
// //                     onClick={handleRequestClick}
// //                     style={requestSent ? { background: '#4C8C6B', color: '#fff' } : {}}
// //                   >
// //                     {requestSent ? (
// //                       <><i className="lucide lucide-check"></i> درخواست شما ثبت شد</>
// //                     ) : (
// //                       <><i className="lucide lucide-calendar-check"></i> درخواست نوبت از این آرایشگاه</>
// //                     )}
// //                   </button>
// //                   <div className="disclaimer">نتیجه فقط جهت پیش‌نمایش است؛ خرید یا پرداختی در سایت انجام نمی‌شود.</div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <Footer/>
// //     </>
// //   );
// // }


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
//   const [resultPhotoDataUrl, setResultPhotoDataUrl] = useState(null); // اضافه شده برای عکس خروجی از سرور
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
//     setResultPhotoDataUrl(null); // ریست کردن عکس خروجی قبلی
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
//       setResultPhotoDataUrl(null); // مخفی کردن عکس خروجی قبلی در صورت تغییر عکس کاربر
//       setShowResult(false); 
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleTryAI = async () => {
//     if (!userPhotoDataUrl || !currentItem) return;
//     setIsProcessing(true);
//     setShowResult(false);
    
//     try {
//       // اگر عکس مرجع لینک خارجی نیست و داخل پوشه public است، آن را به آدرس کامل تبدیل می‌کنیم
//       let refImageUrl = currentItem.img;
//       if (refImageUrl.startsWith('/')) {
//          refImageUrl = window.location.origin + refImageUrl;
//       }
      
//       // فراخوانی API سرور Node.js واسط
//       // فراخوانی API از طریق آدرس آنلاین Ngrok
//       // نمونه کد کلاینت در فرانت‌اِند شما
//       // https://5b44-2606-2040-3800-4c-00-23.ngrok-free.app
// const response = await fetch('https://953b-2606-2040-3800-4c-00-23.ngrok-free.app/api/try-on', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'ngrok-skip-browser-warning': 'true' // این خط حیاتی است!
//   },
//   body: JSON.stringify({
//     userImageBase64: userPhotoDataUrl, // یا هر ساختاری که قبلاً برای کدهایتان زدید
//     refImageUrl: refImageUrl
//   })
// });

//       const data = await response.json();

//       if (data.success) {
//         // دریافت عکس از سرور و نمایش آن
//         setResultPhotoDataUrl(data.resultImage); 
//         setMatchScore(Math.floor(Math.random() * 13) + 85);
//         setShowResult(true);
        
//         // اسکرول نرم به سمت نتیجه
//         setTimeout(() => {
//           if (resultBoxRef.current) {
//             resultBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//           }
//         }, 100);
//       } else {
//         alert('خطا در پردازش تصویر: ' + (data.error || 'ارور نامشخص'));
//       }

//     } catch (error) {
//       console.error(error);
//       alert('ارتباط با سرور برقرار نشد. لطفاً مطمئن شوید بک‌اند روشن است.');
//     } finally {
//       setIsProcessing(false);
//     }
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

//       <Footer/>

//       {/* MODAL */}
//       <div
//   className={`modal-backdrop-custom ${isModalOpen ? "open" : ""}`}
//   onClick={(e) => {
//     if (e.target === e.currentTarget) closeModal();
//   }}
// >
//   <div className="modal-custom">
//     <div className="modal-close-custom" onClick={closeModal}>
//       ✕
//     </div>

//     {currentItem && (
//       <>
//         <h3 className="fs-5 fw-extrabold text-plum mb-1">
//           {currentItem.title}
//         </h3>

//         <p className="small text-muted-custom mb-4">
//           عکس واضح و روبه‌رو از موی خودت آپلود کن
//         </p>

//         <label
//           className={`upload-zone ${
//             userPhotoDataUrl ? "has-img" : ""
//           }`}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileUpload}
//             className="d-none"
//           />

//           {userPhotoDataUrl ? (
//             <img
//               src={userPhotoDataUrl}
//               alt="User Preview"
//               className="upload-preview"
//             />
//           ) : (
//             <div>
//               <i className="lucide lucide-image-plus text-gold mb-2"></i>

//               <h5 className="fs-6 fw-bold text-plum mb-1">
//                 عکس خودت رو آپلود کن
//               </h5>

//               <span
//                 className="small text-muted-custom"
//                 style={{ fontSize: "12px" }}
//               >
//                 یک عکس واضح و روبه‌رو از صورت یا موی خودت انتخاب کن
//               </span>

//               <br />

//               <span
//                 className="small text-muted-custom"
//                 style={{ fontSize: "12px" }}
//               >
//                 فرمت JPG یا PNG
//               </span>
//             </div>
//           )}
//         </label>

//         <button
//           className="try-btn-main"
//           disabled={!userPhotoDataUrl || isProcessing}
//           onClick={handleTryAI}
//         >
//           {isProcessing ? (
//             <span className="spinner-custom"></span>
//           ) : (
//             <>
//               <i className="lucide lucide-sparkles"></i>
//               <span className="btn-label">
//                 امتحان با هوش مصنوعی
//               </span>
//             </>
//           )}
//         </button>

//         <div
//           ref={resultBoxRef}
//           className={`result-box-custom ${
//             showResult ? "show" : ""
//           }`}
//         >
//           {(resultPhotoDataUrl || userPhotoDataUrl) && (
//             <img
//               src={resultPhotoDataUrl || userPhotoDataUrl}
//               alt="AI Result"
//               className="w-100 rounded-3 mb-3"
//               style={{
//                 height: "220px",
//                 objectFit: "cover",
//               }}
//             />
//           )}

//           <div className="match-score d-flex align-items-center justify-content-between bg-custom-soft p-3 rounded-3 mb-3">
//             <span className="small text-muted-custom fw-semibold">
//               میزان تناسب با چهره شما
//             </span>

//             <span className="fs-5 fw-extrabold text-gold">
//               {matchScore}٪
//             </span>
//           </div>

//           <button
//             className="request-btn-custom fw-bold"
//             onClick={handleRequestClick}
//             style={
//               requestSent
//                 ? {
//                     background: "#4C8C6B",
//                     color: "#fff",
//                   }
//                 : {}
//             }
//           >
//             {requestSent ? (
//               <>
//                 <i className="lucide lucide-check"></i>
//                 درخواست شما ثبت شد
//               </>
//             ) : (
//               <>
//                 <i className="lucide lucide-calendar-check"></i>
//                 درخواست نوبت از {currentItem.salon}
//               </>
//             )}
//           </button>

//           <div
//             className="small text-muted-custom text-center mt-2"
//             style={{ fontSize: "11.5px" }}
//           >
//             نتیجه فقط جهت پیش‌نمایش است؛ خرید یا پرداختی در سایت انجام
//             نمی‌شود.
//           </div>
//         </div>
//       </>
//     )}
//   </div>
// </div>
//     </>
//   );
// }



"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ⚠️ بهتره این رو تو Netlify به‌عنوان Environment Variable ست کنی:
// NEXT_PUBLIC_BACKEND_URL=https://your-static-name.ngrok-free.app
// اگه از ngrok Static Domain استفاده کنی، دیگه هیچ‌وقت لازم نیست این رو عوض کنی.
const BACKEND_URL =  'https://kellen-shelly-jolynn.ngrok-free.dev';

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

const PROGRESS_MESSAGES = [
  'در حال آماده‌سازی تصویر شما...',
  'در حال تحلیل رنگ و بافت انتخابی...',
  'هوش مصنوعی در حال طراحی نتیجه است...',
  'در حال هماهنگ‌سازی نور و سایه...',
  'در حال پرداختن به جزئیات نهایی...',
  'چند لحظه دیگه، تقریباً آماده‌ست...',
];

const TOTAL_PROGRESS_MS = 60000;

export default function Explorer() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [userPhotoDataUrl, setUserPhotoDataUrl] = useState(null);
  const [resultPhotoDataUrl, setResultPhotoDataUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [progressMsgIdx, setProgressMsgIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [matchScore, setMatchScore] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [backendOnline, setBackendOnline] = useState(null); // null = چک نشده

  const progressTimerRef = useRef(null);
  const pollTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (['hair', 'brow', 'lip'].includes(hash)) setActiveFilter(hash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      clearInterval(progressTimerRef.current);
      clearInterval(pollTimerRef.current);
    };
  }, []);

  const filteredItems = allItems.filter((it) => {
    const matchCat = activeFilter === 'all' || it.cat === activeFilter;
    const matchSearch = (it.title + it.salon).toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const similarItems = currentItem
    ? allItems.filter((it) => it.cat === currentItem.cat && it.title !== currentItem.title).slice(0, 8)
    : [];

  const checkHealth = useCallback(async () => {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(`${BACKEND_URL}/api/try-on`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        signal: ctrl.signal,
      });
      clearTimeout(t);
      setBackendOnline(res.ok);
    } catch {
      setBackendOnline(false);
    }
  }, []);

  const openModal = (item) => {
    setCurrentItem(item);
    setUserPhotoDataUrl(null);
    setResultPhotoDataUrl(null);
    setShowResult(false);
    setRequestSent(false);
    setIsProcessing(false);
    setErrorMsg(null);
    setProgressPct(0);
    setProgressMsgIdx(0);
    setIsModalOpen(true);
    setBackendOnline(null);
    checkHealth();
  };

  const closeModal = () => {
    clearInterval(progressTimerRef.current);
    clearInterval(pollTimerRef.current);
    setIsModalOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserPhotoDataUrl(ev.target.result);
      setResultPhotoDataUrl(null);
      setShowResult(false);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const startProgressAnimation = () => {
    startTimeRef.current = Date.now();
    setProgressPct(2);
    setProgressMsgIdx(0);
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      // تا ۹۵٪ خودش پیش می‌ره؛ رسیدن به ۱۰۰٪ فقط وقتی جاب واقعاً تموم بشه
      const pct = Math.min(95, (elapsed / TOTAL_PROGRESS_MS) * 100);
      setProgressPct(pct);
      const msgIdx = Math.min(
        PROGRESS_MESSAGES.length - 1,
        Math.floor(elapsed / 10000)
      );
      setProgressMsgIdx(msgIdx);
    }, 500);
  };

  const pollJobStatus = (jobId) => {
    pollTimerRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/try-on/status/${jobId}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        const data = await res.json();

        if (data.status === 'done') {
          clearInterval(pollTimerRef.current);
          clearInterval(progressTimerRef.current);
          setProgressPct(100);
          setTimeout(() => {
            setResultPhotoDataUrl(data.resultImage);
            setMatchScore(Math.floor(Math.random() * 13) + 85);
            setShowResult(true);
            setIsProcessing(false);
          }, 300);
        } else if (data.status === 'error') {
          clearInterval(pollTimerRef.current);
          clearInterval(progressTimerRef.current);
          setIsProcessing(false);
          setErrorMsg(data.error || 'پردازش با خطا مواجه شد. دوباره تلاش کن.');
        }
        // اگر status === 'processing' هیچ کاری نکن، صبر کن
      } catch {
        // خطای شبکه موقتی؛ در پول بعدی دوباره امتحان می‌کنیم
      }
    }, 2500);
  };

  const handleTryAI = async () => {
    if (!userPhotoDataUrl || !currentItem) return;

    setIsProcessing(true);
    setShowResult(false);
    setErrorMsg(null);
    startProgressAnimation();

    try {
      let refImageUrl = currentItem.img;
      if (refImageUrl.startsWith('/')) {
        refImageUrl = window.location.origin + refImageUrl;
      }

      const response = await fetch(`${BACKEND_URL}/api/try-on/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ userImageBase64: userPhotoDataUrl, refImageUrl }),
      });

      const data = await response.json();

      if (data.success && data.jobId) {
        pollJobStatus(data.jobId);
      } else {
        throw new Error(data.error || 'شروع پردازش با خطا مواجه شد');
      }
    } catch (error) {
      clearInterval(progressTimerRef.current);
      setIsProcessing(false);
      setErrorMsg('ارتباط با سرور برقرار نشد. مطمئن شو سیستم و بک‌اند روشن‌اند.');
    }
  };

  const handleRequestClick = () => setRequestSent(true);

  return (
    <>
      <Header />

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
        <div className="insta-grid">
          {filteredItems.map((it, i) => (
            <div
              key={i}
              className="insta-tile"
              style={{ animationDelay: `${i * 0.03}s` }}
              onClick={() => openModal(it)}
            >
              <img src={it.img} alt={it.title} loading="lazy" />
              <div className="insta-tile-overlay">
                <span className="cat-pill">{catLabel[it.cat]}</span>
                <div className="insta-tile-info">
                  <h4>{it.title}</h4>
                  <span>{it.salon} · {it.price}</span>
                </div>
                <span className="try-btn">
                  <i className="lucide lucide-camera"></i> امتحان با عکس من
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={`empty-state ${filteredItems.length === 0 ? 'show' : ''}`}>
          <i className="lucide lucide-search-x"></i>
          <h3>چیزی پیدا نشد</h3>
          <p>فیلتر یا عبارت جستجو رو تغییر بده</p>
        </div>
      </div>

      <Footer />

      {/* MODAL */}
      <div
        className={`modal-backdrop-v2 ${isModalOpen ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div className="modal-wrap-v2">
          <div className="modal-v2">
            <div className="modal-close-v2" onClick={closeModal}>✕</div>

            {currentItem && (
              <>
                <div className="modal-head">
                  <h3>{currentItem.title}</h3>
                  <p>{currentItem.salon} · {currentItem.price}</p>
                  {backendOnline === false && (
                    <div className="backend-warning">
                      <i className="lucide lucide-wifi-off"></i>
                      اتصال به سیستم پردازش برقرار نیست. لطفاً بعداً دوباره امتحان کن.
                    </div>
                  )}
                </div>

                <div className="modal-3col">
                  {/* راست: نتیجه */}
                  <div className="col-box col-result">
                    <span className="col-label">نتیجه</span>
                    {showResult && resultPhotoDataUrl ? (
                      <img src={resultPhotoDataUrl} alt="نتیجه" className="col-img" />
                    ) : (
                      <div className="col-placeholder">
                        <i className="lucide lucide-sparkles"></i>
                        <span>نتیجه اینجا نمایش داده می‌شود</span>
                      </div>
                    )}
                  </div>

                  {/* وسط: آپلود عکس کاربر */}
                  <div className="col-box col-upload">
                    <span className="col-label">عکس خودت</span>
                    <label className={`upload-zone-v2 ${userPhotoDataUrl ? 'has-img' : ''}`}>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="d-none" />
                      {userPhotoDataUrl ? (
                        <img src={userPhotoDataUrl} alt="عکس شما" className="col-img" />
                      ) : (
                        <div className="upload-empty">
                          <i className="lucide lucide-image-plus"></i>
                          <h5>عکس خودت رو آپلود کن</h5>
                          <span>یک عکس واضح و روبه‌رو</span>
                          <span className="upload-format">JPG یا PNG</span>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* چپ: مرجع انتخابی */}
                  <div className="col-box col-ref">
                    <span className="col-label">استایل انتخابی</span>
                    <img src={currentItem.img} alt={currentItem.title} className="col-img" />
                  </div>
                </div>

                {errorMsg && (
                  <div className="error-banner">
                    <i className="lucide lucide-alert-circle"></i> {errorMsg}
                  </div>
                )}

                {!showResult ? (
                  <button
                    className="try-btn-main-v2"
                    disabled={!userPhotoDataUrl || isProcessing || backendOnline === false}
                    onClick={handleTryAI}
                  >
                    {isProcessing ? (
                      <span className="spinner-v2"></span>
                    ) : (
                      <>
                        <i className="lucide lucide-sparkles"></i>
                        امتحان با هوش مصنوعی
                      </>
                    )}
                  </button>
                ) : (
                  <div className="result-actions">
                    <div className="match-score-v2">
                      <span>میزان تناسب با چهره شما</span>
                      <strong>{matchScore}٪</strong>
                    </div>
                    <button
                      className="request-btn-v2"
                      onClick={handleRequestClick}
                      style={requestSent ? { background: '#4C8C6B', color: '#fff' } : {}}
                    >
                      {requestSent ? (
                        <><i className="lucide lucide-check"></i> درخواست شما ثبت شد</>
                      ) : (
                        <><i className="lucide lucide-calendar-check"></i> درخواست نوبت از {currentItem.salon}</>
                      )}
                    </button>
                    <div className="disclaimer">نتیجه فقط جهت پیش‌نمایش است؛ خرید یا پرداختی در سایت انجام نمی‌شود.</div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* پنل پردازش زیر مودال */}
          <div className={`processing-panel ${isProcessing ? 'open' : ''}`}>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <p className="progress-text" key={progressMsgIdx}>{PROGRESS_MESSAGES[progressMsgIdx]}</p>

            {similarItems.length > 0 && (
              <div className="similar-wrap">
                <span className="similar-title">تا آماده شدن، این‌ها رو هم ببین</span>
                <div className="similar-scroll">
                  {similarItems.map((it, idx) => (
                    <div className="similar-card" key={idx} style={{ animationDelay: `${idx * 0.06}s` }}>
                      <img src={it.img} alt={it.title} />
                      <div className="similar-card-info">
                        <span className="similar-card-title">{it.title}</span>
                        <span className="similar-card-price">{it.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ================= Instagram-style grid ================= */
        .insta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          margin: 24px 0 60px;
        }
        @media (min-width: 640px) {
          .insta-grid { grid-template-columns: repeat(4, 1fr); gap: 6px; }
        }
        @media (min-width: 1024px) {
          .insta-grid { grid-template-columns: repeat(5, 1fr); gap: 8px; }
        }
        .insta-tile {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          cursor: pointer;
          border-radius: 6px;
          background: #eee;
          animation: tileIn 0.5s ease both;
        }
        @keyframes tileIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .insta-tile img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s ease;
          display: block;
        }
        .insta-tile:hover img { transform: scale(1.08); }
        .insta-tile-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 45%, transparent 70%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 10px;
        }
        .insta-tile:hover .insta-tile-overlay { opacity: 1; }
        .insta-tile .cat-pill {
          align-self: flex-start;
          background: rgba(255,255,255,0.9); color: #333;
          font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 600;
        }
        .insta-tile-info h4 { color: #fff; font-size: 13px; margin: 0 0 2px; font-weight: 700; }
        .insta-tile-info span { color: rgba(255,255,255,0.85); font-size: 11px; }
        .insta-tile .try-btn {
          align-self: center;
          color: #fff; font-size: 12px; font-weight: 600;
          display: flex; align-items: center; gap: 4px;
          background: var(--gold, #C8A464); padding: 6px 14px; border-radius: 20px;
          transform: translateY(8px); opacity: 0; transition: all 0.3s ease 0.05s;
        }
        .insta-tile:hover .try-btn { transform: translateY(0); opacity: 1; }

        /* ================= Modal ================= */
        .modal-backdrop-v2 {
          position: fixed; inset: 0; background: rgba(20,10,20,0.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: flex-start; justify-content: center;
          padding: 4vh 16px; overflow-y: auto;
          opacity: 0; visibility: hidden; transition: opacity 0.3s ease;
          z-index: 1000;
        }
        .modal-backdrop-v2.open { opacity: 1; visibility: visible; }
        .modal-wrap-v2 {
          width: 100%; max-width: 780px;
          display: flex; flex-direction: column; align-items: stretch;
        }
        .modal-v2 {
          background: #fff; border-radius: 20px; padding: 24px;
          position: relative;
          transform: scale(0.92) translateY(20px); opacity: 0;
          transition: all 0.35s cubic-bezier(.2,.9,.3,1.2);
        }
        .modal-backdrop-v2.open .modal-v2 { transform: scale(1) translateY(0); opacity: 1; }
        .modal-close-v2 {
          position: absolute; top: 16px; left: 16px;
          width: 32px; height: 32px; border-radius: 50%;
          background: #f2f2f2; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px; color: #555;
          transition: background 0.2s;
        }
        .modal-close-v2:hover { background: #e5e5e5; }
        .modal-head h3 { font-size: 19px; font-weight: 800; margin: 0 0 2px; color: var(--plum, #4A1942); }
        .modal-head p { font-size: 13px; color: #888; margin: 0 0 16px; }
        .backend-warning {
          display: flex; align-items: center; gap: 6px;
          background: #FFF3E0; color: #B25E00; font-size: 12.5px;
          padding: 8px 12px; border-radius: 10px; margin-bottom: 12px;
        }

        .modal-3col {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (max-width: 720px) {
          .modal-3col { grid-template-columns: 1fr; }
        }
        .col-box {
          display: flex; flex-direction: column; gap: 6px;
        }
        .col-label {
          font-size: 12px; font-weight: 700; color: var(--gold, #B8894A);
          text-align: center;
        }
        .col-img {
          width: 100%; aspect-ratio: 3 / 4;
          object-fit: cover; object-position: top center;
          border-radius: 14px; background: #f2f2f2;
        }
        .col-placeholder {
          width: 100%; aspect-ratio: 3 / 4;
          border-radius: 14px; background: var(--custom-soft, #FAF3EA);
          border: 1.5px dashed #dcc9a8;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; color: #b09a78; font-size: 12px; text-align: center; padding: 10px;
        }
        .col-placeholder i { font-size: 22px; }
        .upload-zone-v2 {
          display: block; cursor: pointer; width: 100%;
        }
        .upload-empty {
          width: 100%; aspect-ratio: 3 / 4;
          border-radius: 14px; border: 1.5px dashed #d8b98c;
          background: var(--custom-soft, #FAF3EA);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; padding: 10px; text-align: center;
          transition: border-color 0.2s, background 0.2s;
        }
        .upload-zone-v2:hover .upload-empty { border-color: var(--gold, #C8A464); }
        .upload-empty i { font-size: 22px; color: var(--gold, #C8A464); margin-bottom: 4px; }
        .upload-empty h5 { font-size: 12.5px; font-weight: 700; color: var(--plum, #4A1942); margin: 0; }
        .upload-empty span { font-size: 10.5px; color: #999; }
        .upload-format { margin-top: 2px; }

        .error-banner {
          background: #FDECEC; color: #C0392B; font-size: 13px;
          padding: 10px 14px; border-radius: 10px; margin-bottom: 12px;
          display: flex; align-items: center; gap: 6px;
        }

        .try-btn-main-v2 {
          width: 100%; padding: 14px; border: none; border-radius: 14px;
          background: linear-gradient(135deg, var(--gold, #C8A464), #B8894A);
          color: #fff; font-weight: 800; font-size: 14.5px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          cursor: pointer; transition: transform 0.15s, opacity 0.2s;
        }
        .try-btn-main-v2:hover:not(:disabled) { transform: translateY(-1px); }
        .try-btn-main-v2:disabled { opacity: 0.5; cursor: not-allowed; }
        .spinner-v2 {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.4); border-top-color: #fff;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .result-actions { display: flex; flex-direction: column; gap: 10px; }
        .match-score-v2 {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--custom-soft, #FAF3EA); padding: 12px 16px; border-radius: 12px;
          font-size: 13px; color: #777;
        }
        .match-score-v2 strong { font-size: 18px; color: var(--gold, #C8A464); }
        .request-btn-v2 {
          width: 100%; padding: 13px; border: none; border-radius: 14px;
          background: var(--plum, #4A1942); color: #fff; font-weight: 700; font-size: 14px;
          display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
          transition: background 0.2s;
        }
        .disclaimer { font-size: 11px; color: #aaa; text-align: center; }

        /* ================= Processing panel (below modal) ================= */
        .processing-panel {
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease;
          margin-top: 0;
        }
        .processing-panel.open {
          max-height: 600px; opacity: 1; margin-top: 14px;
        }
        .progress-track {
          width: 100%; height: 8px; border-radius: 20px;
          background: rgba(255,255,255,0.35); overflow: hidden;
        }
        .progress-fill {
          height: 100%; border-radius: 20px;
          background: linear-gradient(90deg, var(--gold, #C8A464), #fff2, var(--gold, #C8A464));
          background-size: 200% 100%;
          animation: shimmer 1.4s linear infinite;
          transition: width 0.5s ease;
        }
        @keyframes shimmer { from { background-position: 200% 0; } to { background-position: 0 0; } }
        .progress-text {
          text-align: center; color: #fff; font-size: 13px; font-weight: 600;
          margin: 10px 0 0;
          animation: fadeSlide 0.4s ease;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .similar-wrap { margin-top: 16px; }
        .similar-title {
          display: block; color: rgba(255,255,255,0.85); font-size: 12.5px;
          font-weight: 600; margin-bottom: 8px; text-align: center;
        }
        .similar-scroll {
          display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px;
          scroll-snap-type: x proximity;
        }
        .similar-scroll::-webkit-scrollbar { height: 5px; }
        .similar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        .similar-card {
          flex: 0 0 120px; scroll-snap-align: start;
          border-radius: 12px; overflow: hidden; background: #fff;
          animation: cardIn 0.4s ease both;
          cursor: default;
        }
        @keyframes cardIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .similar-card img { width: 100%; height: 90px; object-fit: cover; object-position: top center; display: block; }
        .similar-card-info { padding: 6px 8px; }
        .similar-card-title { display: block; font-size: 10.5px; font-weight: 700; color: #444; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .similar-card-price { display: block; font-size: 9.5px; color: #999; margin-top: 1px; }
      `}</style>
    </>
  );
}
