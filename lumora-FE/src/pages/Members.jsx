import { useState } from 'react'
import Layout from '../components/Layout'
import {
  PlusIcon,
  DownloadIcon,
  ShieldIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsIcon,
  ArrowRightIcon,
  CalendarIcon,
  SendIcon,
  TrashIcon,
} from '../components/icons'
import {
  MEMBER_STATS,
  MEMBER_TABS,
  MEMBER_ROLE_CLASS,
  MEMBER_STATUS_CLASS,
  MEMBERS_LIST,
  RECENT_INVITES,
  ROLE_SUMMARY,
  MEMBER_QUICK_ACTIONS,
} from '../constants/membersData'

export default function Members() {
  const [activeTab, setActiveTab] = useState('All Members')
  const [selected, setSelected]   = useState(new Set())

  const allSelected = selected.size === MEMBERS_LIST.length
  const anySelected = selected.size > 0

  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(MEMBERS_LIST.map(m => m.id)))
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
      <div className="mb">

        {/* Page header */}
        <div className="mb-header">
          <div className="mb-title-wrap">
            <h1 className="mb-title">Members</h1>
            <p className="mb-sub">Manage your workspace members, invitations, and access roles.</p>
          </div>
          <div className="mb-actions">
            <button className="mb-btn-create"><PlusIcon /> Invite Member</button>
            <button className="mb-btn-outline"><DownloadIcon /> Export</button>
            <button className="mb-btn-outline"><ShieldIcon /> Roles &amp; Permissions</button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-stats">
          {MEMBER_STATS.map(({ Icon, val, label, delta }, i) => (
            <div className="mb-stat" key={i}>
              <div className="mb-stat-icon"><Icon /></div>
              <div className="mb-stat-info">
                <div className="mb-stat-label">{label}</div>
                <div className="mb-stat-val">{val}</div>
                <div className="mb-stat-delta">{delta}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-tabs">
          {MEMBER_TABS.map(t => (
            <button
              key={t}
              className={`mb-tab ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Body: main table + right panel */}
        <div className="mb-body">

          {/* Left: filters + bulk + table + pagination */}
          <div className="mb-main">

            {/* Filters */}
            <div className="mb-filters">
              <div className="mb-search">
                <SearchIcon />
                <input placeholder="Search members..." />
              </div>
              <button className="mb-filter-btn">All Roles <ChevronDownIcon /></button>
              <button className="mb-filter-btn">All Statuses <ChevronDownIcon /></button>
              <button className="mb-filter-btn"><CalendarIcon /> Last Active</button>
              <div className="mb-sort">Sort by: Newest <ChevronDownIcon /></div>
            </div>

            {/* Bulk actions */}
            <div className="mb-bulk">
              <input
                type="checkbox"
                className="mb-check"
                checked={allSelected}
                onChange={toggleAll}
              />
              <span className="mb-bulk-count">{selected.size} selected</span>
              <button className="mb-bulk-btn" disabled={!anySelected}><SendIcon /> Resend Invite</button>
              <button className="mb-bulk-btn" disabled={!anySelected}>
                Change Role <ChevronDownIcon />
              </button>
              <button className="mb-bulk-btn" disabled={!anySelected}>Deactivate</button>
              <button className="mb-bulk-btn danger" disabled={!anySelected}><TrashIcon /> Remove</button>
            </div>

            {/* Table */}
            <div className="mb-table-wrap">
              <table className="mb-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" className="mb-check" checked={allSelected} onChange={toggleAll} /></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th>
                      <span className="mb-th-sort">Joined / Invited <ChevronDownIcon /></span>
                    </th>
                    <th>Access / Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MEMBERS_LIST.map(({ id, name, isYou, email, role, status, lastDate, lastTime, joined, access }) => (
                    <tr key={id} className={selected.has(id) ? 'selected' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          className="mb-check"
                          checked={selected.has(id)}
                          onChange={() => toggleOne(id)}
                        />
                      </td>
                      <td>
                        <div className="mb-member-cell">
                          <div className="mb-thumb" />
                          <span className="mb-member-name">
                            {name}
                            {isYou && <span className="mb-you-tag">You</span>}
                          </span>
                        </div>
                      </td>
                      <td className="mb-email">{email}</td>
                      <td>
                        <span className={`mb-role ${MEMBER_ROLE_CLASS[role]}`}>{role}</span>
                      </td>
                      <td>
                        <span className={`mb-status ${MEMBER_STATUS_CLASS[status]}`}>{status}</span>
                      </td>
                      <td className="mb-time-cell">
                        {lastDate
                          ? <><div className="mb-time-date">{lastDate}</div><div className="mb-time-hour">{lastTime}</div></>
                          : <span className="mb-dash">—</span>
                        }
                      </td>
                      <td className="mb-joined">{joined}</td>
                      <td className={`mb-access ${status !== 'Active' ? 'muted' : ''}`}>{access}</td>
                      <td>
                        <button className="more-btn" aria-label="More options"><DotsIcon /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mb-pagination">
              <span className="mb-page-info">Showing 1 to 8 of 24 members</span>
              <div className="mb-pages">
                <button className="mb-page-btn"><ChevronLeftIcon /></button>
                {[1, 2, 3].map(n => (
                  <button key={n} className={`mb-page-btn ${n === 1 ? 'active' : ''}`}>{n}</button>
                ))}
                <button className="mb-page-btn"><ChevronRightIcon /></button>
              </div>
              <button className="mb-per-page">10 / page <ChevronDownIcon /></button>
            </div>

          </div>

          {/* Right panel */}
          <aside className="mb-panel">

            {/* Recent Invites */}
            <section className="mb-recent">
              <div className="card-head">
                <h2 className="section-title mb0">Recent Invites</h2>
                <a href="#" className="view-all">View all</a>
              </div>
              <div className="mb-invite-list">
                {RECENT_INVITES.map(({ name, date }, i) => (
                  <div className="mb-invite-item" key={i}>
                    <div className="mb-invite-thumb" />
                    <div className="mb-invite-info">
                      <span className="mb-invite-name">{name}</span>
                      <span className="mb-invite-date">{date}</span>
                    </div>
                    <span className="mb-invite-badge">Pending</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Role Summary */}
            <section className="mb-roles">
              <h2 className="section-title">Role Summary</h2>
              <div className="mb-role-list">
                {ROLE_SUMMARY.map(({ label, count, pct }, i) => (
                  <div className="mb-role-row" key={i}>
                    <div className="mb-role-head">
                      <span className="mb-role-label">{label}</span>
                      <span className="mb-role-count">{count} ({pct}%)</span>
                    </div>
                    <div className="mb-role-bar">
                      <div className="mb-role-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mb-quick-actions">
              <h2 className="section-title">Quick Actions</h2>
              <div className="mb-qa-list">
                {MEMBER_QUICK_ACTIONS.map(({ Icon, label }, i) => (
                  <button className="mb-qa-item" key={i}>
                    <span className="mb-qa-icon"><Icon /></span>
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
