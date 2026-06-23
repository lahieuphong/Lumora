import {
  WifiIcon,
  CalendarIcon,
  PlayIcon,
  UsersIcon,
  FilmIcon,
  BarChartIcon,
} from '../components/icons'

export const LIVE_TABS = ['All', 'Live Events', 'Meetings', 'Draft', 'Ended']

export const LIVE_STATS = [
  { Icon: WifiIcon,     val: '2',     label: 'Live Now',        sub: 'View live events'   },
  { Icon: CalendarIcon, val: '5',     label: 'Upcoming',        sub: 'Scheduled events'   },
  { Icon: PlayIcon,     val: '18',    label: 'Completed',       sub: 'Past events'        },
  { Icon: UsersIcon,    val: '1,248', label: 'Total Attendees', sub: 'Across all events'  },
]

export const EVENT_STATUS_CLASS = {
  'LIVE':      'live',
  'UPCOMING':  'upc',
  'COMPLETED': 'done',
  'ENDED':     'end',
}

export const EVENT_TYPE_ICON = {
  'Live Event': WifiIcon,
  'Meeting':    UsersIcon,
}

export const EVENTS_LIST = [
  { id: 0, name: 'Product Launch Livestream',  desc: 'Go live to introduce our new product', type: 'Live Event', status: 'LIVE',      startDate: 'May 20, 2025', startTime: '10:00 AM', attendees: 356  },
  { id: 1, name: 'Weekly Team Meeting',         desc: 'Internal sync and updates',            type: 'Meeting',    status: 'LIVE',      startDate: 'May 20, 2025', startTime: '09:00 AM', attendees: 12   },
  { id: 2, name: 'Marketing Webinar',           desc: 'How to grow your brand in 2025',       type: 'Live Event', status: 'UPCOMING',  startDate: 'May 22, 2025', startTime: '02:00 PM', attendees: null },
  { id: 3, name: 'Customer Q&A Session',        desc: 'Live Q&A with our product team',       type: 'Live Event', status: 'UPCOMING',  startDate: 'May 24, 2025', startTime: '11:00 AM', attendees: 128  },
  { id: 4, name: 'Sales Kickoff Meeting',       desc: 'Q2 sales strategy and goals',          type: 'Meeting',    status: 'COMPLETED', startDate: 'May 18, 2025', startTime: '09:00 AM', attendees: 24   },
  { id: 5, name: 'Webinar: SEO Best Practices', desc: 'Tips and strategies for better SEO',   type: 'Live Event', status: 'COMPLETED', startDate: 'May 15, 2025', startTime: '03:00 PM', attendees: 312  },
  { id: 6, name: 'Product Demo & Walkthrough',  desc: 'Live demo of key features',            type: 'Live Event', status: 'ENDED',     startDate: 'May 10, 2025', startTime: '02:00 PM', attendees: 189  },
]

export const UPCOMING_EVENTS = [
  { date: { month: 'MAY', day: '22' }, name: 'Marketing Webinar',    time: 'May 22, 2025 • 02:00 PM', registered: 0   },
  { date: { month: 'MAY', day: '24' }, name: 'Customer Q&A Session', time: 'May 24, 2025 • 11:00 AM', registered: 128 },
  { date: { month: 'MAY', day: '28' }, name: 'Partner Training',     time: 'May 28, 2025 • 10:00 AM', registered: 32  },
]

export const LIVE_QUICK_ACTIONS = [
  { Icon: WifiIcon,     label: 'Create Live Event'       },
  { Icon: UsersIcon,    label: 'Create Meeting'          },
  { Icon: CalendarIcon, label: 'Schedule Webinar'        },
  { Icon: FilmIcon,     label: 'View Recording Library'  },
  { Icon: BarChartIcon, label: 'Event Reports'           },
]

export const LIVE_QUOTA = { total: 15, used: 6 }
