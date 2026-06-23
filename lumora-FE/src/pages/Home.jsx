import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, tokens } from '../services/api'

const I = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
  sites: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  live: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12.5a7 7 0 0 1 14 0"/><path d="M2 12.5a10 10 0 0 1 20 0"/><circle cx="12" cy="12.5" r="1.5" fill="currentColor" stroke="none"/></svg>,
  leads: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  members: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/><circle cx="17" cy="8" r="3.5"/><path d="M22 20c0-3.5-3.1-6-7-6"/></svg>,
  billing: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>,
  help: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="currentColor" stroke="none"/></svg>,
  chevDown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>,
  chevRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14"/></svg>,
  video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4z"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  upload: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>,
  hdd: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  dots: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  external: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
}

const NAV = [
  { id: 'home', label: 'Home', icon: I.home },
  { id: 'sites', label: 'Sites', icon: I.sites },
  { id: 'live', label: 'Live & Events', icon: I.live },
  { id: 'leads', label: 'Leads', icon: I.leads },
  { id: 'members', label: 'Members', icon: I.members },
  { id: 'billing', label: 'Billing', icon: I.billing },
]

const OVERVIEW = [
  { icon: I.globe, label: 'Published Sites', val: '3', delta: '↑ 1 this month' },
  { icon: I.live, label: 'Live Events', val: '2', delta: '↑ 1 this month' },
  { icon: I.users, label: 'Meetings', val: '5', delta: '↑ 2 this month' },
  { icon: I.leads, label: 'Leads', val: '128', delta: '↑ 18 this month' },
]

const QUICK = [
  { id: 'live', icon: I.video, label: 'Create Livestream', desc: 'Go live to audience' },
  { id: 'meeting', icon: I.users, label: 'Create Meeting', desc: 'Start a meeting room' },
  { id: 'form', icon: I.file, label: 'Create Form', desc: 'Collect leads' },
  { id: 'media', icon: I.upload, label: 'Upload Media', desc: 'Add to library' },
]

const STEPS = [
  { n: '1', title: 'Choose template / AI / blank', desc: 'Pick the best starting point.' },
  { n: '2', title: 'Create draft', desc: 'Set up your site in minutes.' },
  { n: '3', title: 'Open Builder Studio', desc: 'Launch the full website editor.' },
  { n: '4', title: 'Edit / Preview / Publish', desc: 'Build, preview, and publish your site.' },
]

const SITES = [
  { name: 'Acme Marketing Site', url: 'acme.com', status: 'Published' },
  { name: 'Product Launch', url: 'draft.acme.com', status: 'Draft' },
  { name: 'Event Landing Page', url: 'events.acme.com', status: 'Published' },
  { name: 'Internal Training', url: 'internal.acme.com', status: 'Draft' },
  { name: 'Webinar May 2025', url: 'webinar.acme.com', status: 'Published' },
]

const ACTS = [
  { icon: I.globe, text: 'You published "Acme Marketing Site"', t: '2 hours ago' },
  { icon: I.live, text: '"Product Launch" livestream ended', t: '5 hours ago' },
  { icon: I.leads, text: 'New lead from Contact Form', t: '8 hours ago' },
  { icon: I.upload, text: 'You uploaded 6 new files', t: 'Yesterday' },
  { icon: I.members, text: 'John Doe was added to workspace', t: '2 days ago' },
]

const GUIDES = [
  { icon: I.globe, title: 'Create Your First Website', desc: 'Build and publish a website in minutes.' },
  { icon: I.live, title: 'Go Live with Your Event', desc: 'Set up and host an engaging live stream.' },
  { icon: I.users, title: 'Start an Online Meeting', desc: 'Create a meeting room and invite participants.' },
  { icon: I.file, title: 'Manage Leads & Forms', desc: 'Create leads and manage submissions easily.' },
]

const STORAGE_USED = 12.4
const STORAGE_TOTAL = 50

export default function Home() {
  const navigate = useNavigate()
  const [active, setActive] = useState('home')
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
    return () => { mounted = false }
  }, [])

  const logout = () => {
    tokens.clear()
    navigate('/login', { replace: true })
  }

  const initials = (name || 'L')
    .trim()
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const storagePct = (STORAGE_USED / STORAGE_TOTAL) * 100

  return (
    <div className="app">
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`side ${open ? 'open' : ''}`}>
        <div className="side-brand">
          <div className="brand-logo">L</div>
          <div className="brand-text">
            <span className="brand-name">LUMORA</span>
            <span className="brand-sub">STUDIO</span>
          </div>
        </div>

        <nav className="nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`nav-item ${active === n.id ? 'active' : ''}`}
              onClick={() => { setActive(n.id); setOpen(false) }}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>

        <div className="side-foot">
          <div className="plan-card">
            <span className="plan-label">Plan &amp; Billing</span>
            <div className="plan-meta">Current Plan</div>
            <div className="plan-name">Pro</div>
            <div className="plan-meta">Next billing May 20, 2025</div>
            <div className="storage-label">Storage Used</div>
            <div className="storage-bar">
              <div className="storage-fill" style={{ width: `${storagePct}%` }} />
            </div>
            <div className="storage-text">
              {STORAGE_USED} GB <span>of {STORAGE_TOTAL} GB</span>
            </div>
            <button className="plan-link">
              View Billing Details {I.chevRight}
            </button>
          </div>

          <div className="help-card">
            <div className="help-icon">{I.help}</div>
            <div>
              <div className="help-title">Need help?</div>
              <a href="#" className="help-link">
                Visit Help Center {I.external}
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            {I.menu}
          </button>

          <div className="ws-select">
            <span className="ws-label">Workspace</span>
            <button className="ws-btn">
              <span className="ws-icon">W</span>
              Acme Corporation
              {I.chevDown}
            </button>
          </div>

          <div className="search">
            {I.search}
            <input placeholder="Search anything..." />
          </div>

          <div className="top-right">
            <button className="icon-btn" aria-label="Help">{I.help}</button>
            <button className="icon-btn notif" aria-label="Notifications">
              {I.bell}
              <span className="dot" />
            </button>
            <button className="user-btn" onClick={logout} title="Đăng xuất">
              <span className="avatar">{initials}</span>
              <span className="user-name">{name}</span>
              {I.chevDown}
            </button>
          </div>
        </header>

        <div className="content">
          {/* Welcome */}
          <section className="welcome-card">
            <div className="welcome-text">
              <h1>Welcome back, {name}!</h1>
              <p>Here&apos;s what&apos;s happening with your workspace today.</p>
            </div>
            <div className="welcome-visuals">
              <div className="vis-box a" />
              <div className="vis-box b" />
              <div className="vis-circle" />
            </div>
          </section>

          {/* Quick Actions + Creation Flow */}
          <div className="qa-row">
            <section className="qa-card">
              <h2 className="section-title">Quick Actions</h2>
              <div className="qa-grid">
                <div className="qa-main">
                  <div className="qa-icon">{I.plus}</div>
                  <div className="qa-main-label">Create Website</div>
                  <div className="qa-sub-btns">
                    <button className="sub-btn">Template</button>
                    <button className="sub-btn">AI</button>
                    <button className="sub-btn">Blank</button>
                  </div>
                  <p className="qa-desc">Create draft then open Builder Studio</p>
                </div>
                {QUICK.map(q => (
                  <div className="qa-action" key={q.id}>
                    <div className="qa-a-icon">{q.icon}</div>
                    <div className="qa-a-label">{q.label}</div>
                    <div className="qa-a-desc">{q.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="flow-card">
              <h2 className="section-title">Website Creation Flow</h2>
              <div className="flow-steps">
                {STEPS.map(s => (
                  <div className="flow-step" key={s.n}>
                    <div className="step-num">{s.n}</div>
                    <div>
                      <div className="step-title">{s.title}</div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="learn-link">
                Learn more about Builder Studio {I.external}
              </a>
            </section>
          </div>

          {/* Overview */}
          <section className="overview-card">
            <h2 className="section-title">Overview</h2>
            <div className="overview-grid">
              {OVERVIEW.map((o, i) => (
                <div className="ov-item" key={i}>
                  <div className="ov-icon">{o.icon}</div>
                  <div className="ov-label">{o.label}</div>
                  <div className="ov-val">{o.val}</div>
                  <div className="ov-delta">{o.delta}</div>
                </div>
              ))}
              <div className="ov-item">
                <div className="ov-icon">{I.hdd}</div>
                <div className="ov-label">Storage Used</div>
                <div className="ov-val">
                  {STORAGE_USED} GB <span className="ov-of">of {STORAGE_TOTAL} GB</span>
                </div>
                <div className="ov-bar">
                  <div className="ov-bar-fill" style={{ width: `${storagePct}%` }} />
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects + Activity */}
          <div className="bottom-row">
            <section className="sites-card">
              <div className="card-head">
                <h2 className="section-title mb0">Recent Projects / Sites</h2>
                <a href="#" className="view-all">View all</a>
              </div>
              <table className="sites-table">
                <tbody>
                  {SITES.map((s, i) => (
                    <tr key={i}>
                      <td><div className="site-thumb" /></td>
                      <td>
                        <div className="site-name">{s.name}</div>
                        <div className="site-url">{s.url}</div>
                      </td>
                      <td>
                        <span className={`status-badge ${s.status === 'Published' ? 'pub' : 'dft'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <button className="more-btn" aria-label="More options">{I.dots}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="goto-btn">Go to Sites</button>
            </section>

            <section className="act-card">
              <div className="card-head">
                <h2 className="section-title mb0">Recent Activity</h2>
                <a href="#" className="view-all">View all</a>
              </div>
              <div className="activity">
                {ACTS.map((a, i) => (
                  <div className="act" key={i}>
                    <div className="act-icon">{a.icon}</div>
                    <div className="act-txt">
                      <p>{a.text}</p>
                      <time>{a.t}</time>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Getting Started */}
          <section className="getting-started">
            <div className="card-head">
              <h2 className="section-title mb0">Getting Started with Lumora Studio</h2>
              <a href="#" className="view-all">
                Explore all guides {I.external}
              </a>
            </div>
            <div className="guides-grid">
              {GUIDES.map((g, i) => (
                <div className="guide-card" key={i}>
                  <div className="guide-icon">{g.icon}</div>
                  <div className="guide-title">{g.title}</div>
                  <p className="guide-desc">{g.desc}</p>
                  <span className="guide-arrow">{I.arrowRight}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
