import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="foot-logo"><span className="logo-mark"><span>BSV</span></span> گلچین</div>
              <p className="desc">پلتفرم آزمایش مجازی زیبایی؛ جایی که آرایشگرها نمونه‌کارشون رو نشون می‌دن و تو با خیال راحت تصمیم می‌گیری.</p>
              <div className="foot-social">
                <a href="#"><i className="lucide lucide-instagram"></i></a>
                <a href="#"><i className="lucide lucide-send"></i></a>
                <a href="#"><i className="lucide lucide-music-2"></i></a>
              </div>
            </div>
            <div>
              <h5>دسته‌بندی‌ها</h5>
              <ul>
                <li><a href="#hair">رنگ مو</a></li>
                <li><a href="#brow">ابرو</a></li>
                <li><a href="#lip">لب</a></li>
                <li><Link href="/explorer">اکسپلور</Link></li>
              </ul>
            </div>
            <div>
              <h5>آرایشگران</h5>
              <ul>
                <li><Link href="/panel">ساخت غرفه</Link></li>
                <li><Link href="/panel">ورود به پنل</Link></li>
                <li><a href="#salons">مزایای عضویت</a></li>
              </ul>
            </div>
            <div>
              <h5>درباره BSV Group</h5>
              <ul>
                <li><a href="#">درباره ما</a></li>
                <li><a href="#">تماس با ما</a></li>
                <li><a href="#">قوانین و حریم خصوصی</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© ۱۴۰۵ BSV Group. تمامی حقوق محفوظ است.</span>
            <span>ساخته‌شده با ❤ برای بازار ایران</span>
          </div>
        </div>
      </footer>
    )
}

export default Footer;