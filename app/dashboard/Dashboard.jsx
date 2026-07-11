
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, getUser, getToken, clearSession } from '../lib/api';

const catLabel = { hair: 'رنگ مو', brow: 'ابرو', lip: 'لب' };
const artCatLabel = { hair: 'رنگ مو', brow: 'ابرو', lip: 'لب', ai: 'هوش مصنوعی و زیبایی' };

export default function SalonPanel() {
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState('overview'); // overview | products | articles | requests | settings

  const [salon, setSalon] = useState(null);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Product form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ cat: 'hair', status: 'active', title: '', price: '', duration: '', desc: '', img: '' });

  // Article form
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: '', cat: 'ai', cover: '', excerpt: '', content: '', readTime: '۵ دقیقه' });

  // Settings form
  const [settingsForm, setSettingsForm] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!getToken() || !user) { router.replace('/auth'); return; }
    if (user.role !== 'salon') { router.replace('/dashboard'); return; }
    setAuthChecked(true);
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const [profileRes, statsRes, productsRes, articlesRes, apptRes] = await Promise.all([
        api('/api/salons/me/profile'),
        api('/api/salons/me/stats'),
        api('/api/products/salon/mine'),
        api('/api/articles/salon/mine'),
        api('/api/salons/me/appointments'),
      ]);
      setSalon(profileRes.salon);
      setSettingsForm(profileRes.salon);
      setStats(statsRes.stats);
      setProducts(productsRes.products);
      setArticles(articlesRes.articles);
      setAppointments(apptRes.appointments);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { clearSession(); router.push('/'); };

  // ---------- Products ----------
  const filteredProducts = products.filter(p => activeCat === 'all' || p.cat === activeCat);

  const openForm = (product = null) => {
    if (product) {
      setEditId(product._id);
      setFormData({
        cat: product.cat, status: product.status, title: product.title,
        price: product.price, duration: product.duration || '', desc: product.desc || '', img: product.img,
      });
    } else {
      setEditId(null);
      setFormData({ cat: 'hair', status: 'active', title: '', price: '', duration: '', desc: '', img: '' });
    }
    setIsFormOpen(true);
  };

  const handleFileChange = (e, setter, field = 'img') => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter((prev) => ({ ...prev, [field]: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('نمونه‌کار حذف شود؟')) return;
    try {
      await api(`/api/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) { alert(err.message); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const { product } = await api(`/api/products/${editId}`, { method: 'PUT', body: formData });
        setProducts((prev) => prev.map((p) => (p._id === editId ? product : p)));
      } else {
        const { product } = await api('/api/products', { method: 'POST', body: formData });
        setProducts((prev) => [product, ...prev]);
      }
      setIsFormOpen(false);
    } catch (err) { alert(err.message); }
  };

  // ---------- Articles ----------
  const openArticleForm = (article = null) => {
    if (article) {
      setEditArticleId(article._id);
      setArticleForm({ title: article.title, cat: article.cat, cover: article.cover, excerpt: article.excerpt, content: article.content, readTime: article.readTime });
    } else {
      setEditArticleId(null);
      setArticleForm({ title: '', cat: 'ai', cover: '', excerpt: '', content: '', readTime: '۵ دقیقه' });
    }
    setIsArticleFormOpen(true);
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('مقاله حذف شود؟')) return;
    try {
      await api(`/api/articles/${id}`, { method: 'DELETE' });
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) { alert(err.message); }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editArticleId) {
        const { article } = await api(`/api/articles/${editArticleId}`, { method: 'PUT', body: articleForm });
        setArticles((prev) => prev.map((a) => (a._id === editArticleId ? article : a)));
      } else {
        const { article } = await api('/api/articles', { method: 'POST', body: articleForm });
        setArticles((prev) => [article, ...prev]);
      }
      setIsArticleFormOpen(false);
    } catch (err) { alert(err.message); }
  };

  // ---------- Settings ----------
  const saveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const { salon: updated } = await api('/api/salons/me/profile', { method: 'PUT', body: settingsForm });
      setSalon(updated);
      alert('تغییرات ذخیره شد');
    } catch (err) { alert(err.message); } finally { setSavingSettings(false); }
  };

  if (!authChecked || loading || !salon) {
    return (
      <div className="layout">
        <main className="main" style={{ padding: 40 }}>
          <p className="text-muted-custom">
            {errorMsg ? `خطا: ${errorMsg}` : 'در حال بارگذاری داشبورد...'}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <Link href="/" className="side-logo">
          <span className="logo-mark"><span>BSV</span></span> پنل آرایشگر
        </Link>
        <div className="side-sub">مدیریت غرفه شما در گلچین</div>

        <div className="salon-card">
          <img src={salon.avatar} alt="" />
          <div>
            <b>{salon.name}</b>
            <span>عضو از {new Date(salon.memberSince || salon.createdAt).toLocaleDateString('fa-IR')}</span>
          </div>
        </div>

        <nav className="side-nav">
          <a className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}><i className="lucide lucide-layout-dashboard"></i><span>داشبورد</span></a>
          <a className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}><i className="lucide lucide-image"></i><span>نمونه‌کارها</span></a>
          <a className={tab === 'articles' ? 'active' : ''} onClick={() => setTab('articles')}><i className="lucide lucide-file-text"></i><span>مقالات</span></a>
          <a className={tab === 'requests' ? 'active' : ''} onClick={() => setTab('requests')}><i className="lucide lucide-inbox"></i><span>درخواست‌ها</span></a>
          <a className={tab === 'settings' ? 'active' : ''} onClick={() => setTab('settings')}><i className="lucide lucide-settings"></i><span>تنظیمات غرفه</span></a>
        </nav>

        <div className="side-foot">
          <Link href={`/salon/${salon.slug}`}><i className="lucide lucide-eye"></i> مشاهده غرفه عمومی</Link>
          <a onClick={handleLogout} style={{ cursor: 'pointer' }}><i className="lucide lucide-log-out"></i> خروج</a>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main">
        <div className="main-head">
          <div>
            <h1>سلام، {salon.name} 👋</h1>
            <p>خلاصه‌ی عملکرد غرفه شما در یک نگاه</p>
          </div>
          {tab === 'products' && (
            <button className="btn btn-primary" onClick={() => openForm()}>
              <i className="lucide lucide-plus"></i> افزودن نمونه‌کار جدید
            </button>
          )}
          {tab === 'articles' && (
            <button className="btn btn-primary" onClick={() => openArticleForm()}>
              <i className="lucide lucide-plus"></i> نوشتن مقاله جدید
            </button>
          )}
        </div>

        {/* ===== OVERVIEW ===== */}
        {tab === 'overview' && stats && (
          <>
            <div className="stats-row">
              <div className="stat-card">
                <div className="ico"><i className="lucide lucide-image"></i></div>
                <b>{stats.activeProducts}</b><span>نمونه‌کار فعال</span>
              </div>
              <div className="stat-card">
                <div className="ico"><i className="lucide lucide-sparkles"></i></div>
                <b>{stats.totalTests}</b><span>تست هوش مصنوعی کاربران</span>
              </div>
              <div className="stat-card">
                <div className="ico"><i className="lucide lucide-zap"></i></div>
                <b>{stats.tokensUsedByUsers}</b><span>توکن مصرف‌شده توسط کاربران</span>
              </div>
              <div className="stat-card">
                <div className="ico"><i className="lucide lucide-eye"></i></div>
                <b>{stats.totalViews}</b><span>بازدید کل نمونه‌کارها</span>
              </div>
              <div className="stat-card">
                <div className="ico"><i className="lucide lucide-inbox"></i></div>
                <b>{stats.appointmentsCount}</b><span>درخواست نوبت</span>
              </div>
              <div className="stat-card">
                <div className="ico"><i className="lucide lucide-qr-code"></i></div>
                <b>{stats.qrScans}</b><span>اسکن کیوآر کد غرفه</span>
              </div>
            </div>

            <div className="section-title">
              <h2>بازدید و تست هر نمونه‌کار</h2>
            </div>
            <div className="req-list mb-5">
              {stats.perProduct.length === 0 && <p className="text-muted-custom small">هنوز نمونه‌کاری ثبت نکردی.</p>}
              {stats.perProduct.map((p) => (
                <div className="req-item" key={p.productId}>
                  <div className="req-info"><h5>{p.title}</h5>
                    <p>{p.views} بازدید · {p.tests} تست هوش مصنوعی · {p.tokensUsed} توکن مصرف‌شده</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== PRODUCTS ===== */}
        {tab === 'products' && (
          <>
            <div className="section-title" id="products">
              <h2>نمونه‌کارهای من</h2>
              <div className="tab-group">
                <button className={activeCat === 'all' ? 'active' : ''} onClick={() => setActiveCat('all')}>همه</button>
                <button className={activeCat === 'hair' ? 'active' : ''} onClick={() => setActiveCat('hair')}>رنگ مو</button>
                <button className={activeCat === 'brow' ? 'active' : ''} onClick={() => setActiveCat('brow')}>ابرو</button>
                <button className={activeCat === 'lip' ? 'active' : ''} onClick={() => setActiveCat('lip')}>لب</button>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((p) => (
                <div className="product-card" key={p._id}>
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
                    <div className="price">{p.views} بازدید · {p.testsCount} تست</div>
                    <div className="product-actions">
                      <button className="action-btn" onClick={() => openForm(p)}>
                        <i className="lucide lucide-pencil"></i> ویرایش
                      </button>
                      <button className="action-btn danger" onClick={() => handleDelete(p._id)}>
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
          </>
        )}

        {/* ===== ARTICLES ===== */}
        {tab === 'articles' && (
          <>
            <div className="section-title"><h2>مقالات من</h2></div>
            <div className="product-grid">
              {articles.map((a) => (
                <div className="product-card" key={a._id}>
                  <div className="product-img">
                    <img src={a.cover} alt={a.title} />
                    <span className="cat-tag">{artCatLabel[a.cat]}</span>
                  </div>
                  <div className="product-info">
                    <h4>{a.title}</h4>
                    <div className="price">{a.views} بازدید</div>
                    <div className="product-actions">
                      <button className="action-btn" onClick={() => openArticleForm(a)}>
                        <i className="lucide lucide-pencil"></i> ویرایش
                      </button>
                      <button className="action-btn danger" onClick={() => handleDeleteArticle(a._id)}>
                        <i className="lucide lucide-trash-2"></i> حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="add-card" onClick={() => openArticleForm()}>
                <i className="lucide lucide-plus-circle"></i>
                <span>نوشتن مقاله جدید</span>
              </div>
            </div>
          </>
        )}

        {/* ===== REQUESTS ===== */}
        {tab === 'requests' && (
          <>
            <div className="section-title" id="requests"><h2>آخرین درخواست‌های نوبت</h2></div>
            <div className="req-list">
              {appointments.length === 0 && <p className="text-muted-custom small">هنوز درخواستی ثبت نشده.</p>}
              {appointments.map((r) => (
                <div className="req-item" key={r._id}>
                  <img src={r.user?.avatar || 'https://i.pravatar.cc/80?img=5'} alt="" />
                  <div className="req-info">
                    <h5>{r.user?.name}</h5>
                    <p>درخواست تست «{r.product?.title}» — {new Date(r.createdAt).toLocaleDateString('fa-IR')}</p>
                  </div>
                  <a className="req-badge" href={`tel:${r.user?.phone}`} style={{ textDecoration: 'none' }}>تماس با مشتری</a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== SETTINGS ===== */}
        {tab === 'settings' && settingsForm && (
          <>
            <div className="section-title"><h2>تنظیمات غرفه</h2></div>
            <form onSubmit={saveSettings} className="form-modal" style={{ position: 'static', maxWidth: 560 }}>
              <div className="field">
                <label>نام سالن</label>
                <input type="text" value={settingsForm.name} onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })} required />
              </div>
              <div className="field">
                <label>شماره تماس مستقیم (برای دکمه «درخواست نوبت» در اکسپلور)</label>
                <input type="tel" dir="rtl" value={settingsForm.phone} onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })} required />
              </div>
              <div className="field">
                <label>آدرس</label>
                <input type="text" value={settingsForm.address} onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })} />
              </div>
              <div className="field">
                <label>ساعات کاری</label>
                <input type="text" placeholder="مثلاً: هر روز ۱۰ تا ۲۰" value={settingsForm.workingHours} onChange={(e) => setSettingsForm({ ...settingsForm, workingHours: e.target.value })} />
              </div>
              <div className="field">
                <label>درباره سالن</label>
                <textarea rows="3" value={settingsForm.bio} onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}></textarea>
              </div>
              <div className="field">
                <label>عکس پروفایل غرفه</label>
                <label className="upload-mini" style={{ backgroundImage: settingsForm.avatar ? `url(${settingsForm.avatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setSettingsForm, 'avatar')} />
                  <span style={{ display: settingsForm.avatar ? 'none' : 'block' }}>برای آپلود عکس کلیک کن</span>
                </label>
              </div>
              <button type="submit" className="form-submit" disabled={savingSettings}>
                <i className="lucide lucide-check"></i> {savingSettings ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </button>
            </form>
          </>
        )}
      </main>

      {/* ===== PRODUCT MODAL FORM ===== */}
      <div className={`modal-backdrop ${isFormOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setIsFormOpen(false); }}>
        <div className="form-modal">
          <div className="modal-close" onClick={() => setIsFormOpen(false)}>✕</div>
          <h3>{editId ? 'ویرایش نمونه‌کار' : 'افزودن نمونه‌کار جدید'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>عکس نمونه‌کار</label>
              <label className="upload-mini" style={{ backgroundImage: formData.img ? `url(${formData.img})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFormData)} />
                <span style={{ display: formData.img ? 'none' : 'block' }}>برای آپلود عکس کلیک کن</span>
              </label>
            </div>
            <div className="field-row">
              <div className="field">
                <label>دسته‌بندی</label>
                <select value={formData.cat} onChange={(e) => setFormData({ ...formData, cat: e.target.value })}>
                  <option value="hair">رنگ مو</option>
                  <option value="brow">ابرو</option>
                  <option value="lip">لب</option>
                </select>
              </div>
              <div className="field">
                <label>وضعیت نمایش</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>عنوان نمونه‌کار</label>
              <input type="text" placeholder="مثلاً: رنگ کاراملی طبیعی" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="field-row">
              <div className="field">
                <label>قیمت تقریبی (تومان)</label>
                <input type="text" placeholder="۸۵۰,۰۰۰ تومان" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
              <div className="field">
                <label>مدت‌زمان انجام</label>
                <input type="text" placeholder="۲ ساعت" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>توضیحات (اختیاری)</label>
              <textarea rows="3" placeholder="توضیح کوتاه درباره این خدمت..." value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })}></textarea>
            </div>
            <button type="submit" className="form-submit"><i className="lucide lucide-check"></i> ذخیره نمونه‌کار</button>
          </form>
        </div>
      </div>

      {/* ===== ARTICLE MODAL FORM ===== */}
      <div className={`modal-backdrop ${isArticleFormOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setIsArticleFormOpen(false); }}>
        <div className="form-modal">
          <div className="modal-close" onClick={() => setIsArticleFormOpen(false)}>✕</div>
          <h3>{editArticleId ? 'ویرایش مقاله' : 'نوشتن مقاله جدید'}</h3>
          <form onSubmit={handleArticleSubmit}>
            <div className="field">
              <label>تصویر کاور</label>
              <label className="upload-mini" style={{ backgroundImage: articleForm.cover ? `url(${articleForm.cover})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setArticleForm, 'cover')} />
                <span style={{ display: articleForm.cover ? 'none' : 'block' }}>برای آپلود عکس کلیک کن</span>
              </label>
            </div>
            <div className="field-row">
              <div className="field">
                <label>دسته‌بندی</label>
                <select value={articleForm.cat} onChange={(e) => setArticleForm({ ...articleForm, cat: e.target.value })}>
                  <option value="hair">رنگ مو</option>
                  <option value="brow">ابرو</option>
                  <option value="lip">لب</option>
                  <option value="ai">هوش مصنوعی و زیبایی</option>
                </select>
              </div>
              <div className="field">
                <label>زمان مطالعه</label>
                <input type="text" placeholder="۵ دقیقه" value={articleForm.readTime} onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>عنوان مقاله</label>
              <input type="text" required value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} />
            </div>
            <div className="field">
              <label>خلاصه کوتاه</label>
              <textarea rows="2" required value={articleForm.excerpt} onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}></textarea>
            </div>
            <div className="field">
              <label>متن کامل مقاله</label>
              <textarea rows="8" required value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}></textarea>
            </div>
            <button type="submit" className="form-submit"><i className="lucide lucide-check"></i> ذخیره مقاله</button>
          </form>
        </div>
      </div>
    </div>
  );
}
