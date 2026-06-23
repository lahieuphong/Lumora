import { useState } from 'react'
import Layout from '../components/Layout'
import {
  TrendingUpIcon,
  CreditCardIcon,
  DownloadIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  EditIcon,
  RotateCCWIcon,
} from '../components/icons'
import {
  BILLING_TABS,
  CURRENT_PLAN,
  USAGE_METRICS,
  USAGE_BREAKDOWN,
  INVOICE_STATUS_CLASS,
  INVOICES,
  BILLING_ACTIVITY,
  PAYMENT_METHOD,
  BILLING_CONTACT,
  COMPANY_DETAILS,
  BILLING_QUICK_ACTIONS,
} from '../constants/billingData'

export default function Billing() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <Layout>
      <div className="bl">

        {/* Page header */}
        <div className="bl-header">
          <div className="bl-title-wrap">
            <h1 className="bl-title">Billing</h1>
            <p className="bl-sub">Manage your subscription, usage, payment methods, and invoices.</p>
          </div>
          <div className="bl-actions">
            <button className="bl-btn-create"><TrendingUpIcon /> Upgrade Plan</button>
            <button className="bl-btn-outline"><CreditCardIcon /> Manage Payment Method</button>
            <button className="bl-btn-outline"><DownloadIcon /> Download Invoice</button>
          </div>
        </div>

        {/* Body: main content + sidebar */}
        <div className="bl-body">

          {/* Main content */}
          <div className="bl-main">

            {/* Tabs */}
            <div className="bl-tabs">
              {BILLING_TABS.map(t => (
                <button
                  key={t}
                  className={`bl-tab ${activeTab === t ? 'active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sections */}
            <div className="bl-sections">

              {/* Current Plan Card */}
              <div className="bl-plan-card">
                <div className="bl-plan-info">
                  <span className="bl-plan-label">Current Plan</span>
                  <div className="bl-plan-name">{CURRENT_PLAN.name}</div>
                  <div className="bl-plan-billing">{CURRENT_PLAN.billing}</div>
                  <div className="bl-plan-price">
                    <span className="bl-price">{CURRENT_PLAN.price}</span>
                    <span className="bl-period">{CURRENT_PLAN.period}</span>
                  </div>
                  <div className="bl-renew">
                    <CalendarIcon /> Renews on {CURRENT_PLAN.renewDate}
                  </div>
                </div>

                <div className="bl-plan-features">
                  <div className="bl-features-title">Plan includes</div>
                  <ul className="bl-features-list">
                    {CURRENT_PLAN.features.map(({ label, done }, i) => (
                      <li key={i} className={`bl-feature ${!done ? 'partial' : ''}`}>
                        <span className="bl-feature-icon">
                          {done ? <CheckCircleIcon /> : <span className="bl-open-circle" />}
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bl-plan-upsell">
                  <div className="bl-upsell-chart" />
                  <div className="bl-upsell-need">Need more?</div>
                  <p className="bl-upsell-desc">Upgrade to unlock higher limits, advanced features, and more team seats.</p>
                  <button className="bl-upgrade-btn">Upgrade Plan</button>
                </div>
              </div>

              {/* Usage Metrics */}
              <div className="bl-metrics">
                {USAGE_METRICS.map(({ label, used, total, pct }, i) => (
                  <div className="bl-metric" key={i}>
                    <div className="bl-metric-label">{label}</div>
                    <div className="bl-metric-val">
                      <span className="bl-metric-used">{used}</span>
                      <span className="bl-metric-total"> of {total}</span>
                    </div>
                    <div className="bl-metric-bar">
                      <div className="bl-metric-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="bl-metric-pct">{pct}% used</div>
                  </div>
                ))}
              </div>

              {/* Mid: Usage Breakdown + Invoice History */}
              <div className="bl-mid">

                {/* Usage Breakdown */}
                <div className="bl-breakdown-card">
                  <h2 className="section-title">Usage Breakdown</h2>
                  <div className="bl-breakdown-list">
                    {USAGE_BREAKDOWN.map(({ Icon, label, used, total, pct }, i) => (
                      <div className="bl-br-row" key={i}>
                        <span className="bl-br-icon"><Icon /></span>
                        <span className="bl-br-label">{label}</span>
                        <div className="bl-br-bar">
                          <div className="bl-br-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="bl-br-val">{used} / {total}</span>
                        <span className="bl-br-pct">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invoice History */}
                <div className="bl-invoice-card">
                  <h2 className="section-title">Invoice History</h2>
                  <div className="bl-inv-table-wrap">
                    <table className="bl-inv-table">
                      <thead>
                        <tr>
                          <th>Invoice ID</th>
                          <th><span className="bl-th-sort">Date <ChevronDownIcon /></span></th>
                          <th>Plan</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {INVOICES.map(({ id, date, plan, amount, status }) => (
                          <tr key={id}>
                            <td className="bl-inv-id">{id}</td>
                            <td className="bl-inv-date">{date}</td>
                            <td className="bl-inv-plan">{plan}</td>
                            <td className="bl-inv-amount">{amount}</td>
                            <td>
                              <span className={`bl-inv-status ${INVOICE_STATUS_CLASS[status]}`}>{status}</span>
                            </td>
                            <td>
                              {status === 'Failed'
                                ? <button className="bl-inv-btn retry" aria-label="Retry"><RotateCCWIcon /></button>
                                : <button className="bl-inv-btn" aria-label="Download"><DownloadIcon /></button>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bl-inv-pagination">
                    <span className="bl-inv-info">Showing 1 to 6 of 12 invoices</span>
                    <div className="bl-inv-pages">
                      <button className="bl-inv-pg-btn"><ChevronLeftIcon /></button>
                      <button className="bl-inv-pg-btn active">1</button>
                      <button className="bl-inv-pg-btn">2</button>
                      <button className="bl-inv-pg-btn"><ChevronRightIcon /></button>
                    </div>
                    <button className="bl-inv-per">10 / page <ChevronDownIcon /></button>
                  </div>
                </div>

              </div>

              {/* Recent Billing Activity */}
              <div className="bl-activity-card">
                <div className="card-head">
                  <h2 className="section-title mb0">Recent Billing Activity</h2>
                  <a href="#" className="view-all">View all activity <ArrowRightIcon /></a>
                </div>
                <div className="bl-act-list">
                  {BILLING_ACTIVITY.map(({ Icon, desc, time }, i) => (
                    <div className="bl-act-row" key={i}>
                      <div className="bl-act-icon"><Icon /></div>
                      <span className="bl-act-desc">{desc}</span>
                      <span className="bl-act-time">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <aside className="bl-sidebar">

            {/* Payment Method */}
            <div className="bl-sidebar-card">
              <div className="bl-sc-head">
                <span className="bl-sc-title">Payment Method</span>
                <button className="bl-sc-edit" aria-label="Edit"><EditIcon /></button>
              </div>
              <div className="bl-payment-row">
                <div className="bl-visa-badge">VISA</div>
                <div className="bl-card-info">
                  <div className="bl-card-name">Visa ending in {PAYMENT_METHOD.last4}</div>
                  <div className="bl-card-exp">Expires {PAYMENT_METHOD.expires}</div>
                </div>
              </div>
              <div className="bl-sc-links">
                <button className="bl-sc-link">Update payment method <ArrowRightIcon /></button>
                <button className="bl-sc-link">View all payment methods <ArrowRightIcon /></button>
              </div>
            </div>

            {/* Billing Contact + Company Details */}
            <div className="bl-sidebar-card">
              <div className="bl-sc-head">
                <span className="bl-sc-title">Billing Contact</span>
                <button className="bl-sc-edit" aria-label="Edit"><EditIcon /></button>
              </div>
              <div className="bl-contact-info">
                <div className="bl-contact-name">{BILLING_CONTACT.name}</div>
                <div className="bl-contact-meta">{BILLING_CONTACT.email}</div>
                <div className="bl-contact-meta">{BILLING_CONTACT.phone}</div>
              </div>
              <div className="bl-company-section">
                <div className="bl-company-subtitle">Company Details</div>
                <div className="bl-company-info">
                  <div className="bl-company-name">{COMPANY_DETAILS.name}</div>
                  <div className="bl-company-addr">{COMPANY_DETAILS.address}</div>
                  <div className="bl-company-addr">{COMPANY_DETAILS.city}</div>
                  <div className="bl-company-addr">{COMPANY_DETAILS.country}</div>
                  <div className="bl-company-addr">Tax ID: {COMPANY_DETAILS.taxId}</div>
                </div>
                <button className="bl-sc-link">Update billing details <ArrowRightIcon /></button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bl-sidebar-card">
              <span className="bl-sc-title">Quick Actions</span>
              <div className="bl-qa-list">
                {BILLING_QUICK_ACTIONS.map(({ Icon, label }, i) => (
                  <button className="bl-qa-item" key={i}>
                    <span className="bl-qa-icon"><Icon /></span>
                    {label}
                    <ArrowRightIcon />
                  </button>
                ))}
              </div>
            </div>

            {/* Need more power upsell */}
            <div className="bl-sidebar-card bl-upsell-sidebar">
              <div className="bl-us-chart" />
              <div className="bl-us-title">Need more power?</div>
              <p className="bl-us-desc">Compare plans and find the perfect fit for your team.</p>
              <button className="bl-us-btn">Compare Plans</button>
            </div>

          </aside>

        </div>
      </div>
    </Layout>
  )
}
