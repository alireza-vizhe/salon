"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// دیکشنری دسته‌بندی‌ها
const catLabel = { hair: 'رنگ مو', brow: 'ابرو', lip: 'لب' };

// داده‌های اولیه
const initialProducts = [
  { id: 1, cat: 'hair', title: 'رنگ کاراملی طبیعی', price: '۸۵۰,۰۰۰ تومان', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop', status: 'active' },
  { id: 2, cat: 'hair', title: 'بلوند عسلی با هایلایت', price: '۱,۲۰۰,۰۰۰ تومان', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop', status: 'active' },
  { id: 3, cat: 'brow', title: 'میکروبلیدینگ طبیعی', price: '۱,۸۰۰,۰۰۰ تومان', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop', status: 'active' },
  { id: 4, cat: 'lip', title: 'تاتو لب هلویی', price: '۲,۳۰۰,۰۰۰ تومان', img: 'https://images.unsplash.com/photo-1588159343745-445ae0b0b711?w=400&h=300&fit=crop', status: 'inactive' },
  { id: 5, cat: 'hair', title: 'مش شکلاتی', price: '۹۵۰,۰۰۰ تومان', img: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=300&fit=crop', status: 'active' },
];

export default function SalonPanel() {
  const [products, setProducts] = useState(initialProducts);
  const [activeCat, setActiveCat] = useState('all');
  
  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    cat: 'hair',
    status: 'active',
    title: '',
    price: '',
    duration: '',
    desc: '',
    img: ''
  });

  // فیلتر کردن محصولات
  const filteredProducts = products.filter(p => activeCat === 'all' || p.cat === activeCat);

  // حذف محصول
  const handleDelete = (indexToDelete) => {
    if (window.confirm('نمونه‌کار حذف شود؟')) {
      const actualIndex = products.findIndex(p => p.id === filteredProducts[indexToDelete].id);
      const newProducts = [...products];
      newProducts.splice(actualIndex, 1);
      setProducts(newProducts);
    }
  };

  // باز کردن فرم برای افزودن یا ویرایش
  const openForm = (index = null) => {
    if (index !== null) {
      const p = filteredProducts[index];
      const actualIndex = products.findIndex(item => item.id === p.id);
      setEditIndex(actualIndex);
      setFormData({
        cat: p.cat,
        status: p.status,
        title: p.title,
        price: p.price.replace(' تومان', ''),
        duration: p.duration || '',
        desc: p.desc || '',
        img: p.img
      });
    } else {
      setEditIndex(null);
      setFormData({
        cat: 'hair',
        status: 'active',
        title: '',
        price: '',
        duration: '',
        desc: '',
        img: ''
      });
    }
    setIsFormOpen(true);
  };

  // هندل کردن آپلود تصویر
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData({ ...formData, img: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  // ذخیره فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: editIndex !== null ? products[editIndex].id : Date.now(), // آی‌دی موقت
      cat: formData.cat,
      status: formData.status,
      title: formData.title,
      price: formData.price + ' تومان',
      img: formData.img || 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
      duration: formData.duration,
      desc: formData.desc,
    };

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
    } else {
      setProducts([newProduct, ...products]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <Link href="/" className="side-logo">
          <span className="logo-mark"><span>BSV</span></span> پنل آرایشگر
        </Link>
        <div className="side-sub">مدیریت غرفه شما در گلچین</div>

        <div className="salon-card">
          <img src="https://i.pravatar.cc/80?img=32" alt="" />
          <div>
            <b>سالن رزا</b>
            <span>عضو از فروردین ۱۴۰۵</span>
          </div>
        </div>

        <nav className="side-nav">
          <a href="#" className="active"><i className="lucide lucide-layout-dashboard"></i><span>داشبورد</span></a>
          <a href="#products"><i className="lucide lucide-image"></i><span>نمونه‌کارها</span></a>
          <a href="#requests"><i className="lucide lucide-inbox"></i><span>درخواست‌ها</span></a>
          <a href="#qr"><i className="lucide lucide-qr-code"></i><span>کیوآر کد غرفه</span></a>
          <a href="#"><i className="lucide lucide-settings"></i><span>تنظیمات غرفه</span></a>
        </nav>

        <div className="side-foot">
          <Link href="/explorer"><i className="lucide lucide-eye"></i> مشاهده غرفه عمومی</Link>
          <Link href="/"><i className="lucide lucide-log-out"></i> خروج</Link>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main">
        <div className="main-head">
          <div>
            <h1>سلام، سالن رزا 👋</h1>
            <p>خلاصه‌ی عملکرد غرفه شما در یک نگاه</p>
          </div>
          <button className="btn btn-primary" onClick={() => openForm()}>
            <i className="lucide lucide-plus"></i> افزودن نمونه‌کار جدید
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="ico"><i className="lucide lucide-image"></i></div>
            <b>۱۸</b><span>نمونه‌کار فعال</span>
          </div>
          <div className="stat-card">
            <div className="ico"><i className="lucide lucide-sparkles"></i></div>
            <b>۴۶۲</b><span>تست هوش مصنوعی این ماه</span>
            <div className="trend"><i className="lucide lucide-trending-up"></i> ۱۸٪ نسبت به ماه قبل</div>
          </div>
          <div className="stat-card">
            <div className="ico"><i className="lucide lucide-inbox"></i></div>
            <b>۳۱</b><span>درخواست نوبت جدید</span>
          </div>
          <div className="stat-card">
            <div className="ico"><i className="lucide lucide-qr-code"></i></div>
            <b>۱۲۰</b><span>اسکن کیوآر کد غرفه</span>
          </div>
        </div>

        <div className="qr-panel" id="qr">
          <div className="qr-visual">
            <svg viewBox="0 0 100 100">
              <g fill="#3E1626">
                <rect x="4" y="4" width="26" height="26"/><rect x="10" y="10" width="14" height="14" fill="#fff"/><rect x="14" y="14" width="6" height="6" fill="#3E1626"/>
                <rect x="70" y="4" width="26" height="26"/><rect x="76" y="10" width="14" height="14" fill="#fff"/><rect x="80" y="14" width="6" height="6" fill="#3E1626"/>
                <rect x="4" y="70" width="26" height="26"/><rect x="10" y="76" width="14" height="14" fill="#fff"/><rect x="14" y="80" width="6" height="6" fill="#3E1626"/>
                <rect x="40" y="4" width="6" height="6"/><rect x="50" y="4" width="6" height="6"/><rect x="40" y="14" width="6" height="6"/><rect x="58" y="14" width="6" height="6"/>
                <rect x="40" y="40" width="6" height="6"/><rect x="50" y="40" width="6" height="6"/><rect x="60" y="40" width="6" height="6"/><rect x="70" y="40" width="6" height="6"/><rect x="80" y="40" width="6" height="6"/>
                <rect x="40" y="50" width="6" height="6"/><rect x="60" y="50" width="6" height="6"/><rect x="90" y="50" width="6" height="6"/>
                <rect x="40" y="60" width="6" height="6"/><rect x="50" y="60" width="6" height="6"/><rect x="70" y="60" width="6" height="6"/><rect x="80" y="60" width="6" height="6"/>
                <rect x="40" y="70" width="6" height="6"/><rect x="60" y="70" width="6" height="6"/><rect x="90" y="70" width="6" height="6"/>
                <rect x="40" y="80" width="6" height="6"/><rect x="50" y="90" width="6" height="6"/><rect x="70" y="80" width="6" height="6"/><rect x="90" y="90" width="6" height="6"/>
                <rect x="40" y="90" width="6" height="6"/><rect x="60" y="90" width="6" height="6"/><rect x="80" y="90" width="6" height="6"/>
              </g>
            </svg>
          </div>
          <div>
            <h3>کیوآر کد اختصاصی غرفه «سالن رزا»</h3>
            <p>این کد رو روی ویترین یا صندلی سالن نصب کن تا مشتری‌ها همون‌جا داخل سالن، مدل موردنظرشون رو تست کنن.</p>
          </div>
          <div class="qr-actions">
            <button className="btn-sm gold"><i className="lucide lucide-download"></i> دانلود کد</button>
            <button className="btn-sm outline"><i className="lucide lucide-printer"></i> چاپ برچسب</button>
          </div>
        </div>

        <div className="section-title" id="products">
          <h2>نمونه‌کارهای من</h2>
          <div className="tab-group">
            <button className={activeCat === 'all' ? 'active' : ''} onClick={() => setActiveCat('all')}>همه</button>
            <button className={activeCat === 'hair' ? 'active' : ''} onClick={() => setActiveCat('hair')}>رنگ مو</button>
            <button className={activeCat === 'brow' ? 'active' : ''} onClick={() => setActiveCat('brow')}>ابرو</button>
            <button className={activeCat === 'lip' ? 'active' : ''} onClick={() => setActiveCat('lip')}>لب</button>
          </div>
        </div>

        <div className="product-grid" id="productGrid">
          {filteredProducts.map((p, i) => (
            <div className="product-card" key={p.id}>
              <div className="product-img">
                <img src={p.img} alt={p.title} />
                <span className="cat-tag">{catLabel[p.cat]}</span>
                <span className={`status-tag ${p.status === 'inactive' ? 'inactive' : ''}`}>
                  <i className={`lucide ${p.status === 'inactive' ? 'lucide-eye-off' : 'lucide-circle-check'}`}></i>
                  {p.status === 'inactive' ? 'غیرفعال' : 'فعال'}
                </span>
              </div>
              <div className="product-info">
                <h4>{p.title}</h4>
                <div className="price">قیمت: <b>{p.price}</b></div>
                <div className="product-actions">
                  <button className="action-btn" onClick={() => openForm(i)}>
                    <i className="lucide lucide-pencil"></i> ویرایش
                  </button>
                  <button className="action-btn danger" onClick={() => handleDelete(i)}>
                    <i className="lucide lucide-trash-2"></i> حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="add-card" onClick={() => openForm()}>
            <i className="lucide lucide-plus-circle"></i>
            <span>افزودن نمونه‌کار جدید</span>
          </div>
        </div>

        <div className="section-title" id="requests">
          <h2>آخرین درخواست‌های نوبت</h2>
        </div>
        <div className="req-list">
          <div className="req-item">
            <img src="https://i.pravatar.cc/80?img=5" alt="" />
            <div className="req-info"><h5>نگار احمدی</h5><p>درخواست تست «رنگ کاراملی طبیعی» — ۲ ساعت پیش</p></div>
            <span className="req-badge">جدید</span>
          </div>
          <div className="req-item">
            <img src="https://i.pravatar.cc/80?img=9" alt="" />
            <div className="req-info"><h5>الهام کریمی</h5><p>درخواست تست «بلوند عسلی با هایلایت» — دیروز</p></div>
            <span className="req-badge">جدید</span>
          </div>
          <div className="req-item">
            <img src="https://i.pravatar.cc/80?img=15" alt="" />
            <div className="req-info"><h5>پریسا نوری</h5><p>درخواست تست «مش شکلاتی» — ۲ روز پیش</p></div>
            <span className="req-badge">جدید</span>
          </div>
        </div>
      </main>
      
      {/* ===== MODAL FORM ===== */}
      <div 
        className={`modal-backdrop ${isFormOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsFormOpen(false);
        }}
      >
        <div className="form-modal">
          <div className="modal-close" onClick={() => setIsFormOpen(false)}>✕</div>
          <h3>{editIndex !== null ? 'ویرایش نمونه‌کار' : 'افزودن نمونه‌کار جدید'}</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>عکس نمونه‌کار</label>
              <label 
                className="upload-mini" 
                style={{ 
                  backgroundImage: formData.img ? `url(${formData.img})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <span style={{ display: formData.img ? 'none' : 'block' }}>برای آپلود عکس کلیک کن</span>
              </label>
            </div>
            
            <div className="field-row">
              <div className="field">
                <label>دسته‌بندی</label>
                <select 
                  value={formData.cat}
                  onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                >
                  <option value="hair">رنگ مو</option>
                  <option value="brow">ابرو</option>
                  <option value="lip">لب</option>
                </select>
              </div>
              <div className="field">
                <label>وضعیت نمایش</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>
            </div>
            
            <div className="field">
              <label>عنوان نمونه‌کار</label>
              <input 
                type="text" 
                placeholder="مثلاً: رنگ کاراملی طبیعی" 
                required 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div className="field-row">
              <div className="field">
                <label>قیمت تقریبی (تومان)</label>
                <input 
                  type="text" 
                  placeholder="۸۵۰,۰۰۰" 
                  required 
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="field">
                <label>مدت‌زمان انجام</label>
                <input 
                  type="text" 
                  placeholder="۲ ساعت" 
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>
            
            <div className="field">
              <label>توضیحات (اختیاری)</label>
              <textarea 
                rows="3" 
                placeholder="توضیح کوتاه درباره این خدمت..."
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              ></textarea>
            </div>
            
            <button type="submit" className="form-submit">
              <i className="lucide lucide-check"></i> ذخیره نمونه‌کار
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}