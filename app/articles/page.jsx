"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Exact data from original source code retained without omissions
  const articles = [
    { cat: 'hair', catLabel: 'رنگ مو', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=280&fit=crop', title: 'چه رنگ مویی به رنگ پوست شما میاد؟', desc: 'راهنمای کامل انتخاب رنگ مو بر اساس تون پوست و رنگ چشم.', time: '۵ دقیقه' },
    { cat: 'brow', catLabel: 'ابرو', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=280&fit=crop', title: 'میکروبلیدینگ یا هاشور؟ کدوم مناسب شماست', desc: 'تفاوت روش‌های مختلف طراحی دائم ابرو و مراقبت بعد از آن.', time: '۷ دقیقه' },
    { cat: 'lip', catLabel: 'لب', img: 'https://images.unsplash.com/photo-1588159343745-445ae0b0b711?w=400&h=280&fit=crop', title: 'همه‌چیز درباره تاتو لب و ماندگاری آن', desc: 'قبل از تاتو لب این نکات رو بدون تا نتیجه دلخواهت رو بگیری.', time: '۶ دقیقه' },
    { cat: 'ai', catLabel: 'هوش مصنوعی و زیبایی', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=280&fit=crop', title: 'دقت تست مجازی هوش مصنوعی چقدره؟', desc: 'بررسی میزان تطابق نتیجه شبیه‌سازی‌شده با نتیجه واقعی.', time: '۴ دقیقه' },
    { cat: 'hair', catLabel: 'رنگ مو', img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=280&fit=crop', title: 'مراقبت از موی رنگ‌شده در فصل تابستان', desc: 'نکاتی برای حفظ درخشندگی و ماندگاری رنگ مو در گرما.', time: '۵ دقیقه' },
    { cat: 'lip', catLabel: 'لب', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=280&fit=crop', title: 'رنگ لب دائم؛ مزایا و نکاتی که باید بدونید', desc: 'آیا رنگ لب دائم برای همه مناسب است؟ بررسی کامل.', time: '۶ دقیقه' },
    { cat: 'brow', catLabel: 'ابرو', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=280&fit=crop', title: 'فرم ابرو متناسب با شکل صورت', desc: 'چطور بهترین فرم ابرو رو متناسب با فرم صورتتون انتخاب کنید.', time: '۵ دقیقه' },
    { cat: 'ai', catLabel: 'هوش مصنوعی و زیبایی', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=280&fit=crop', title: 'چرا آرایشگرها باید غرفه آنلاین داشته باشند؟', desc: 'مزیت حضور در پلتفرم‌های نمونه‌کار برای جذب مشتری مطمئن‌تر.', time: '۷ دقیقه' },
    { cat: 'hair', catLabel: 'رنگ مو', img: 'https://images.unsplash.com/photo-1519752594763-9edcc60c73c3?w=400&h=280&fit=crop', title: 'ترندهای رنگ مو در فصل جدید', desc: 'مروری بر محبوب‌ترین سایه‌های رنگ مو این فصل.', time: '۴ دقیقه' },
  ];

  // Client-side filtering logic based on state selection
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(item => item.cat === activeCategory);

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ direction: 'rtl' }}>
      
      {/* HEADER */}
      <Header/>

      {/* PAGE HERO */}
      <section className="py-5 text-center mt-4">
        <div className="container">
          <div className="section-tag">مجله گلچین</div>
          <h1 className="fw-black text-plum mb-3" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)' }}>مقالات آرایش و زیبایی</h1>
          <p className="text-muted-custom mx-auto" style={{ maxWidth: '560px', fontSize: '16px' }}>
            راهنمای انتخاب رنگ مو، ابرو و لب، معرفی ترندهای روز و نکاتی برای تصمیم بهتر پیش از هر تغییر
          </p>
        </div>
      </section>

      {/* ARTICLES CONTAINER */}
      <div className="container flex-grow-1">
        
        {/* FILTER ROW */}
        <div className="d-flex gap-2 justify-content-center flex-wrap pb-5">
          <button className={`chip ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>همه مقالات</button>
          <button className={`chip ${activeCategory === 'hair' ? 'active' : ''}`} onClick={() => setActiveCategory('hair')}>رنگ مو</button>
          <button className={`chip ${activeCategory === 'brow' ? 'active' : ''}`} onClick={() => setActiveCategory('brow')}>ابرو</button>
          <button className={`chip ${activeCategory === 'lip' ? 'active' : ''}`} onClick={() => setActiveCategory('lip')}>لب</button>
          <button className={`chip ${activeCategory === 'ai' ? 'active' : ''}`} onClick={() => setActiveCategory('ai')}>هوش مصنوعی و زیبایی</button>
        </div>

        {/* FEATURED ARTICLE */}
        {activeCategory === 'all' && (
          <Link href="/article" className="featured-card">
            <div className="row g-0 w-100 m-0">
              <div className="col-12 col-md-6 p-0">
                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&h=600&fit=crop" alt="Featured Article" className="img-fluid" />
              </div>
              <div className="col-12 col-md-6 p-4 p-lg-5 d-flex flex-column justify-content-center">
                <span className="cat-pill">هوش مصنوعی و زیبایی</span>
                <h2 className="fs-4 fw-extrabold text-plum mb-3 lh-base">چطور قبل از رنگ کردن مو، نتیجه رو با هوش مصنوعی ببینیم؟</h2>
                <p className="text-muted-custom small mb-4">تست مجازی رنگ مو دیگه یک رویا نیست. در این مقاله می‌گیم این فناوری چطور کار می‌کنه و چرا میزان رضایت از رنگ مو رو تا چند برابر افزایش می‌ده.</p>
                <div className="d-flex align-items-center gap-2 text-muted-custom small mb-4 flex-wrap">
                  <img src="https://i.pravatar.cc/60?img=20" alt="Avatar" className="rounded-circle" style={{ width: '28px', height: '28px', objectFit: 'cover' }} />
                  <span>تحریریه گلچین</span><span>·</span><span>۱۲ تیر ۱۴۰۴</span><span>·</span><span>۶ دقیقه مطالعه</span>
                </div>
                <span className="read-link">ادامه مطلب <ArrowLeft size={16} /></span>
              </div>
            </div>
          </Link>
        )}

        {/* ARTICLES GRID */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 pb-5 mb-5">
          {filteredArticles.map((article, idx) => (
            <div className="col" key={idx}>
              <Link href="/article" className="article-card-custom">
                <div className="article-img-custom">
                  <img src={article.img} alt={article.title} />
                  <span className="article-cat-badge">{article.catLabel}</span>
                </div>
                <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between">
                  <div>
                    <h3 className="fs-6 fw-bold text-plum mb-2 lh-base">{article.title}</h3>
                    <p className="text-muted-custom small mb-4">{article.desc}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between text-muted-custom small mt-auto pt-2" style={{ fontSize: '12px' }}>
                    <span>تحریریه گلچین</span>
                    <span className="d-flex align-items-center gap-1">
                      <Clock size={13} /> {article.time}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>

      {/* FOOTER */}
      <Footer/>

    </div>
  );
}