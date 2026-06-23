import {
  GlobeIcon,
  CheckCircleIcon,
  DocIcon,
  LinkIcon,
  MonitorIcon,
  PageIcon,
  WifiIcon,
  SearchPlusIcon,
  BarChartIcon,
} from '../components/icons'

export const SITE_TABS = ['All Sites', 'Published', 'Drafts', 'Scheduled', 'Archived']

export const SITE_STATS = [
  { Icon: GlobeIcon,       label: 'Total Sites',       val: '24', delta: '↑ 3 this month' },
  { Icon: CheckCircleIcon, label: 'Published',         val: '15', delta: '↑ 2 this month' },
  { Icon: DocIcon,         label: 'Drafts',            val: '6',  delta: '↑ 1 this month' },
  { Icon: LinkIcon,        label: 'Connected Domains', val: '11', delta: '↑ 1 this month' },
]

export const TYPE_ICON_MAP = {
  'Website':      MonitorIcon,
  'Landing Page': PageIcon,
  'Event Page':   WifiIcon,
}

export const STATUS_CLASS = {
  Published: 'pub',
  Draft:     'dft',
  Scheduled: 'sch',
}

export const SITES_LIST = [
  { id: 0, name: 'Acme Marketing Site',  url: 'acme.com',               type: 'Website',      status: 'Published', domain: 'www.acme.com',      updated: '2 hours ago', owner: { initials: 'AV', name: 'Alex Yu' } },
  { id: 1, name: 'Product Launch',       url: 'launch.acme.com',        type: 'Landing Page', status: 'Draft',     domain: 'launch.acme.com',   updated: '5 hours ago', owner: { initials: 'AV', name: 'Alex Yu' } },
  { id: 2, name: 'Event Landing Page',   url: 'events.acme.com/summit', type: 'Event Page',   status: 'Scheduled', domain: 'events.acme.com',   updated: '8 hours ago', owner: { initials: 'JL', name: 'Jamie Lee' } },
  { id: 3, name: 'Webinar Page',         url: 'webinar.acme.com/2025',  type: 'Landing Page', status: 'Published', domain: 'webinar.acme.com',  updated: 'Yesterday',   owner: { initials: 'AV', name: 'Alex Yu' } },
  { id: 4, name: 'Internal Training',    url: 'training.acme.com',      type: 'Website',      status: 'Draft',     domain: 'training.acme.com', updated: '2 days ago',  owner: { initials: 'KM', name: 'Kim Martinez' } },
  { id: 5, name: 'Product Updates',      url: 'updates.acme.com',       type: 'Website',      status: 'Published', domain: 'updates.acme.com',  updated: '3 days ago',  owner: { initials: 'AV', name: 'Alex Yu' } },
]

export const SITE_TEMPLATES = [
  { title: 'Business Website', desc: 'Professional site for service-based businesses.' },
  { title: 'Landing Page',     desc: 'High-converting pages for campaigns.' },
  { title: 'Event Page',       desc: 'Promote events and manage registrations.' },
  { title: 'Webinar Page',     desc: 'Engage your audience with webinar pages.' },
]

export const SITE_TIPS = [
  { Icon: GlobeIcon,      title: 'Connect a custom domain', desc: 'Build trust and brand recognition with your own domain.' },
  { Icon: SearchPlusIcon, title: 'Optimize for SEO',        desc: 'Improve discoverability with meta tags and clean URLs.' },
  { Icon: BarChartIcon,   title: 'Track performance',       desc: 'Use analytics to understand your audience and improve results.' },
]
