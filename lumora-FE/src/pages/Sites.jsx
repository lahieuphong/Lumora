import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import {
  PlusIcon,
  UploadIcon,
  LayoutIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  DotsIcon,
  SortDownIcon,
  SearchIcon,
  ArrowRightIcon,
  ImageIcon,
} from '../components/icons'
import {
  SITE_TABS,
  SITE_STATS,
  TYPE_ICON_MAP,
  STATUS_CLASS,
  SITES_LIST,
  SITE_TEMPLATES,
  SITE_TIPS,
} from '../constants/sitesData'

export default function Sites() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All Sites')
  const [selected, setSelected]   = useState(new Set())

  const allSelected = selected.size === SITES_LIST.length
  const anySelected = selected.size > 0

  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(SITES_LIST.map(s => s.id)))
  }

  const toggleOne = id => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Layout>
      <div className="sc">

        {/* Page header */}
        <div className="sc-header">
          <div className="sc-title-wrap">
            <h1 className="sc-title">Sites</h1>
            <p className="sc-sub">Manage your websites, landing pages, and event pages.</p>
          </div>
          <div className="sc-actions">
            <div className="sc-create-wrap">
              <button className="sc-btn-create" onClick={() => navigate('/sites/create')}>
                <PlusIcon /> Create Website
              </button>
              <div className="sc-create-pills">
                <button className="sc-pill">Template</button>
                <button className="sc-pill">AI</button>
                <button className="sc-pill">Blank</button>
              </div>
            </div>
            <button className="sc-btn-outline"><UploadIcon /> Import Site</button>
            <button className="sc-btn-outline"><LayoutIcon /> Start from Template</button>
          </div>
        </div>

        {/* Stats */}
        <div className="sc-stats">
          {SITE_STATS.map(({ Icon, label, val, delta }, i) => (
            <div className="sc-stat" key={i}>
              <div className="sc-stat-icon"><Icon /></div>
              <div className="sc-stat-label">{label}</div>
              <div className="sc-stat-val">{val}</div>
              <div className="sc-stat-delta">{delta}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="sc-tabs">
          {SITE_TABS.map(t => (
            <button
              key={t}
              className={`sc-tab ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="sc-filters">
          <div className="sc-search">
            <SearchIcon />
            <input placeholder="Search sites..." />
          </div>
          <button className="sc-filter-btn">
            <FilterIcon /> Filters <ChevronDownIcon />
          </button>
          <button className="sc-select-btn">All Types <ChevronDownIcon /></button>
          <button className="sc-select-btn">All Owners <ChevronDownIcon /></button>
          <div className="sc-sort">
            Sort by: Last updated <ChevronDownIcon />
          </div>
        </div>

        {/* Bulk actions */}
        <div className="sc-bulk">
          <span className="sc-selected-count">{selected.size} selected</span>
          <button className="sc-bulk-btn" disabled={!anySelected}>Publicted</button>
          <button className="sc-bulk-btn" disabled={!anySelected}>Publish</button>
          <button className="sc-bulk-btn" disabled={!anySelected}>Unpublish</button>
          <button className="sc-bulk-btn" disabled={!anySelected}>Move to Archive</button>
          <button className="sc-bulk-btn danger" disabled={!anySelected}>Delete</button>
        </div>

        {/* Table */}
        <div className="sc-table-wrap">
          <table className="sc-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="sc-check"
                    checked={allSelected}
                    onChange={toggleAll}
                  />
                </th>
                <th>Site</th>
                <th>Type</th>
                <th>Status</th>
                <th>Domain</th>
                <th>
                  <span className="sc-th-sort">Last updated <SortDownIcon /></span>
                </th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SITES_LIST.map(({ id, name, url, type, status, domain, updated, owner }) => {
                const TypeIcon = TYPE_ICON_MAP[type]
                return (
                  <tr key={id} className={selected.has(id) ? 'selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        className="sc-check"
                        checked={selected.has(id)}
                        onChange={() => toggleOne(id)}
                      />
                    </td>
                    <td>
                      <div className="sc-site-cell">
                        <div className="sc-thumb" />
                        <div>
                          <div className="sc-site-name">{name}</div>
                          <div className="sc-site-url">{url}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="sc-type-cell">
                        <span className="sc-type-icon">{TypeIcon && <TypeIcon />}</span>
                        {type}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${STATUS_CLASS[status]}`}>{status}</span>
                    </td>
                    <td>
                      <a href="#" className="sc-domain">
                        {domain}
                        <span className="sc-domain-icon"><ExternalLinkIcon /></span>
                      </a>
                    </td>
                    <td className="sc-updated">{updated}</td>
                    <td>
                      <div className="sc-owner">
                        <div className="sc-owner-av">{owner.initials}</div>
                        {owner.name}
                      </div>
                    </td>
                    <td>
                      <button className="more-btn" aria-label="More options"><DotsIcon /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="sc-pagination">
          <span className="sc-page-info">Showing 1 to 6 of 24 sites</span>
          <div className="sc-pages">
            <button className="sc-page-btn"><ChevronLeftIcon /></button>
            {[1, 2, 3, 4].map(n => (
              <button key={n} className={`sc-page-btn ${n === 1 ? 'active' : ''}`}>{n}</button>
            ))}
            <span className="sc-page-ellipsis">...</span>
            <button className="sc-page-btn">5</button>
            <button className="sc-page-btn"><ChevronRightIcon /></button>
          </div>
          <button className="sc-per-page">10 per page <ChevronDownIcon /></button>
        </div>

        {/* Bottom: Templates + Tips */}
        <div className="sc-bottom">
          <section className="sc-templates">
            <div className="card-head">
              <h2 className="section-title mb0">Start from a template</h2>
              <a href="#" className="view-all">
                View all templates <ExternalLinkIcon />
              </a>
            </div>
            <div className="sc-tmpl-grid">
              {SITE_TEMPLATES.map(({ title, desc }, i) => (
                <div className="sc-tmpl-card" key={i}>
                  <div className="sc-tmpl-img"><ImageIcon /></div>
                  <div className="sc-tmpl-title">{title}</div>
                  <p className="sc-tmpl-desc">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="sc-tips">
            <h2 className="section-title">Tips &amp; best practices</h2>
            <div className="sc-tips-list">
              {SITE_TIPS.map(({ Icon, title, desc }, i) => (
                <div className="sc-tip" key={i}>
                  <div className="sc-tip-icon"><Icon /></div>
                  <div className="sc-tip-body">
                    <div className="sc-tip-title">{title}</div>
                    <p className="sc-tip-desc">{desc}</p>
                  </div>
                  <button className="sc-tip-arr" aria-label="Read more"><ArrowRightIcon /></button>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </Layout>
  )
}
