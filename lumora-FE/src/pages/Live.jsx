import { useState } from 'react'
import Layout from '../components/Layout'
import {
  PlusIcon,
  UploadIcon,
  VideoIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsIcon,
  ArrowRightIcon,
  CalendarIcon,
  UsersIcon,
} from '../components/icons'
import {
  LIVE_STATS,
  LIVE_TABS,
  EVENTS_LIST,
  UPCOMING_EVENTS,
  LIVE_QUICK_ACTIONS,
  EVENT_STATUS_CLASS,
  EVENT_TYPE_ICON,
  LIVE_QUOTA,
} from '../constants/liveData'

export default function Live() {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <Layout>
      <div className="lv">

        {/* Page header */}
        <div className="lv-header">
          <div className="lv-title-wrap">
            <h1 className="lv-title">Live &amp; Events</h1>
            <p className="lv-sub">Manage livestreams, webinars, and online meetings.</p>
          </div>
          <div className="lv-actions">
            <button className="lv-btn-create">
              <PlusIcon /> Create New <ChevronDownIcon />
            </button>
            <button className="lv-btn-outline"><UploadIcon /> Import</button>
            <button className="lv-btn-outline"><VideoIcon /> View Library</button>
          </div>
        </div>

        {/* Stats */}
        <div className="lv-stats">
          {LIVE_STATS.map(({ Icon, val, label, sub }, i) => (
            <div className="lv-stat" key={i}>
              <div className="lv-stat-icon"><Icon /></div>
              <div className="lv-stat-info">
                <div className="lv-stat-val">{val}</div>
                <div className="lv-stat-label">{label}</div>
                <button className="lv-stat-sub">{sub} ›</button>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="lv-tabs">
          {LIVE_TABS.map(t => (
            <button
              key={t}
              className={`lv-tab ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Body: main table + right panel */}
        <div className="lv-body">

          {/* Left: filters + table + pagination */}
          <div className="lv-main">

            {/* Filters */}
            <div className="lv-filters">
              <div className="lv-search">
                <SearchIcon />
                <input placeholder="Search events..." />
              </div>
              <button className="lv-filter-btn">All Types <ChevronDownIcon /></button>
              <button className="lv-filter-btn">All Status <ChevronDownIcon /></button>
              <button className="lv-filter-btn"><CalendarIcon /> Date Range</button>
              <div className="lv-sort">
                Sort by: Start Time <ChevronDownIcon />
              </div>
            </div>

            {/* Table */}
            <div className="lv-table-wrap">
              <table className="lv-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Start Time</th>
                    <th>Attendees</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {EVENTS_LIST.map(({ id, name, desc, type, status, startDate, startTime, attendees }) => {
                    const TypeIcon  = EVENT_TYPE_ICON[type]
                    const statusCls = EVENT_STATUS_CLASS[status]
                    return (
                      <tr key={id}>
                        <td>
                          <div className="lv-event-cell">
                            <div className="lv-thumb" />
                            <div>
                              <div className="lv-event-name">{name}</div>
                              <div className="lv-event-desc">{desc}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="lv-type-cell">
                            {TypeIcon && <span className="lv-type-icon"><TypeIcon /></span>}
                            {type}
                          </div>
                        </td>
                        <td>
                          <span className={`lv-status ${statusCls}`}>{status}</span>
                        </td>
                        <td className="lv-time-cell">
                          <div className="lv-time-date">{startDate}</div>
                          <div className="lv-time-hour">{startTime}</div>
                        </td>
                        <td>
                          {attendees !== null
                            ? <div className="lv-attendees"><UsersIcon />{attendees.toLocaleString()}</div>
                            : <span className="lv-dash">—</span>
                          }
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
            <div className="lv-pagination">
              <span className="lv-page-info">Showing 1 to 7 of 25 results</span>
              <div className="lv-pages">
                <button className="lv-page-btn"><ChevronLeftIcon /></button>
                {[1, 2, 3].map(n => (
                  <button key={n} className={`lv-page-btn ${n === 1 ? 'active' : ''}`}>{n}</button>
                ))}
                <span className="lv-page-ellipsis">...</span>
                <button className="lv-page-btn">5</button>
                <button className="lv-page-btn"><ChevronRightIcon /></button>
              </div>
              <button className="lv-per-page">10 / page <ChevronDownIcon /></button>
            </div>

          </div>

          {/* Right panel */}
          <aside className="lv-panel">

            {/* Upcoming Events */}
            <section className="lv-upcoming">
              <div className="card-head">
                <h2 className="section-title mb0">Upcoming Events</h2>
                <a href="#" className="view-all">View all <ChevronRightIcon /></a>
              </div>
              <div className="lv-upcoming-list">
                {UPCOMING_EVENTS.map(({ date, name, time, registered }, i) => (
                  <div className="lv-upcoming-item" key={i}>
                    <div className="lv-date-badge">
                      <span className="lv-date-month">{date.month}</span>
                      <span className="lv-date-day">{date.day}</span>
                    </div>
                    <div className="lv-upcoming-info">
                      <div className="lv-upcoming-name">{name}</div>
                      <div className="lv-upcoming-time">{time}</div>
                      <div className="lv-upcoming-reg">{registered} registered</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="lv-quick-actions">
              <h2 className="section-title">Quick Actions</h2>
              <div className="lv-qa-list">
                {LIVE_QUICK_ACTIONS.map(({ Icon, label }, i) => (
                  <button className="lv-qa-item" key={i}>
                    <span className="lv-qa-icon"><Icon /></span>
                    {label}
                    <ArrowRightIcon />
                  </button>
                ))}
              </div>
            </section>

            {/* Live Room Quota */}
            <section className="lv-quota">
              <div className="card-head">
                <h2 className="section-title mb0">Live Room Quota</h2>
                <a href="#" className="view-all">View usage</a>
              </div>
              <p className="lv-quota-desc">
                You have {LIVE_QUOTA.total} live hours this month.
              </p>
              <div className="lv-quota-bar">
                <div
                  className="lv-quota-fill"
                  style={{ width: `${(LIVE_QUOTA.used / LIVE_QUOTA.total) * 100}%` }}
                />
              </div>
              <div className="lv-quota-numbers">
                <span className="lv-quota-used">{LIVE_QUOTA.used}</span>
                <span className="lv-quota-total"> / {LIVE_QUOTA.total} hours used</span>
              </div>
            </section>

          </aside>

        </div>
      </div>
    </Layout>
  )
}
