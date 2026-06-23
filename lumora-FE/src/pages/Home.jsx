import { useUser } from '../context/UserContext'
import Layout from '../components/Layout'
import {
  PlusIcon,
  DatabaseIcon,
  DotsIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from '../components/icons'
import {
  STORAGE_USED,
  STORAGE_TOTAL,
  OVERVIEW_STATS,
  QUICK_ACTIONS,
  CREATION_STEPS,
  RECENT_SITES,
  ACTIVITY,
  GUIDE_CARDS,
} from '../constants/homeData'

export default function Home() {
  const { name } = useUser()

  const storagePct = (STORAGE_USED / STORAGE_TOTAL) * 100

  return (
    <Layout>
      <div className="content">

        {/* Welcome */}
        <section className="welcome-card">
          <div className="welcome-text">
            <h1>Welcome back, {name || 'bạn'}!</h1>
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
                <div className="qa-icon"><PlusIcon /></div>
                <div className="qa-main-label">Create Website</div>
                <div className="qa-sub-btns">
                  <button className="sub-btn">Template</button>
                  <button className="sub-btn">AI</button>
                  <button className="sub-btn">Blank</button>
                </div>
                <p className="qa-desc">Create draft then open Builder Studio</p>
              </div>
              {QUICK_ACTIONS.map(({ id, Icon, label, desc }) => (
                <div className="qa-action" key={id}>
                  <div className="qa-a-icon"><Icon /></div>
                  <div className="qa-a-label">{label}</div>
                  <div className="qa-a-desc">{desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="flow-card">
            <h2 className="section-title">Website Creation Flow</h2>
            <div className="flow-steps">
              {CREATION_STEPS.map(({ n, title, desc }) => (
                <div className="flow-step" key={n}>
                  <div className="step-num">{n}</div>
                  <div>
                    <div className="step-title">{title}</div>
                    <div className="step-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="learn-link">
              Learn more about Builder Studio <ExternalLinkIcon />
            </a>
          </section>
        </div>

        {/* Overview */}
        <section className="overview-card">
          <h2 className="section-title">Overview</h2>
          <div className="overview-grid">
            {OVERVIEW_STATS.map(({ Icon, label, val, delta }, i) => (
              <div className="ov-item" key={i}>
                <div className="ov-icon"><Icon /></div>
                <div className="ov-label">{label}</div>
                <div className="ov-val">{val}</div>
                <div className="ov-delta">{delta}</div>
              </div>
            ))}
            <div className="ov-item">
              <div className="ov-icon"><DatabaseIcon /></div>
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
                {RECENT_SITES.map(({ name: siteName, url, status }, i) => (
                  <tr key={i}>
                    <td><div className="site-thumb" /></td>
                    <td>
                      <div className="site-name">{siteName}</div>
                      <div className="site-url">{url}</div>
                    </td>
                    <td>
                      <span className={`status-badge ${status === 'Published' ? 'pub' : 'dft'}`}>
                        {status}
                      </span>
                    </td>
                    <td>
                      <button className="more-btn" aria-label="More"><DotsIcon /></button>
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
              {ACTIVITY.map(({ Icon, text, t }, i) => (
                <div className="act" key={i}>
                  <div className="act-icon"><Icon /></div>
                  <div className="act-txt">
                    <p>{text}</p>
                    <time>{t}</time>
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
              Explore all guides <ExternalLinkIcon />
            </a>
          </div>
          <div className="guides-grid">
            {GUIDE_CARDS.map(({ Icon, title, desc }, i) => (
              <div className="guide-card" key={i}>
                <div className="guide-icon"><Icon /></div>
                <div className="guide-title">{title}</div>
                <p className="guide-desc">{desc}</p>
                <span className="guide-arrow"><ArrowRightIcon /></span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
