import { useState } from 'react'
import Layout from '../components/Layout'
import {
  PlusIcon,
  UploadIcon,
  DownloadIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsIcon,
  ArrowRightIcon,
  CalendarIcon,
  PersonIcon,
  TagIcon,
  TrashIcon,
} from '../components/icons'
import {
  LEAD_STATS,
  LEAD_TABS,
  LEAD_STATUS_CLASS,
  LEADS_LIST,
  RECENT_SUBMISSIONS,
  LEAD_SOURCES,
  LEAD_QUICK_ACTIONS,
} from '../constants/leadsData'

export default function Leads() {
  const [activeTab, setActiveTab] = useState('All Leads')
  const [selected, setSelected]   = useState(new Set())

  const allSelected = selected.size === LEADS_LIST.length
  const anySelected = selected.size > 0

  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(LEADS_LIST.map(l => l.id)))
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
      <div className="ld">

        {/* Page header */}
        <div className="ld-header">
          <div className="ld-title-wrap">
            <h1 className="ld-title">Leads</h1>
            <p className="ld-sub">Manage contacts, form submissions, and lead status across your sites and events.</p>
          </div>
          <div className="ld-actions">
            <button className="ld-btn-create"><PlusIcon /> Create Form</button>
            <button className="ld-btn-outline"><UploadIcon /> Import Leads</button>
            <button className="ld-btn-outline"><DownloadIcon /> Export</button>
          </div>
        </div>

        {/* Stats */}
        <div className="ld-stats">
          {LEAD_STATS.map(({ Icon, val, label, delta }, i) => (
            <div className="ld-stat" key={i}>
              <div className="ld-stat-icon"><Icon /></div>
              <div className="ld-stat-info">
                <div className="ld-stat-label">{label}</div>
                <div className="ld-stat-val">{val}</div>
                <div className="ld-stat-delta">{delta}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="ld-tabs">
          {LEAD_TABS.map(t => (
            <button
              key={t}
              className={`ld-tab ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Body: main table + right panel */}
        <div className="ld-body">

          {/* Left: filters + bulk + table + pagination */}
          <div className="ld-main">

            {/* Filters */}
            <div className="ld-filters">
              <div className="ld-search">
                <SearchIcon />
                <input placeholder="Search leads..." />
              </div>
              <button className="ld-filter-btn">Source <ChevronDownIcon /></button>
              <button className="ld-filter-btn">Form <ChevronDownIcon /></button>
              <button className="ld-filter-btn">Owner <ChevronDownIcon /></button>
              <button className="ld-filter-btn"><CalendarIcon /> Date Range</button>
              <div className="ld-sort">Sort by: Newest <ChevronDownIcon /></div>
            </div>

            {/* Bulk actions */}
            <div className="ld-bulk">
              <input
                type="checkbox"
                className="ld-check"
                checked={allSelected}
                onChange={toggleAll}
              />
              <span className="ld-bulk-count">{selected.size} selected</span>
              <button className="ld-bulk-btn" disabled={!anySelected}><PersonIcon /> Assign</button>
              <button className="ld-bulk-btn" disabled={!anySelected}>
                Change Status <ChevronDownIcon />
              </button>
              <button className="ld-bulk-btn" disabled={!anySelected}><TagIcon /> Add Tag</button>
              <button className="ld-bulk-btn" disabled={!anySelected}><DownloadIcon /> Export</button>
              <button className="ld-bulk-btn danger" disabled={!anySelected}><TrashIcon /> Delete</button>
            </div>

            {/* Table */}
            <div className="ld-table-wrap">
              <table className="ld-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" className="ld-check" checked={allSelected} onChange={toggleAll} /></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Source</th>
                    <th>Form / Campaign</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>
                      <span className="ld-th-sort">Submitted <ChevronDownIcon /></span>
                    </th>
                    <th>Tags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADS_LIST.map(({ id, name, email, source, form, status, owner, submittedDate, submittedTime, tags }) => (
                    <tr key={id} className={selected.has(id) ? 'selected' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          className="ld-check"
                          checked={selected.has(id)}
                          onChange={() => toggleOne(id)}
                        />
                      </td>
                      <td>
                        <div className="ld-lead-cell">
                          <div className="ld-thumb" />
                          <span className="ld-lead-name">{name}</span>
                        </div>
                      </td>
                      <td className="ld-email">{email}</td>
                      <td className="ld-source-cell">{source}</td>
                      <td className="ld-form-cell">{form}</td>
                      <td>
                        <span className={`ld-status ${LEAD_STATUS_CLASS[status]}`}>{status}</span>
                      </td>
                      <td className="ld-owner">{owner}</td>
                      <td className="ld-time-cell">
                        <div className="ld-time-date">{submittedDate}</div>
                        <div className="ld-time-hour">{submittedTime}</div>
                      </td>
                      <td>
                        <div className="ld-tags">
                          {tags.map((tag, i) => (
                            <span className="ld-tag" key={i}>{tag}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button className="more-btn" aria-label="More options"><DotsIcon /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="ld-pagination">
              <span className="ld-page-info">Showing 1 to 8 of 1,248 results</span>
              <div className="ld-pages">
                <button className="ld-page-btn"><ChevronLeftIcon /></button>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} className={`ld-page-btn ${n === 1 ? 'active' : ''}`}>{n}</button>
                ))}
                <span className="ld-page-ellipsis">...</span>
                <button className="ld-page-btn">156</button>
                <button className="ld-page-btn"><ChevronRightIcon /></button>
              </div>
              <button className="ld-per-page">10 / page <ChevronDownIcon /></button>
            </div>

          </div>

          {/* Right panel */}
          <aside className="ld-panel">

            {/* Recent Submissions */}
            <section className="ld-recent">
              <div className="card-head">
                <h2 className="section-title mb0">Recent Submissions</h2>
                <a href="#" className="view-all">View all</a>
              </div>
              <div className="ld-sub-list">
                {RECENT_SUBMISSIONS.map(({ name, time, form, source }, i) => (
                  <div className="ld-sub-item" key={i}>
                    <div className="ld-sub-thumb" />
                    <div className="ld-sub-info">
                      <div className="ld-sub-row">
                        <span className="ld-sub-name">{name}</span>
                        <span className="ld-sub-time">{time}</span>
                      </div>
                      <div className="ld-sub-meta">{form} • {source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Lead Sources */}
            <section className="ld-sources">
              <h2 className="section-title">Lead Sources</h2>
              <div className="ld-source-list">
                {LEAD_SOURCES.map(({ label, count, pct }, i) => (
                  <div className="ld-source" key={i}>
                    <div className="ld-source-head">
                      <span className="ld-source-label">{label}</span>
                      <span className="ld-source-count">{count} ({pct}%)</span>
                    </div>
                    <div className="ld-source-bar">
                      <div className="ld-source-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="ld-quick-actions">
              <h2 className="section-title">Quick Actions</h2>
              <div className="ld-qa-list">
                {LEAD_QUICK_ACTIONS.map(({ Icon, label }, i) => (
                  <button className="ld-qa-item" key={i}>
                    <span className="ld-qa-icon"><Icon /></span>
                    {label}
                    <ArrowRightIcon />
                  </button>
                ))}
              </div>
            </section>

          </aside>

        </div>
      </div>
    </Layout>
  )
}
