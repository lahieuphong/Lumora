import {
  GlobeIcon,
  WifiIcon,
  UsersIcon,
  PersonIcon,
  VideoIcon,
  FileIcon,
  UploadIcon,
} from '../components/icons'

export const STORAGE_USED  = 12.4
export const STORAGE_TOTAL = 50

export const OVERVIEW_STATS = [
  { Icon: GlobeIcon,  label: 'Published Sites', val: '3',   delta: '↑ 1 this month' },
  { Icon: WifiIcon,   label: 'Live Events',     val: '2',   delta: '↑ 1 this month' },
  { Icon: UsersIcon,  label: 'Meetings',        val: '5',   delta: '↑ 2 this month' },
  { Icon: PersonIcon, label: 'Leads',           val: '128', delta: '↑ 18 this month' },
]

export const QUICK_ACTIONS = [
  { id: 'live',    Icon: VideoIcon,  label: 'Create Livestream', desc: 'Go live to audience' },
  { id: 'meeting', Icon: UsersIcon,  label: 'Create Meeting',    desc: 'Start a meeting room' },
  { id: 'form',    Icon: FileIcon,   label: 'Create Form',       desc: 'Collect leads' },
  { id: 'media',   Icon: UploadIcon, label: 'Upload Media',      desc: 'Add to library' },
]

export const CREATION_STEPS = [
  { n: '1', title: 'Choose template / AI / blank', desc: 'Pick the best starting point.' },
  { n: '2', title: 'Create draft',                 desc: 'Set up your site in minutes.' },
  { n: '3', title: 'Open Builder Studio',          desc: 'Launch the full website editor.' },
  { n: '4', title: 'Edit / Preview / Publish',     desc: 'Build, preview, and publish your site.' },
]

export const RECENT_SITES = [
  { name: 'Acme Marketing Site', url: 'acme.com',          status: 'Published' },
  { name: 'Product Launch',      url: 'draft.acme.com',    status: 'Draft' },
  { name: 'Event Landing Page',  url: 'events.acme.com',   status: 'Published' },
  { name: 'Internal Training',   url: 'internal.acme.com', status: 'Draft' },
  { name: 'Webinar May 2025',    url: 'webinar.acme.com',  status: 'Published' },
]

export const ACTIVITY = [
  { Icon: GlobeIcon,  text: 'You published "Acme Marketing Site"', t: '2 hours ago' },
  { Icon: WifiIcon,   text: '"Product Launch" livestream ended',   t: '5 hours ago' },
  { Icon: PersonIcon, text: 'New lead from Contact Form',          t: '8 hours ago' },
  { Icon: UploadIcon, text: 'You uploaded 6 new files',           t: 'Yesterday' },
  { Icon: UsersIcon,  text: 'John Doe was added to workspace',    t: '2 days ago' },
]

export const GUIDE_CARDS = [
  { Icon: GlobeIcon,  title: 'Create Your First Website',  desc: 'Build and publish a website in minutes.' },
  { Icon: WifiIcon,   title: 'Go Live with Your Event',    desc: 'Set up and host an engaging live stream.' },
  { Icon: UsersIcon,  title: 'Start an Online Meeting',    desc: 'Create a meeting room and invite participants.' },
  { Icon: FileIcon,   title: 'Manage Leads & Forms',       desc: 'Create leads and manage submissions easily.' },
]
