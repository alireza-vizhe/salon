"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    // Scroll Event
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer برای انیمیشن‌ها
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .15 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  // تصحیح مشکل بررسی وضعیت لاگین
  useEffect(() => {
    // خواندن localStorage اینجا کاملاً امن است چون useEffect فقط در مرورگر اجرا می‌شود
    const isUserLogged = localStorage.getItem("log") === "logged";
    setLogged(isUserLogged);
  }, []); // آرایه وابستگی خالی است تا در زمان بیلد سرور ارور ندهد

  return (
    <>
      <header id="header" className={isScrolled ? 'scrolled' : ''}>
        <div className="container navwrap">
          <Link href="/" className="logo">
            <span className="logo-mark"><span>BSV</span></span>
            گلچین
          </Link>
          <nav>
            <ul>
              <li><a href="#hair">رنگ مو</a></li>
              <li><a href="#brow">ابرو</a></li>
              <li><a href="#lip">لب</a></li>
              <li><Link href="/explorer">اکسپلور</Link></li>
              <li><a href="#salons">برای آرایشگران</a></li>
              {logged ? null : (<li><Link href="/auth">ورود / ثبت نام</Link></li>)}
            </ul>
          </nav>
          <div className="header-cta">
            <Link href="/panel" className="btn btn-ghost">ورود آرایشگر</Link>
            <Link href="/explorer" className="btn btn-primary">
              <i className="lucide lucide-sparkles"></i>شروع تست رایگان
            </Link>
          </div>
          <div className="burger" onClick={() => setIsMenuOpen(true)}>☰</div>
        </div>
      </header>
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-close" onClick={closeMenu}>✕</div>
        <a href="#hair" onClick={closeMenu}>رنگ مو</a>
        <a href="#brow" onClick={closeMenu}>ابرو</a>
        <a href="#lip" onClick={closeMenu}>لب</a>
        <Link href="/explorer" onClick={closeMenu}>اکسپلور</Link>
        <a href="#salons" onClick={closeMenu}>برای آرایشگران</a>
        <Link href="/panel" className="btn btn-gold" onClick={closeMenu}>ورود آرایشگر</Link>
      </div>
    </>
  );
}

export default Header;