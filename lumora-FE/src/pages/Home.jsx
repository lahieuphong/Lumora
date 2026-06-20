import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, tokens } from '../services/api'

/* ---- inline icons ---- */
const I = {
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>,
  video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4z"/></svg>,
  box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>,
  cart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.4 13.3a1 1 0 0 0 1 .7h9.2a1 1 0 0 0 1-.8L21 7H6"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18"/><path d="M7 14l3-4 3 3 4-6"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 6.6 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H2a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 3.2 6.6l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H8a1.6 1.6 0 0 0 1-1.5V2a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V8a1.6 1.6 0 0 0 1.5 1H22a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14"/></svg>,
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  spark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>,
}

const NAV = [
  { id: 'overview', label: 'Tổng quan', icon: I.grid },
  { id: 'sites', label: 'Trang web', icon: I.globe },
  { id: 'live', label: 'Livestream', icon: I.video },
  { id: 'products', label: 'Sản phẩm', icon: I.box },
  { id: 'orders', label: 'Đơn hàng', icon: I.cart },
  { id: 'analytics', label: 'Phân tích', icon: I.chart },
]

const STATS = [
  { ic: 'violet', icon: I.eye, val: '12.847', lbl: 'Lượt truy cập', delta: '+12,5%', up: true },
  { ic: 'amber', icon: I.cart, val: '₫48,2tr', lbl: 'Doanh thu tháng', delta: '+8,1%', up: true },
  { ic: 'red', icon: I.video, val: '1.204', lbl: 'Người xem live', delta: '+34%', up: true },
  { ic: 'green', icon: I.chart, val: '3,8%', lbl: 'Tỷ lệ chuyển đổi', delta: '-0,4%', up: false },
]

const SITES = [
  { name: 'Cửa hàng thời trang', meta: 'lumora.shop/fashion', cls: '', live: true },
  { name: 'Mỹ phẩm Aura', meta: 'aura.lumora.site', cls: 'b' },
  { name: 'Đồ gia dụng Nova', meta: 'nova.lumora.site', cls: 'c' },
  { name: 'Landing sự kiện', meta: 'event.lumora.site', cls: 'd' },
]

const ACTS = [
  { ic: 'ic violet', icon: I.cart, html: <><b>Đơn hàng #10293</b> vừa được tạo</>, t: '5 phút trước' },
  { ic: 'ic red', icon: I.video, html: <>Phiên live <b>Flash Sale 8.8</b> đã bắt đầu</>, t: '22 phút trước' },
  { ic: 'ic green', icon: I.globe, html: <><b>nova.lumora.site</b> đã xuất bản</>, t: '1 giờ trước' },
  { ic: 'ic amber', icon: I.spark, html: <>AI đã tạo 8 mô tả sản phẩm mới</>, t: '3 giờ trước' },
]

export default function Home() {
  const navigate = useNavigate()
  const [active, setActive] = useState('overview')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('bạn')

  useEffect(() => {
    let mounted = true
    authApi
      .me()
      .then(({ data }) => {
        if (mounted && data) setName(data.full_name || data.identifier || 'bạn')
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const logout = () => {
    tokens.clear()
    navigate('/login', { replace: true })
  }

  const initial = (name || 'L').trim().charAt(0).toUpperCase()

  return (
    <div className="app">
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <aside className={`side ${open ? 'open' : ''}`}>
        <div className="side-brand">
          <div className="mark">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FF7A45" />
                  <stop offset="1" stopColor="#E8453C" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="48" height="48" rx="14" fill="url(#hm)" />
              <path d="M26 22 L44 32 L26 42 Z" fill="#fff" />
            </svg>
          </div>
          <span className="name">LUMORA</span>
        </div>

        <nav className="nav">
          <span className="nav-label">Menu</span>
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-item ${active === n.id ? 'active' : ''}`}
              onClick={() => {
                setActive(n.id)
                setOpen(false)
              }}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
          <span className="nav-label">Khác</span>
          <button className="nav-item" onClick={() => setActive('settings')}>
            {I.gear}
            Cài đặt
          </button>
        </nav>

        <div className="side-foot">
          <div className="side-user">
            <div className="avatar">{initial}</div>
            <div className="who">
              <b>{name}</b>
              <span>Gói Pro</span>
            </div>
            <button className="logout" onClick={logout} aria-label="Đăng xuất" title="Đăng xuất">
              {I.logout}
            </button>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Mở menu">
            {I.menu}
          </button>
          <div className="search">
            {I.search}
            <input placeholder="Tìm trang web, sản phẩm, đơn hàng..." />
          </div>
          <div className="top-actions">
            <button className="btn-new">
              {I.plus}
              <span>Tạo trang web</span>
            </button>
            <button className="icon-btn" aria-label="Thông báo">
              {I.bell}
              <span className="dot" />
            </button>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div className="hero-glow" />
            <h1>Chào mừng trở lại, {name} 👋</h1>
            <p>
              Xây dựng trang web bằng AI, lên sóng trực tiếp và bán hàng — tất cả trong một nền tảng.
              Bắt đầu một dự án mới hoặc tiếp tục phiên livestream của bạn.
            </p>
            <div className="hero-cta">
              <button className="btn-primary">{I.spark} Tạo bằng AI</button>
              <button className="btn-ghost">{I.video} Lên sóng ngay</button>
            </div>
          </section>

          <section className="stats">
            {STATS.map((s, i) => (
              <div className="stat" key={i}>
                <div className={`ic ${s.ic}`}>{s.icon}</div>
                <div className="val">{s.val}</div>
                <div className="lbl">{s.lbl}</div>
                <div className={`delta ${s.up ? 'up' : 'down'}`}>
                  {s.up ? '▲' : '▼'} {s.delta} so với tháng trước
                </div>
              </div>
            ))}
          </section>

          <section className="cols">
            <div className="card">
              <div className="card-head">
                <h2>Trang web của bạn</h2>
                <a href="#">Xem tất cả</a>
              </div>
              <div className="sites">
                {SITES.map((s, i) => (
                  <div className="site" key={i}>
                    <div className={`thumb ${s.cls}`}>
                      {s.live ? (
                        <span className="badge">
                          <span className="live-dot" /> LIVE
                        </span>
                      ) : (
                        <span className="badge">Đã xuất bản</span>
                      )}
                    </div>
                    <div className="meta">
                      <b>{s.name}</b>
                      <span>{s.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <h2>Hoạt động gần đây</h2>
              </div>
              <div className="activity">
                {ACTS.map((a, i) => (
                  <div className="act" key={i}>
                    <div className={`ad ${a.ic}`}>{a.icon}</div>
                    <div className="txt">
                      <p>{a.html}</p>
                      <time>{a.t}</time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
