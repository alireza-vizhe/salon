"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // داده‌های محصولات برای رندر پویا
  const products = {
    hair: [
      { img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop', title: 'رنگ کاراملی طبیعی', salon: 'سالن رزا', price: '۸۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
      { img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop', title: 'بلوند عسلی با هایلایت', salon: 'آتلیه مریم', price: '۱,۲۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
      { img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=300&fit=crop', title: 'مش شکلاتی', salon: 'سالن ترمه', price: '۹۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
      { img: 'https://images.unsplash.com/photo-1519752594763-9edcc60c73c3?w=400&h=300&fit=crop', title: 'رنگ مسی روشن', salon: 'سالن رزا', price: '۷۹۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
      { img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', title: 'بلوند پلاتینه', salon: 'آتلیه مریم', price: '۱,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
    ],
    brow: [
      { img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop', title: 'میکروبلیدینگ طبیعی', salon: 'کلینیک نگار', price: '۱,۸۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
      { img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop', title: 'طراحی ابروی کلاسیک', salon: 'سالن ترمه', price: '۳۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
      { img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop', title: 'ابروی محو پودری', salon: 'کلینیک نگار', price: '۲,۱۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
      { img: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=300&fit=crop', title: 'لمینت ابرو', salon: 'آتلیه مریم', price: '۶۵۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
    ],
    lip: [
      { img: 'https://images.unsplash.com/photo-1588159343745-445ae0b0b711?w=400&h=300&fit=crop', title: 'تاتو لب هلویی', salon: 'کلینیک نگار', price: '۲,۳۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=44' },
      { img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop', title: 'رژ لب دائم قرمز مخملی', salon: 'سالن رزا', price: '۲,۰۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=32' },
      { img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop', title: 'طراحی فرم لب', salon: 'سالن ترمه', price: '۹۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=47' },
      { img: 'https://images.unsplash.com/photo-1512207736890-6ffed4bbf5f3?w=400&h=300&fit=crop', title: 'تاتو لب رزگلد', salon: 'آتلیه مریم', price: '۲,۵۰۰,۰۰۰ تومان', salonImg: 'https://i.pravatar.cc/40?img=25' },
    ]
  };

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

  // کامپوننت داخلی برای رندر کردن کارت‌های محصولات
  const ProductCard = ({ product }) => (
    <div className="card">
      <div className="card-img">
        <img src={product.img} alt={product.title} loading="lazy" />
        <div className="card-badge"><i className="lucide lucide-sparkles"></i> قابل تست</div>
      </div>
      <div className="card-body">
        <div className="card-salon"><img src={product.salonImg} alt="" /><span>{product.salon}</span></div>
        <h4>{product.title}</h4>
        <div className="card-price">قیمت تقریبی: <b>{product.price}</b></div>
        <Link href="/explorer" className="card-try">
          <i className="lucide lucide-camera"></i> امتحان با عکس من
        </Link>
      </div>
    </div>
  );

  return (
    <>
     <Header/>

      

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text reveal">
            <div className="eyebrow"><i className="lucide lucide-sparkles"></i> اولین پلتفرم آزمایش مجازی زیبایی در ایران</div>
            <h1>قبل از رفتن به آرایشگاه، <em>ببین بهت میاد یا نه</em></h1>
            <p className="lead">نمونه‌کارهای واقعی آرایشگرها رو تو غرفه‌های اختصاصی‌شون ببین، عکس خودتو با هوش مصنوعی امتحان کن و با خیال راحت تصمیم بگیر؛ رنگ مو، ابرو یا لب.</p>
            <div className="hero-actions">
              <Link href="/explorer" className="btn btn-primary"><i className="lucide lucide-camera"></i> تست کن ببین بهت میاد</Link>
              <a href="#salons" className="btn btn-ghost"><i className="lucide lucide-store"></i> آرایشگاه من رو ثبت کن</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><b>+240</b><span>غرفه فعال آرایشگاه</span></div>
              <div className="stat"><b>+8,500</b><span>تست هوش مصنوعی انجام‌شده</span></div>
              <div className="stat"><b>۴.۹ / ۵</b><span>رضایت کاربران</span></div>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="mirror">
              <div className="scan-ring"></div>
              <div className="mirror-face">
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="98" fill="#F1D3CB" />
                  <path d="M60 120 Q60 170 100 175 Q140 170 140 120 L140 90 Q140 55 100 50 Q60 55 60 90 Z" fill="#F7DFD6" />
                  <path d="M55 95 Q55 45 100 40 Q145 45 145 95" stroke="#5C2338" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <ellipse cx="80" cy="105" rx="5" ry="6" fill="#3E1626" />
                  <ellipse cx="120" cy="105" rx="5" ry="6" fill="#3E1626" />
                  <path d="M85 138 Q100 148 115 138" stroke="#B9294B" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="orbit-badge b1"><i className="lucide lucide-palette"></i> رنگ مو #B4622E</div>
            <div className="orbit-badge b2"><i className="lucide lucide-scan-face"></i> تحلیل زنده چهره</div>
            <div className="orbit-badge b3"><i className="lucide lucide-heart"></i> ۹۲٪ تطابق</div>
          </div>
        </div>
      </section>

      {/* CATEGORY: HAIR COLOR */}
      <section className="cat-block section-bg" id="hair">
        <div className="container">
          <div className="cat-head reveal">
            <div className="cat-head-left">
              <div className="cat-icon hair"><i className="lucide lucide-palette"></i></div>
              <div>
                <h3>رنگ مو</h3>
                <p>نمونه‌کارهای واقعی رنگ مو از غرفه‌ آرایشگرهای عضو</p>
              </div>
            </div>
            <Link href="/explorer#hair" className="cat-link">مشاهده همه <i className="lucide lucide-arrow-left"></i></Link>
          </div>
          <Link href="/product" >
          <div className="cat-scroll">
           {products.hair.map((p, idx) => <ProductCard key={idx} product={p} />)}
          </div>
          </Link>
        </div>
      </section>

      {/* CATEGORY: EYEBROW */}
      <section className="cat-block" id="brow">
        <div className="container">
          <div className="cat-head reveal">
            <div className="cat-head-left">
              <div className="cat-icon brow"><i className="lucide lucide-eye"></i></div>
              <div>
                <h3>ابرو</h3>
                <p>مدل‌های طراحی و میکروبلیدینگ ابرو از بهترین غرفه‌ها</p>
              </div>
            </div>
            <Link href="/explorer#brow" className="cat-link">مشاهده همه <i className="lucide lucide-arrow-left"></i></Link>
          </div>
          <div className="cat-scroll">
            {products.brow.map((p, idx) => <ProductCard key={idx} product={p} />)}
          </div>
        </div>
      </section>

      {/* CATEGORY: LIP */}
      <section className="cat-block section-bg" id="lip">
        <div className="container">
          <div className="cat-head reveal">
            <div className="cat-head-left">
              <div className="cat-icon lip"><i className="lucide lucide-smile"></i></div>
              <div>
                <h3>لب</h3>
                <p>تاتو، رنگ و طراحی لب؛ الهام بگیر و روی خودت امتحان کن</p>
              </div>
            </div>
            <Link href="/explorer#lip" className="cat-link">مشاهده همه <i className="lucide lucide-arrow-left"></i></Link>
          </div>
          <div className="cat-scroll">
            {products.lip.map((p, idx) => <ProductCard key={idx} product={p} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-tag">مسیر تصمیم‌گیری</div>
            <h2>از دیدن تا تصمیم، فقط ۴ قدم</h2>
            <p>دیگه لازم نیست حدس بزنی؛ قبل از رفتن به آرایشگاه با خیال راحت تصمیم بگیر.</p>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="step-num">۰۱</div>
              <h4>غرفه‌ها رو بگرد</h4>
              <p>نمونه‌کار واقعی آرایشگرهای عضو رو در اکسپلور یا صفحه اصلی ببین.</p>
            </div>
            <div className="step reveal">
              <div className="step-num">۰۲</div>
              <h4>عکس خودتو اضافه کن</h4>
              <p>روی هر نمونه که پسندیدی بزن و عکس خودت رو در مودال آپلود کن.</p>
            </div>
            <div className="step reveal">
              <div className="step-num">۰۳</div>
              <h4>با هوش مصنوعی امتحان کن</h4>
              <p>نتیجه رو روی صورت یا موی خودت به‌صورت واقعی ببین.</p>
            </div>
            <div className="step reveal">
              <div className="step-num">۰۴</div>
              <h4>درخواست بده و حضوری برو</h4>
              <p>اگه پسندیدی، درخواست بفرست و برای انجام کار به آرایشگاه مراجعه کن.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR SALONS */}
      <section className="section section-bg" id="salons">
        <div className="container">
          <div className="salon-cta reveal">
            <div className="salon-cta-grid">
              <div>
                <div className="eyebrow" style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.16)', color: '#F4E3E5' }}>برای آرایشگران و آرایشگاه‌ها</div>
                <h2>غرفه‌ی خودتو بساز، مشتری‌های مطمئن‌تری بگیر</h2>
                <p>وقتی مشتری قبل از اومدن، نتیجه کار رو روی خودش دیده باشه، دیگه با تردید وارد آرایشگاه نمی‌شه. کافیه نمونه‌کارهات رو در غرفه‌ی خودت آپلود کنی.</p>
                <div className="perk-list">
                  <div className="perk">
                    <div className="perk-ico"><i className="lucide lucide-store"></i></div>
                    <div><b>غرفه اختصاصی</b><span>صفحه‌ای مستقل با نمونه‌کارها، قیمت و مشخصات خدمات شما</span></div>
                  </div>
                  <div className="perk">
                    <div className="perk-ico"><i className="lucide lucide-qr-code"></i></div>
                    <div><b>کیوآر کد اختصاصی سالن</b><span>مشتری داخل سالن با اسکن کد، همون‌جا تست می‌کنه و مطمئن تصمیم می‌گیره</span></div>
                  </div>
                  <div className="perk">
                    <div className="perk-ico"><i className="lucide lucide-layout-dashboard"></i></div>
                    <div><b>پنل مدیریت ساده</b><span>افزودن، ویرایش و حذف نمونه‌کارها در چند ثانیه</span></div>
                  </div>
                </div>
                <div style={{ marginTop: '32px' }}>
                  <Link href="/panel" className="btn btn-gold"><i className="lucide lucide-arrow-left"></i> ساخت غرفه رایگان</Link>
                </div>
              </div>
              <div className="qr-box">
                <div className="qr-visual">
                  <svg viewBox="0 0 100 100">
                    <g fill="#3E1626">
                      <rect x="4" y="4" width="26" height="26" /><rect x="10" y="10" width="14" height="14" fill="#fff" /><rect x="14" y="14" width="6" height="6" fill="#3E1626" />
                      <rect x="70" y="4" width="26" height="26" /><rect x="76" y="10" width="14" height="14" fill="#fff" /><rect x="80" y="14" width="6" height="6" fill="#3E1626" />
                      <rect x="4" y="70" width="26" height="26" /><rect x="10" y="76" width="14" height="14" fill="#fff" /><rect x="14" y="80" width="6" height="6" fill="#3E1626" />
                      <rect x="40" y="4" width="6" height="6" /><rect x="50" y="4" width="6" height="6" /><rect x="40" y="14" width="6" height="6" /><rect x="58" y="14" width="6" height="6" />
                      <rect x="40" y="40" width="6" height="6" /><rect x="50" y="40" width="6" height="6" /><rect x="60" y="40" width="6" height="6" /><rect x="70" y="40" width="6" height="6" /><rect x="80" y="40" width="6" height="6" />
                      <rect x="40" y="50" width="6" height="6" /><rect x="60" y="50" width="6" height="6" /><rect x="90" y="50" width="6" height="6" />
                      <rect x="40" y="60" width="6" height="6" /><rect x="50" y="60" width="6" height="6" /><rect x="70" y="60" width="6" height="6" /><rect x="80" y="60" width="6" height="6" />
                      <rect x="40" y="70" width="6" height="6" /><rect x="60" y="70" width="6" height="6" /><rect x="90" y="70" width="6" height="6" />
                      <rect x="40" y="80" width="6" height="6" /><rect x="50" y="90" width="6" height="6" /><rect x="70" y="80" width="6" height="6" /><rect x="90" y="90" width="6" height="6" />
                      <rect x="40" y="90" width="6" height="6" /><rect x="60" y="90" width="6" height="6" /><rect x="80" y="90" width="6" height="6" />
                    </g>
                  </svg>
                </div>
                <h5>کیوآر کد غرفه شما</h5>
                <p>نصب روی ویترین یا صندلی سالن؛ مشتری همون‌جا تست می‌کنه</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-tag">تجربه کاربران</div>
            <h2>قبل از اینا هم مثل تو مطمئن نبودن</h2>
          </div>
          <div className="testi-grid">
            <div className="testi reveal">
              <div className="stars">★★★★★</div>
              <p>«همیشه از رنگ کردن مو می‌ترسیدم که بهم نیاد. اینجا اول تست کردم بعد رفتم آرایشگاه، دقیقاً همون چیزی شد که دیدم.»</p>
              <div className="testi-who"><img src="https://i.pravatar.cc/80?img=32" alt="" /><div><b>نگار احمدی</b><span>تهران</span></div></div>
            </div>
            <div className="testi reveal">
              <div className="stars">★★★★★</div>
              <p>«به‌عنوان آرایشگر، غرفه‌ام کمک کرد مشتری‌هایی بیان که از قبل مطمئن بودن. دیگه وقتم برای توضیح دادن تلف نمی‌شه.»</p>
              <div className="testi-who"><img src="https://i.pravatar.cc/80?img=47" alt="" /><div><b>سارا محمدی</b><span>آرایشگر، اصفهان</span></div></div>
            </div>
            <div className="testi reveal">
              <div className="stars">★★★★★</div>
              <p>«کیوآر کد رو داخل سالن روی صندلی گذاشتیم، مشتری‌ها خودشون قبل از شروع کار امتحان می‌کنن؛ خیلی حرفه‌ای شده کارمون.»</p>
              <div className="testi-who"><img src="https://i.pravatar.cc/80?img=25" alt="" /><div><b>مریم رضایی</b><span>آرایشگر، شیراز</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}