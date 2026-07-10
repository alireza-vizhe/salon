"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Phone, Lock, User, Sparkles, Store, ChevronLeft 
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page " style={{ direction: 'rtl' }}>
      
      {/* دکمه بازگشت به سایت */}
      <Link href="/" className="back-link">
        <ArrowRight size={18} />
        بازگشت به سایت
      </Link>

      <div className="auth-wrapper row g-0">
        
        {/* ستون راست: فرم ورود و ثبت‌نام */}
        <div className="col-12 col-lg-6 auth-form-side">
          
          {/* تب‌های تغییر حالت */}
          <div className="auth-tabs px-4">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              ورود
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              ثبت‌نام
            </button>
          </div>

          <div className="mb-4">
            <h2 className="fs-4 fw-extrabold text-plum mb-2">
              {isLogin ? 'خوش برگشتی!' : 'به گلچین خوش اومدی!'}
            </h2>
            <p className="text-muted-custom small">
              {isLogin 
                ? 'برای رزرو نوبت و تست مجازی، وارد حساب کاربری خودت شو.' 
                : 'با ثبت‌نام در گلچین، دنیای جدیدی از زیبایی رو تجربه کن.'}
            </p>
          </div>

          {/* فرم */}
          <form onSubmit={(e) => e.preventDefault()} className='px-4'>
            
            {/* فیلد نام (فقط در حالت ثبت‌نام نمایش داده می‌شود) */}
            {!isLogin && (
              <div className="input-group-custom">
                <input 
                  type="text" 
                  className="form-control-custom" 
                  placeholder="نام و نام خانوادگی" 
                />
                <User size={18} />
              </div>
            )}

            {/* فیلد شماره موبایل */}
            <div className="input-group-custom">
              <input 
                type="tel" 
                className="form-control-custom" 
                placeholder="شماره موبایل (مثال: ۰۹۱۲۳۴۵۶۷۸۹)" 
                dir="rtl"
              />
              <Phone size={18} />
            </div>

            {/* فیلد رمز عبور */}
            <div className="input-group-custom">
              <input 
                type="password" 
                className="form-control-custom" 
                placeholder="رمز عبور" 
              />
              <Lock size={18} />
            </div>

            {isLogin && (
              <div className="text-start mb-4">
                <Link href="#" className="text-muted-custom small text-decoration-none hover-plum" style={{ fontSize: '12px' }}>
                  رمز عبور رو فراموش کردی؟
                </Link>
              </div>
            )}

            {/* دکمه سابمیت */}
            <button type="submit" className="btn-submit">
              {isLogin ? 'ورود به حساب' : 'ثبت‌نام در سایت'}
              <ChevronLeft size={18} />
            </button>
          </form>

          {/* بخش دعوت به اقدام (CTA) مخصوص آرایشگران */}
          <div className="salon-cta mx-4">
            <h4><Store size={20} className="mb-1 ms-1 text-gold" /> آرایشگر هستید؟</h4>
            <p>
              با ساخت غرفه آنلاین در گلچین، نمونه‌کارهات رو به هزاران نفر نشون بده و قابلیت تست مجازی رو برای مشتری‌هات فعال کن.
            </p>
            <Link href="/panel" className="btn-salon">
              <Sparkles size={16} /> ساخت غرفه سالن زیبایی
            </Link>
          </div>

        </div>

        {/* ستون چپ: تصویر و برندینگ (در موبایل مخفی می‌شود) */}
        <div className="col-12 col-lg-6 auth-cover">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop" 
            alt="Beauty Cover" 
          />
          <div className="auth-cover-overlay">
            <div className="d-flex align-items-center gap-2 fs-5 fw-bold">
              <div className="logo-mark"><span>BSV</span></div>
              گلچین
            </div>
            <div>
              <h3 className="fw-black mb-2 fs-3">زیباییِ بدون تردید</h3>
              <p className="text-light opacity-75 small m-0" style={{ maxWidth: '300px', lineHeight: '1.8' }}>
                رنگ مو، فرم ابرو و استایل‌های جدید را پیش از اجرا، روی چهره خودتان تست کنید و با اطمینان تصمیم بگیرید.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}