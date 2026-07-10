import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Sparkles, Send, Link as LinkIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function ArticlePage() {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ direction: 'rtl' }}>
      
      {/* HEADER */}
      <Header/>

      {/* BREADCRUMB */}
      <div className="container pt-4 mt-5">
        <nav className="d-flex align-items-center gap-2 small text-muted-custom flex-wrap">
          <Link href="/" className="text-decoration-none text-muted-custom">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <Link href="/articles" className="text-decoration-none text-muted-custom">مقالات</Link>
          <ChevronLeft size={14} />
          <span className="text-plum">هوش مصنوعی و زیبایی</span>
        </nav>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="container">
        <article className="article-wrap">
          
          {/* Article Header */}
          <div className="text-center mb-4">
            <span className="cat-pill">هوش مصنوعی و زیبایی</span>
            <h1 className="fw-black text-plum mb-3 lh-base" style={{ fontSize: 'clamp(24px, 3.4vw, 36px)' }}>
              چطور قبل از رنگ کردن مو، نتیجه رو با هوش مصنوعی ببینیم؟
            </h1>
            <div className="d-flex align-items-center justify-content-center gap-2 small text-muted-custom">
              <img src="https://i.pravatar.cc/60?img=20" alt="Avatar" className="rounded-circle" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
              <span>تحریریه گلچین</span><span>·</span><span>۱۲ تیر ۱۴۰۴</span><span>·</span><span>۶ دقیقه مطالعه</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="cover-img">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=500&fit=crop" alt="هوش مصنوعی و زیبایی" />
          </div>

          {/* Article Body */}
          <div className="art-body">
            <p>
              یکی از رایج‌ترین دلواپسی‌های هر مراجعه به آرایشگاه این سؤاله: «اگه رنگ موم عوض بشه، بهم میاد یا نه؟» تا همین چند سال پیش، تنها راه پاسخ به این سؤال، اعتماد به تجربه آرایشگر و کمی شانس بود. اما امروز فناوری تست مجازی زیبایی، این عدم قطعیت رو تا حد زیادی از بین برده.
            </p>

            <h2>تست مجازی چطور کار می‌کند؟</h2>
            <p>
              در پلتفرم گلچین، هر آرایشگر نمونه‌کارهای واقعی خودش رو در غرفه‌ی اختصاصی‌اش آپلود می‌کنه. وقتی شما یک مدل رنگ مو، ابرو یا لب رو می‌پسندید، کافیه عکس خودتون رو آپلود کنید تا سیستم هوش مصنوعی، همون افکت رو به‌صورت واقع‌نمایانه روی تصویر شما شبیه‌سازی کنه.
            </p>

            <div className="pull-quote">
              «دیدن نتیجه پیش از تصمیم‌گیری، دقیقاً همون چیزیه که تجربه رفتن به آرایشگاه رو مطمئن‌تر می‌کنه.»
            </div>

            <h2>چرا این روش مهم است؟</h2>
            <ul>
              <li>کاهش نگرانی و تردید پیش از تغییر ظاهر</li>
              <li>افزایش رضایت نهایی از نتیجه کار</li>
              <li>صرفه‌جویی در وقت مشاوره حضوری در سالن</li>
              <li>امکان مقایسه چند مدل مختلف قبل از تصمیم نهایی</li>
            </ul>

            <p>
              نکته مهم اینه که نتیجه تست مجازی، یک پیش‌نمایش هوشمند است، نه تضمین قطعی نتیجه نهایی. عواملی مثل نوع و ضخامت مو، شرایط پوست و مهارت اجرا در نتیجه واقعی مؤثرند؛ به همین دلیل توصیه می‌شود پیش از هر اقدام، با آرایشگر منتخب مشورت کنید.
            </p>

            <div className="inline-cta">
              <div>
                <h4>می‌خوای خودت امتحان کنی؟</h4>
                <p>وارد اکسپلور شو و نمونه‌کار موردعلاقه‌ات رو با عکس خودت تست کن</p>
              </div>
              <Link href="/explorer" className="btn-gold">
                <Sparkles size={16} /> رفتن به اکسپلور
              </Link>
            </div>

            <h2>جمع‌بندی</h2>
            <p>
              تست مجازی زیبایی یک ابزار کمکی قدرتمند برای تصمیم‌گیری بهتره، نه جایگزین مشاوره تخصصی آرایشگر. بهترین نتیجه زمانی به دست میاد که این دو رو در کنار هم استفاده کنید: اول با هوش مصنوعی ایده بگیرید، بعد با آرایشگر منتخب‌تون مشورت نهایی رو انجام بدید.
            </p>
          </div>

          {/* Tags */}
          <div className="d-flex gap-2 flex-wrap mt-4">
            <span className="tag">تست مجازی</span>
            <span className="tag">رنگ مو</span>
            <span className="tag">هوش مصنوعی</span>
            <span className="tag">راهنمای زیبایی</span>
          </div>

          {/* Share Row */}
          <div className="share-row d-flex align-items-center justify-content-between flex-wrap gap-3">
            <span className="fw-semibold text-muted-custom" style={{ fontSize: '13.5px' }}>این مقاله رو با دیگران به اشتراک بذار</span>
            <div className="share-icons d-flex gap-2">
              <Link href="#"><Send size={18} /></Link>
              <Link href="#"><LinkIcon size={18} /></Link>
              {/* <Link href="#"><Instagram size={18} /></Link> */}
            </div>
          </div>

          {/* Related Articles */}
          <h3 className="fs-5 fw-extrabold text-plum mb-3">مقالات مرتبط</h3>
          <div className="row row-cols-1 row-cols-sm-3 g-3">
            <div className="col">
              <Link href="/article" className="rcard">
                <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=200&fit=crop" alt="مقاله مرتبط" />
                <div className="rcard-body">
                  <h5>چه رنگ مویی به رنگ پوست شما میاد؟</h5>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link href="/article" className="rcard">
                <img src="https://images.unsplash.com/photo-1595475884562-073c30d45670?w=300&h=200&fit=crop" alt="مقاله مرتبط" />
                <div className="rcard-body">
                  <h5>مراقبت از موی رنگ‌شده در فصل تابستان</h5>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link href="/article" className="rcard">
                <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop" alt="مقاله مرتبط" />
                <div className="rcard-body">
                  <h5>چرا آرایشگرها باید غرفه آنلاین داشته باشند؟</h5>
                </div>
              </Link>
            </div>
          </div>

        </article>
      </div>

      {/* FOOTER */}
      <Footer/>

    </div>
  );
}