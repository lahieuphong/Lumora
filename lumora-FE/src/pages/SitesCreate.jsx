import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { sitesApi } from '../services/api'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  ImageIcon,
  CheckCircleIcon,
  MonitorIcon,
} from '../components/icons'
import {
  CREATE_SITE_STEPS,
  CREATE_TEMPLATE_FEATURES,
  CREATE_TEMPLATE_OVERVIEW,
  CREATE_TEMPLATE_PAGES,
  CREATE_TEMPLATE_TAGS,
  CREATE_SIMILAR_TEMPLATES,
} from '../constants/sitesData'

export default function SitesCreate() {
  const navigate = useNavigate()
  const activeStep = 3
  const [setup, setSetup] = useState(null)

  useEffect(() => {
    sitesApi.setup()
      .then(({ data }) => setSetup(data))
      .catch(() => setSetup(null))
  }, [])

  const siteSetup = {
    siteName: setup?.site_name || 'Enter site name',
    siteType: setup?.site_type || 'Website',
    ownerName: setup?.owner_name || '...',
    ownerInitials: setup?.owner_initials || 'U',
    domain: setup?.domain || 'my-site.acme.com',
    startingPoint: setup?.starting_point || 'Template',
  }

  return (
    <Layout>
      <div className="sc cs">
        <section className="cs-panel">
          <div className="cs-head">
            <div>
              <h1 className="cs-title">Create Site</h1>
              <p className="cs-sub">Select a template for your new site.</p>
            </div>
          </div>

          <div className="cs-stepper" aria-label="Create site progress">
            {CREATE_SITE_STEPS.map((step, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === activeStep
              const isDone = stepNumber < activeStep

              return (
                <div className={`cs-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`} key={step}>
                  <span className="cs-step-dot">{stepNumber}</span>
                  <span className="cs-step-label">{step}</span>
                </div>
              )
            })}
          </div>

          <div className="cs-grid">
            <div className="cs-main">
              <section className="cs-template-card">
                <div className="cs-template-top">
                  <div className="cs-preview-area">
                    <div className="cs-preview-row">
                      <div className="cs-preview-col">
                        <h2 className="cs-card-title">Business Website</h2>
                        <div className="cs-desktop-preview" aria-label="Desktop template preview">
                          <div className="cs-browser-nav">
                            <span className="cs-logo-chip">LOGO</span>
                            <div className="cs-mini-nav">
                              <span>Home</span>
                              <span>About</span>
                              <span>Services</span>
                              <span>Contact</span>
                            </div>
                            <button className="cs-mini-cta">Get Started</button>
                          </div>
                          <div className="cs-hero-wire">
                            <div>
                              <h3>Grow your business with confidence</h3>
                              <span className="cs-line wide" />
                              <span className="cs-line mid" />
                              <button className="cs-wire-btn">Get Started</button>
                            </div>
                            <div className="cs-image-wire">
                              <ImageIcon />
                            </div>
                          </div>
                          <div className="cs-feature-wire">
                            {[1, 2, 3].map(item => (
                              <div className="cs-wire-service" key={item}>
                                <span className="cs-service-icon"><CheckCircleIcon /></span>
                                <span className="cs-line tiny" />
                                <span className="cs-line short" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="cs-preview-col">
                        <h2 className="cs-card-title">Mobile preview</h2>
                        <div className="cs-mobile-preview" aria-label="Mobile template preview">
                          <div className="cs-mobile-head">
                            <span>LOGO</span>
                            <span className="cs-mobile-menu"><span /><span /><span /></span>
                          </div>
                          <h3>Grow your business with confidence</h3>
                          <span className="cs-line wide" />
                          <span className="cs-line mid" />
                          <button className="cs-wire-btn">Get Started</button>
                          <div className="cs-mobile-image"><ImageIcon /></div>
                          <span className="cs-service-icon mobile"><CheckCircleIcon /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cs-detail-grid">
                  <div className="cs-overview">
                    <div className="cs-tabs">
                      <button className="active">Overview</button>
                      <button>Pages Included</button>
                      <button>Features</button>
                    </div>
                    <div className="cs-overview-list">
                      {CREATE_TEMPLATE_OVERVIEW.map(({ Icon, label, value }) => (
                        <div className="cs-overview-row" key={label}>
                          <Icon />
                          <span className="cs-overview-label">{label}</span>
                          <span className="cs-overview-value">{value}</span>
                        </div>
                      ))}
                      <div className="cs-tag-row">
                        <span className="cs-overview-label">Tags</span>
                        <div className="cs-tags">
                          {CREATE_TEMPLATE_TAGS.map(tag => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cs-list-col">
                    <h3>Pages Included</h3>
                    {CREATE_TEMPLATE_PAGES.map(page => (
                      <div className="cs-check-row" key={page}>
                        <CheckCircleIcon />
                        {page}
                      </div>
                    ))}
                  </div>

                  <div className="cs-list-col">
                    <h3>Features</h3>
                    {CREATE_TEMPLATE_FEATURES.map(({ Icon, text }) => (
                      <div className="cs-check-row" key={text}>
                        <Icon />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="cs-similar">
                <div className="cs-section-head">
                  <h2>Similar Templates</h2>
                  <button aria-label="Next templates"><ChevronRightIcon /></button>
                </div>
                <div className="cs-similar-grid">
                  {CREATE_SIMILAR_TEMPLATES.map(({ title, desc }) => (
                    <button className="cs-similar-card" key={title}>
                      <span className="cs-similar-img"><ImageIcon /></span>
                      <strong>{title}</strong>
                      <span>{desc}</span>
                    </button>
                  ))}
                </div>
              </section>

              <div className="cs-bottom-actions">
                <button className="cs-btn-secondary" onClick={() => navigate('/sites')}>
                  <ChevronLeftIcon /> Back
                </button>
                <button className="cs-btn-primary">Continue &amp; Create Draft</button>
              </div>
            </div>

            <aside className="cs-aside">
              <section className="cs-side-card">
                <h2>Template Summary</h2>
                <div className="cs-summary-head">
                  <span className="cs-summary-img"><ImageIcon /></span>
                  <div>
                    <h3>Business Website</h3>
                    <p>Modern and conversion-focused website for businesses.</p>
                  </div>
                </div>
                <div className="cs-summary-list">
                  <div><span>Category</span><strong>Business</strong></div>
                  <div><span>Industry</span><strong>Professional Services</strong></div>
                  <div><span>Style</span><strong>Modern / Clean</strong></div>
                  <div><span>Status</span><strong className="cs-ready">Ready to use</strong></div>
                </div>
                <button className="cs-use-template">Use This Template</button>
                <button className="cs-preview-demo">Preview Demo <ExternalLinkIcon /></button>
                <button className="cs-link-button">Back to Suggestions</button>
              </section>

              <section className="cs-side-card">
                <h2>Your Site Setup</h2>
                <div className="cs-setup-list">
                  <div><span>Site Name</span><strong>{siteSetup.siteName}</strong></div>
                  <div><span>Site Type</span><strong><MonitorIcon /> {siteSetup.siteType}</strong></div>
                  <div>
                    <span>Owner</span>
                    <strong>
                      <span className="cs-mini-avatar">{siteSetup.ownerInitials}</span>
                      {siteSetup.ownerName} (you)
                    </strong>
                  </div>
                  <div><span>Domain</span><strong>{siteSetup.domain}</strong></div>
                  <div><span>Starting Point</span><strong>{siteSetup.startingPoint}</strong></div>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </Layout>
  )
}
