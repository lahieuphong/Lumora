import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { tokens } from '../services/api'
import { useUser } from '../context/UserContext'
import { NAV } from '../constants/nav'
import {
  SearchIcon,
  BellIcon,
  HelpCircleIcon,
  MenuIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  LogoutIcon,
} from './icons'

const STORAGE_USED  = 12.4
const STORAGE_TOTAL = 50

export default function Layout({ children }) {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const { name } = useUser()

  const logout = () => {
    tokens.clear()
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  const initials   = (name || 'U').trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2)
  const storagePct = (STORAGE_USED / STORAGE_TOTAL) * 100
  const activePath = location.pathname

  return (
    <div className="app">
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`side ${open ? 'open' : ''}`}>
        <div className="side-brand">
          <img src="/favicon.svg" className="brand-logo" alt="Lumora" />
          <div className="brand-text">
            <span className="brand-name">LUMORA</span>
            <span className="brand-sub">STUDIO</span>
          </div>
        </div>

        <nav className="nav">
          {NAV.map(({ id, label, Icon, path }) => (
            <button
              key={id}
              className={`nav-item ${activePath === path ? 'active' : ''}`}
              onClick={() => { navigate(path); setOpen(false) }}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        <div className="side-foot">
          <div className="plan-card">
            <span className="plan-label">Plan &amp; Billing</span>
            <div className="plan-meta">Current Plan</div>
            <div className="plan-name">Pro</div>
            <div className="plan-meta">Next billing May 20, 2025</div>
            <span className="storage-label">Storage Used</span>
            <div className="storage-bar">
              <div className="storage-fill" style={{ width: `${storagePct}%` }} />
            </div>
            <div className="storage-text">
              {STORAGE_USED} GB <span>of {STORAGE_TOTAL} GB</span>
            </div>
            <button className="plan-link">
              View Billing Details <ChevronRightIcon />
            </button>
          </div>

          <div className="help-card">
            <div className="help-icon"><HelpCircleIcon /></div>
            <div>
              <div className="help-title">Need help?</div>
              <a href="#" className="help-link">
                Visit Help Center <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>

          <div className="ws-select">
            <span className="ws-label">Workspace</span>
            <button className="ws-btn">
              <span className="ws-icon">W</span>
              Acme Corporation
              <ChevronDownIcon />
            </button>
          </div>

          <div className="topbar-search">
            <SearchIcon />
            <input placeholder="Search anything..." />
          </div>

          <div className="top-right">
            <button className="icon-btn" aria-label="Help"><HelpCircleIcon /></button>
            <button className="icon-btn notif" aria-label="Notifications">
              <BellIcon />
              <span className="dot" />
            </button>
            <div className="user-menu-wrap" ref={userMenuRef}>
              <button
                className="user-btn"
                onClick={() => setUserMenuOpen(v => !v)}
                aria-expanded={userMenuOpen}
              >
                <span className="avatar">{initials}</span>
                <span className="user-name">{name || '...'}</span>
                <span className={`user-chevron ${userMenuOpen ? 'open' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown">
                  <button className="ud-item ud-logout" onClick={logout}>
                    <LogoutIcon />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  )
}
