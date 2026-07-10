"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Phone, Clock, Star, Sparkles, UploadCloud, 
  X, Instagram, ArrowLeft, CheckCircle2, Wand2 
} from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function SalonProfilePage() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [userUploaded, setUserUploaded] = useState(false); // شبیه‌سازی آپلود عکس کاربر

  // دیتای تستی نمونه‌کارها
  const portfolios = [
    { id: 1, type: 'رنگ مو', img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=500&fit=crop' },
    { id: 2, type: 'میکروبلیدینگ', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=500&fit=crop' },
    { id: 3, type: 'رنگ مو', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop' },
    { id: 4, type: 'شیدینگ لب', img: 'https://images.unsplash.com/photo-1588159343745-445ae0b0b711?w=400&h=500&fit=crop' },
    { id: 5, type: 'رنگ مو فانتزی', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop' },
    { id: 6, type: 'لیفت ابرو', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=500&fit=crop' },
  ];

  const handleOpenModal = (item) => {
    setSelectedStyle(item);
    setUserUploaded(false);
    setModalOpen(true);
  };

  return (
    <div className="min-vh-100 pb-5" style={{ direction: 'rtl' }}>
      
      {/* هدر ساده (مشابه صفحات قبل) */}
      <Header/>

      <div className="container salon-detail">
        <div className="row g-4">
          
          {/* ستون راست (پروفایل و اطلاعات تماس) */}
          <div className="col-12 col-lg-4">
            <div className="profile-card">
              <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop" alt="آرایشگر" className="profile-avatar" />
              <h1 className="fs-4 fw-extrabold text-plum mb-2">سارا معتمدی</h1>
              <div className="profile-badge mb-3">
                <CheckCircle2 size={14} className="text-gold" /> متخصص رنگ مو و کراتین
              </div>
              <p className="small text-muted-custom mb-4">
                با بیش از ۸ سال سابقه درخشان در لاین رنگ و لایت. دارای مدرک بین‌المللی از آکادمی لورآل.
              </p>
              <button className="btn-primary-custom mb-4">رزرو نوبت مشاوره</button>

              <div className="info-list text-start" dir="rtl">
                <div className="info-item">
                  <Star size={18} className="text-gold flex-shrink-0" />
                  <div><strong className="text-plum d-block">۴.۸ از ۵</strong><span className="small text-muted-custom">(۱۲۰ نظر ثبت شده)</span></div>
                </div>
                <div className="info-item">
                  <MapPin size={18} className="text-gold flex-shrink-0" />
                  <div><strong className="text-plum d-block">آدرس سالن</strong><span className="small text-muted-custom">تهران، سعادت آباد، بلوار دریا، پلاک ۴۵، طبقه دوم</span></div>
                </div>
                <div className="info-item">
                  <Phone size={18} className="text-gold flex-shrink-0" />
                  <div><strong className="text-plum d-block">شماره تماس</strong><span className="small text-muted-custom" dir="ltr">021 - 8899 4455</span></div>
                </div>
                <div className="info-item">
                  <Clock size={18} className="text-gold flex-shrink-0" />
                  <div><strong className="text-plum d-block">ساعات کاری</strong><span className="small text-muted-custom">همه‌روزه از ۱۰ صبح تا ۷ عصر (جز یکشنبه‌ها)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* ستون چپ (نمونه‌کارها، مقالات، نظرات) */}
          <div className="col-12 col-lg-8">
            
            <div className="salon-tabs">
              <button className={`salon-tab ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('portfolio')}>نمونه‌کارها</button>
              <button className={`salon-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>نظرات مشتریان</button>
              <button className={`salon-tab ${activeTab === 'articles' ? 'active' : ''}`} onClick={() => setActiveTab('articles')}>مقالات (۲)</button>
            </div>

            {/* تب نمونه‌کارها */}
            {activeTab === 'portfolio' && (
              <div className="portfolio-grid">
                {portfolios.map((item) => (
                  <div key={item.id} className="portfolio-card">
                    <img src={item.img} alt={item.type} />
                    <div className="portfolio-overlay">
                      <button className="btn-ai-test" onClick={() => handleOpenModal(item)}>
                        <Sparkles size={18} /> تست با هوش مصنوعی
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* تب نظرات */}
            {activeTab === 'reviews' && (
              <div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="review-card">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width:'40px', height:'40px', background:'var(--bg-soft)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--plum)', fontWeight:'bold' }}>م</div>
                        <div><strong className="text-plum d-block small">مریم ر.</strong><span className="text-muted-custom" style={{ fontSize:'11px' }}>۲ هفته پیش</span></div>
                      </div>
                      <div className="d-flex text-gold"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                    </div>
                    <p className="text-muted-custom small m-0 mt-3">کارشون فوق‌العاده است. قبل از کار با هوش مصنوعی رنگ رو بهم نشون دادن و دقیقاً همون چیزی شد که می‌خواستم. موهام اصلا آسیب ندید.</p>
                  </div>
                ))}
              </div>
            )}

            {/* تب مقالات */}
            {activeTab === 'articles' && (
              <div className="row g-3">
                <div className="col-md-6">
                  <Link href="/article" className="text-decoration-none d-block bg-surface p-3 rounded-4 border">
                    <h5 className="fs-6 fw-bold text-plum">چطور از موی دکلره شده مراقبت کنیم؟</h5>
                    <p className="small text-muted-custom mt-2 mb-0">نکاتی که بعد از لایت باید حتما رعایت کنید...</p>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link href="/article" className="text-decoration-none d-block bg-surface p-3 rounded-4 border">
                    <h5 className="fs-6 fw-bold text-plum">تفاوت بالیاژ و آمبره در چیست؟</h5>
                    <p className="small text-muted-custom mt-2 mb-0">بررسی دو تکنیک پرطرفدار رنگ مو...</p>
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* مودال تست هوش مصنوعی */}
      {modalOpen && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal-content">
            
            <div className="modal-head">
              <div>
                <h3 className="fs-5 fw-extrabold text-plum m-0 d-flex align-items-center gap-2">
                  <Sparkles size={20} className="text-gold" /> تست مجازی {selectedStyle?.type}
                </h3>
                <p className="text-muted-custom small m-0 mt-1">نتیجه این استایل را روی چهره خودتان ببینید</p>
              </div>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>

            <div className="p-4 p-md-5">
              <div className="row g-4 row-cols-1 row-cols-md-3 align-items-center">
                
                {/* باکس ۱: استایل انتخابی */}
                <div className="col">
                  <div className="text-center mb-2 fw-bold text-plum small">استایل انتخابی</div>
                  <div className="ai-box filled">
                    <img src={selectedStyle?.img} alt="مدل انتخابی" />
                  </div>
                </div>

                {/* باکس ۲: آپلود عکس کاربر */}
                <div className="col">
                  <div className="text-center mb-2 fw-bold text-plum small">عکس شما</div>
                  {userUploaded ? (
                     <div className="ai-box filled">
                       <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" alt="عکس کاربر" />
                     </div>
                  ) : (
                    <div className="ai-box">
                      <UploadCloud size={40} className="text-gold mb-3" />
                      <span className="text-plum fw-bold small">یک عکس تمام‌رخ واضح آپلود کنید</span>
                      <button className="upload-btn" onClick={() => setUserUploaded(true)}>انتخاب تصویر از گالری</button>
                    </div>
                  )}
                </div>

                {/* باکس ۳: نتیجه هوش مصنوعی */}
                <div className="col">
                  <div className="text-center mb-2 fw-bold text-plum small">نتیجه هوش مصنوعی</div>
                  <div className="ai-box" style={{ background: userUploaded ? 'var(--surface)' : 'var(--bg-soft)', borderColor: userUploaded ? 'var(--gold)' : 'var(--line)' }}>
                    {userUploaded ? (
                      <div className="ai-result-placeholder text-plum">
                        <Wand2 size={40} className="text-gold mb-2" />
                        <span className="fw-bold">در حال پردازش تصویر...</span>
                        <span className="small text-muted-custom">لطفاً چند ثانیه صبر کنید</span>
                      </div>
                    ) : (
                      <div className="ai-result-placeholder">
                        <Sparkles size={32} className="opacity-50 mb-2" />
                        <span>منتظر عکس شما هستیم</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* دکمه اکشن نهایی */}
              {userUploaded && (
                 <div className="text-center mt-5">
                   <button className="btn-primary-custom" style={{ width: 'auto', padding: '14px 40px' }}>ذخیره تصویر و رزرو نوبت</button>
                 </div>
              )}

            </div>
          </div>
        </div>
      )}
    <Footer/>
    </div>
  );
}