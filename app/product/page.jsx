"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Camera, Clock, Droplet, Sun, 
  Layers, Repeat, Sparkles, Heart, ImagePlus, CalendarCheck, Check 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProductPage() {
  // State definitions for exact logic retention
  const [mainImg, setMainImg] = useState("https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=900&fit=crop");
  const [activeThumb, setActiveThumb] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiResult, setShowAiResult] = useState(false);
  const [matchScore, setMatchScore] = useState('۹۲٪');
  const [isRequested, setIsRequested] = useState(false);

  const galleryImages = [
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=900&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=900&fit=crop",
    "https://images.unsplash.com/photo-1519752594763-9edcc60c73c3?w=800&h=900&fit=crop",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=900&fit=crop"
  ];

  const similarProducts = [
    { img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop', title: 'بلوند عسلی با هایلایت', salon: 'آتلیه مریم', price: '۱,۲۰۰,۰۰۰ تومان' },
    { img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=300&fit=crop', title: 'مش شکلاتی', salon: 'سالن ترمه', price: '۹۵۰,۰۰۰ تومان' },
    { img: 'https://images.unsplash.com/photo-1519752594763-9edcc60c73c3?w=400&h=300&fit=crop', title: 'رنگ مسی روشن', salon: 'سالن رزا', price: '۷۹۰,۰۰۰ تومان' },
    { img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', title: 'بلوند پلاتینه', salon: 'آتلیه مریم', price: '۱,۵۰۰,۰۰۰ تومان' },
  ];

  const handleThumbClick = (imgUrl, index) => {
    setMainImg(imgUrl);
    setActiveThumb(index);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserPhoto(ev.target.result);
      setShowAiResult(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAiTry = () => {
    if (!userPhoto) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      const generatedScore = Math.floor(Math.random() * 13) + 85;
      // Convert generated score numbers to Persian format
      const persianScore = generatedScore.toLocaleString('fa-IR') + '٪';
      setMatchScore(persianScore);
      setShowAiResult(true);
    }, 1800);
  };

  const handleRequestBtn = () => {
    setIsRequested(true);
  };

  return (
    <div className="min-vh-100 d-flex flex-column mt-5" style={{ direction: 'rtl' }}>
      
      {/* HEADER */}
      {/* <header className="sticky-top bg-light bg-opacity-75 backdrop-blur py-3 shadow-sm" style={{ backdropFilter: 'blur(14px)', zIndex: 1000 }}>
        <div className="container d-flex align-items-center justify-content-between">
          <Link href="/" className="logo text-plum fw-bold fs-5 text-decoration-none d-flex align-items-center gap-2">
            <span className="logo-mark"><span>BSV</span></span> گلچین
          </Link>
          <nav className="d-none d-md-block">
            <ul className="d-flex gap-4 m-0 p-0 list-unstyled">
              <li><Link href="/explorer" className="text-plum-2 fw-semibold small text-decoration-none hover-plum">اکسپلور</Link></li>
              <li><Link href="/articles" className="text-plum-2 fw-semibold small text-decoration-none hover-plum">مقالات</Link></li>
              <li><Link href="/terms" className="text-plum-2 fw-semibold small text-decoration-none hover-plum">قوانین استفاده</Link></li>
            </ul>
          </nav>
          <Link href="/panel" className="btn-custom btn-custom-ghost small">ورود آرایشگر</Link>
        </div>
      </header> */}
      <Header/>


      {/* BREADCRUMB */}
      <div className="container pt-4">
        <nav className="d-flex align-items-center gap-2 small text-muted-custom flex-wrap">
          <Link href="/" className="text-decoration-none text-muted-custom">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <Link href="/explorer" className="text-decoration-none text-muted-custom">رنگ مو</Link>
          <ChevronLeft size={14} />
          <span className="text-plum">رنگ کاراملی طبیعی</span>
        </nav>
      </div>

      {/* PRODUCT HERO SECTION */}
      <section className="py-4 py-lg-5">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-start">
            
            {/* Gallery Column */}
            <div className="col-12 col-lg-6">
              <div className="gallery-main" id="galleryMain" onClick={() => setIsModalOpen(true)}>
                <img id="mainImg" src={mainImg} alt="رنگ کاراملی طبیعی" className="img-fluid w-100" />
                <div className="test-tag"><Camera size={15} /> تست کن</div>
              </div>
              <div className="gallery-thumbs d-flex gap-2 mt-3 flex-wrap">
                {galleryImages.map((img, idx) => (
                  <img 
                    key={idx}
                    className={activeThumb === idx ? 'active' : ''} 
                    src={img.replace('w=800&h=900', 'w=200&h=200')} 
                    alt={`Thumbnail ${idx}`}
                    onClick={() => handleThumbClick(img, idx)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info Column */}
            <div className="col-12 col-lg-6">
              <div className="product-info">
                <span className="cat-pill mb-3">رنگ مو</span>
                <h1 className="fw-black text-plum mb-2 lh-base" style={{ fontSize: 'calc(1.3rem + 1vw)' }}>
                  رنگ کاراملی طبیعی با بیس گرم
                </h1>
                
                <div className="rating-row d-flex align-items-center gap-2 mb-4">
                  <span className="stars">★★★★★</span>
                  <span className="small text-muted-custom">۴.۹ از ۵ (۳۸ نظر)</span>
                  <a href="#reviews" className="small text-plum-2 fw-semibold text-decoration-underline">مشاهده نظرات</a>
                </div>

                <Link href="/salon/1" className="salon-line mb-4">
                  <img src="https://i.pravatar.cc/80?img=32" alt="سالن رزا" />
                  <div className="info flex-grow-1">
                    <b className="text-plum small d-block fw-bold">سالن رزا</b>
                    <span className="text-muted-custom x-small">تهران، ونک · ۴.۸ امتیاز از ۲۱۰ نظر</span>
                  </div>
                  <span className="visit-link">مشاهده غرفه ←</span>
                </Link>

                <div className="price-box mb-4">
                  <div>
                    <div className="small text-muted-custom mb-1">قیمت تقریبی</div>
                    <div className="amount text-plum fw-extrabold fs-4">۸۵۰,۰۰۰ تومان</div>
                  </div>
                  <div className="duration small text-muted-custom d-flex align-items-center gap-1">
                    <Clock size={14} className="text-gold" /> حدود ۲ تا ۳ ساعت
                  </div>
                </div>

                <div className="spec-list row row-cols-2 g-3 mb-4 m-0">
                  <div className="p-1"><div className="spec-item"><Droplet size={17} className="text-gold" /><div><span className="small text-muted-custom d-block" style={{ fontSize: '11.5px' }}>نوع رنگ</span><span className="small fw-bold text-plum">آمونیاک‌فری</span></div></div></div>
                  <div className="p-1"><div className="spec-item"><Sun size={17} className="text-gold" /><div><span className="small text-muted-custom d-block" style={{ fontSize: '11.5px' }}>مناسب برای</span><span className="small fw-bold text-plum">پوست گرم</span></div></div></div>
                  <div className="p-1"><div className="spec-item"><Layers size={17} className="text-gold" /><div><span className="small text-muted-custom d-block" style={{ fontSize: '11.5px' }}>شامل</span><span className="small fw-bold text-plum">رنگ + مراقبت</span></div></div></div>
                  <div className="p-1"><div className="spec-item"><Repeat size={17} className="text-gold" /><div><span className="small text-muted-custom d-block" style={{ fontSize: '11.5px' }}>ماندگاری</span><span className="small fw-bold text-plum">تا ۸ هفته</span></div></div></div>
                </div>

                <p className="desc-text text-dark small mb-4">
                  یک رنگ کاراملی گرم و طبیعی که روی موهای بور تا قهوه‌ای روشن به‌خوبی می‌نشیند. این نمونه‌کار توسط <b>سالن رزا</b> اجرا شده و شامل مشاوره رنگ، اجرا و مراقبت پایانی مو است. برای دیدن نتیجه روی چهره و موی خودت، از دکمه «تست کن» استفاده کن.
                </p>

                <div className="action-row d-flex gap-3 flex-wrap">
                  <button className="btn-try-main" onClick={() => setIsModalOpen(true)}>
                    <Sparkles size={16} /> امتحان با عکس من
                  </button>
                  <button className={`btn-save ${isSaved ? 'active' : ''}`} onClick={() => setIsSaved(!isSaved)}>
                    <Heart size={19} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="small text-muted-custom text-center mt-3" style={{ fontSize: '12px' }}>
                  نتیجه تست فقط پیش‌نمایش است؛ هیچ خرید یا پرداختی در سایت انجام نمی‌شود.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SIMILAR PRODUCTS SECTION */}
      <section className="pb-5 mb-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
            <div>
              <h2 className="fs-5 fw-extrabold text-plum mb-1">نمونه‌کارهای مشابه</h2>
              <p className="text-muted-custom small m-0">سایر رنگ‌های مو از آرایشگرهای عضو</p>
            </div>
            <Link href="/explorer#hair" className="btn-custom btn-custom-ghost small">مشاهده همه</Link>
          </div>
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {similarProducts.map((p, idx) => (
              <div className="col" key={idx}>
                <div className="card-custom h-100 d-flex flex-column">
                  <div className="card-img-custom">
                    <img src={p.img} alt={p.title} />
                  </div>
                  <div className="card-body-custom p-3 d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      <h4 className="fs-6 fw-bold text-plum mb-2">{p.title}</h4>
                      <div className="small text-muted-custom mb-3">
                        {p.salon} · <b className="text-plum">{p.price}</b>
                      </div>
                    </div>
                    <button className="card-try" onClick={() => setIsModalOpen(true)}>
                      <Camera size={14} /> امتحان با عکس من
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="pb-5" id="reviews">
        <div className="container">
          <div className="mb-4">
            <h2 className="fs-5 fw-extrabold text-plum mb-1">نظرات کاربران</h2>
            <p className="text-muted-custom small">تجربه کسانی که این مدل رو امتحان کردن</p>
          </div>

          <div className="review-summary mb-4 flex-wrap flex-md-nowrap">
            <div className="text-center px-4">
              <b className="text-plum fw-black" style={{ fontSize: '44px' }}>۴.۹</b>
              <div className="text-gold letter-spacing-2 mb-1">★★★★★</div>
              <span className="small text-muted-custom">از ۳۸ نظر</span>
            </div>
            <div className="flex-grow-1 w-100 d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2 small text-muted-custom">
                <span style={{ minWidth: '45px' }}>۵ ستاره</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '82%' }}></div></div>
                <span style={{ minWidth: '20px', textAnign: 'left' }}>۳۱</span>
              </div>
              <div className="d-flex align-items-center gap-2 small text-muted-custom">
                <span style={{ minWidth: '45px' }}>۴ ستاره</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '13%' }}></div></div>
                <span style={{ minWidth: '20px', textAnign: 'left' }}>۵</span>
              </div>
              <div className="d-flex align-items-center gap-2 small text-muted-custom">
                <span style={{ minWidth: '45px' }}>۳ ستاره</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '5%' }}></div></div>
                <span style={{ minWidth: '20px', textAnign: 'left' }}>۲</span>
              </div>
              <div className="d-flex align-items-center gap-2 small text-muted-custom">
                <span style={{ minWidth: '45px' }}>۲ ستاره</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '0%' }}></div></div>
                <span style={{ minWidth: '20px', textAnign: 'left' }}>۰</span>
              </div>
              <div className="d-flex align-items-center gap-2 small text-muted-custom">
                <span style={{ minWidth: '45px' }}>۱ ستاره</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '0%' }}></div></div>
                <span style={{ minWidth: '20px', textAnign: 'left' }}>۰</span>
              </div>
            </div>
          </div>

          <div className="review-list d-flex flex-column gap-3">
            <div className="review-item">
              <div className="d-flex align-items-center gap-3 mb-2">
                <img src="https://i.pravatar.cc/60?img=5" alt="نگار.ا" className="rounded-circle" style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                <div>
                  <b className="small text-plum fw-bold d-block">نگار.ا</b>
                  <span className="text-gold x-small">★★★★★</span>
                </div>
                <span className="small text-muted-custom ms-auto">۲ هفته پیش</span>
              </div>
              <p className="small text-dark m-0">قبل از رفتن تست کردم و دقیقاً همون چیزی شد که تو سایت دیدم. خیلی راضی‌ام.</p>
            </div>

            <div className="review-item">
              <div className="d-flex align-items-center gap-3 mb-2">
                <img src="https://i.pravatar.cc/60?img=9" alt="الهام.ک" className="rounded-circle" style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                <div>
                  <b className="small text-plum fw-bold d-block">الهام.ک</b>
                  <span className="text-gold x-small">★★★★★</span>
                </div>
                <span className="small text-muted-custom ms-auto">۱ ماه پیش</span>
              </div>
              <p className="small text-dark m-0">رنگش خیلی طبیعی و گرمه، به پوستم هم خیلی خوب اومد. سالن رزا هم برخورد خیلی خوبی داشت.</p>
            </div>

            <div className="review-item">
              <div className="d-flex align-items-center gap-3 mb-2">
                <img src="https://i.pravatar.cc/60?img=15" alt="پریسا.ن" className="rounded-circle" style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                <div>
                  <b className="small text-plum fw-bold d-block">پریسا.ن</b>
                  <span className="text-gold x-small">★★★★☆</span>
                </div>
                <span className="small text-muted-custom ms-auto">۲ ماه پیش</span>
              </div>
              <p className="small text-dark m-0">نتیجه تست هوش مصنوعی تقریباً نزدیک به واقعیت بود، فقط یکم روشن‌تر از چیزی که تصور می‌کردم دراومد.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-5 text-light" style={{ background: 'var(--plum)' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 small" style={{ color: '#EFE1E3' }}>
            <span style={{ color: '#CBB2B6' }}>© ۱۴۰۴ BSV Group. تمامی حقوق محفوظ است.</span>
            <div className="d-flex gap-3">
              <Link href="/articles" className="text-reset text-decoration-none hover-gold">مقالات</Link>
              <Link href="/terms" className="text-reset text-decoration-none hover-gold">قوانین استفاده</Link>
              <Link href="/" className="text-reset text-decoration-none hover-gold">صفحه اصلی</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* TRY MODAL BACKDROP & MODAL */}
      <div className={`modal-backdrop-custom ${isModalOpen ? 'open' : ''}`} onClick={(e) => e.target.classList.contains('modal-backdrop-custom') && setIsModalOpen(false)}>
        <div className="modal-custom">
          <div className="modal-close-custom" onClick={() => setIsModalOpen(false)}>✕</div>
          <h3 className="fs-5 fw-extrabold text-plum mb-1">تست رنگ کاراملی طبیعی</h3>
          <p className="small text-muted-custom mb-4">عکس واضح و روبه‌رو از موی خودت آپلود کن</p>

          <label className={`upload-zone ${userPhoto ? 'has-img' : ''}`}>
            <input type="file" accept="image/*" onChange={handleFileChange} className="d-none" />
            {userPhoto ? (
              <img src={userPhoto} alt="User Preview" className="upload-preview" />
            ) : (
              <div>
                <ImagePlus size={28} className="text-gold mx-auto mb-2" />
                <h5 className="fs-6 fw-bold text-plum mb-1">عکس خودت رو آپلود کن</h5>
                <span className="small text-muted-custom" style={{ fontSize: '12px' }}>فرمت JPG یا PNG</span>
              </div>
            )}
          </label>

          <button 
            className={`try-btn-main`} 
            disabled={!userPhoto || isAiLoading} 
            onClick={handleAiTry}
          >
            {isAiLoading ? (
              <span className="spinner-custom"></span>
            ) : (
              <>
                <Sparkles size={16} /> <span className="btn-label">امتحان با هوش مصنوعی</span>
              </>
            )}
          </button>

          <div className={`result-box-custom ${showAiResult ? 'show' : ''}`}>
            {userPhoto && <img src={userPhoto} alt="AI Result" className="w-100 rounded-3 mb-3" style={{ height: '200px', objectFit: 'cover' }} />}
            <div className="match-score d-flex align-items-center justify-content-between bg-custom-soft p-3 rounded-3 mb-3">
              <span className="small text-muted-custom fw-semibold">میزان تناسب با چهره شما</span>
              <span className="fs-5 fw-extrabold text-gold">{matchScore}</span>
            </div>
            
            <button 
              className="request-btn-custom fw-bold" 
              onClick={handleRequestBtn}
              style={isRequested ? { background: '#4C8C6B', color: '#fff' } : {}}
            >
              {isRequested ? (
                <>
                  <Check size={16} /> درخواست شما ثبت شد
                </>
              ) : (
                <>
                  <CalendarCheck size={16} /> درخواست نوبت از سالن رزا
                </>
              )}
            </button>
            <div className="small text-muted-custom text-center mt-2" style={{ fontSize: '11.5px' }}>
              نتیجه فقط جهت پیش‌نمایش است؛ خرید یا پرداختی در سایت انجام نمی‌شود.
            </div>
          </div>
        </div>
      </div>
<Footer/>
    </div>
  );
}