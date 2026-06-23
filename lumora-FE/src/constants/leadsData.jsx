import {
  UsersIcon,
  UserPlusIcon,
  FilterIcon,
  TrendingUpIcon,
  PlusIcon,
  LinkIcon,
  ZapIcon,
  DownloadIcon,
} from '../components/icons'

export const LEAD_TABS = ['All Leads', 'New', 'Qualified', 'Contacted', 'Converted', 'Archived']

export const LEAD_STATS = [
  { Icon: UsersIcon,      val: '1,248', label: 'Total Leads',     delta: '↑ 12% this month'    },
  { Icon: UserPlusIcon,   val: '86',    label: 'New This Week',   delta: '↑ 8% vs last week'   },
  { Icon: FilterIcon,     val: '312',   label: 'Qualified Leads', delta: '↑ 10% this month'    },
  { Icon: TrendingUpIcon, val: '24.8%', label: 'Conversion Rate', delta: '↑ 3.2% vs last month' },
]

export const LEAD_STATUS_CLASS = {
  'New':       'new',
  'Qualified': 'qfd',
  'Contacted': 'ctd',
  'Converted': 'cvt',
  'Archived':  'arc',
}

export const LEADS_LIST = [
  { id: 0, name: 'Jane Smith',      email: 'jane.smith@example.com',    source: 'Website',          form: 'Contact Us Form',     status: 'New',       owner: 'Alex Yu',    submittedDate: 'May 22, 2025', submittedTime: '3:55 PM',  tags: ['Marketing', 'Sales'] },
  { id: 1, name: 'Michael Johnson', email: 'michael.j@example.com',     source: 'Event',            form: 'Webinar Registration', status: 'Qualified', owner: 'Sarah Kim',  submittedDate: 'May 22, 2025', submittedTime: '11:42 AM', tags: ['Product', 'Sales'] },
  { id: 2, name: 'Emily Davis',     email: 'emily.davis@example.com',   source: 'Landing Page',     form: 'Download Guide',      status: 'New',       owner: 'Alex Yu',    submittedDate: 'May 22, 2025', submittedTime: '10:03 AM', tags: ['Marketing', 'Newsletter'] },
  { id: 3, name: 'David Lee',       email: 'david.lee@example.com',     source: 'Partner Referral', form: 'Partner Inquiry',     status: 'Qualified', owner: 'Brian Chen', submittedDate: 'May 21, 2025', submittedTime: '4:28 PM',  tags: ['Partner'] },
  { id: 4, name: 'Sophia Martinez', email: 'sophia.m@example.com',      source: 'Email Campaign',   form: 'Product Demo',        status: 'Contacted', owner: 'Sarah Kim',  submittedDate: 'May 21, 2025', submittedTime: '1:17 PM',  tags: ['Sales', 'Existing'] },
  { id: 5, name: 'James Wilson',    email: 'james.wilson@example.com',  source: 'Social Media',     form: 'Contact Us Form',     status: 'New',       owner: 'Alex Yu',    submittedDate: 'May 20, 2025', submittedTime: '3:55 PM',  tags: ['Marketing', 'Paid Ad'] },
  { id: 6, name: 'Olivia Brown',    email: 'olivia.brown@example.com',  source: 'Website',          form: 'Newsletter Signup',   status: 'Converted', owner: 'Brian Chen', submittedDate: 'May 20, 2025', submittedTime: '10:26 AM', tags: ['Newsletter', 'Existing'] },
  { id: 7, name: 'Daniel Taylor',   email: 'daniel.taylor@example.com', source: 'Landing Page',     form: 'Free Trial Signup',   status: 'Contacted', owner: 'Sarah Kim',  submittedDate: 'May 19, 2025', submittedTime: '9:08 AM',  tags: ['Product', 'Paid Ad'] },
]

export const RECENT_SUBMISSIONS = [
  { name: 'James Wilson',    time: '3:55 PM',  form: 'Contact Us Form',     source: 'Social Media'     },
  { name: 'Michael Johnson', time: '11:42 AM', form: 'Webinar Registration', source: 'Event'            },
  { name: 'Jane Smith',      time: '2:15 PM',  form: 'Contact Us Form',     source: 'Website'          },
  { name: 'Emily Davis',     time: '10:03 AM', form: 'Download Guide',      source: 'Landing Page'     },
  { name: 'David Lee',       time: '4:28 PM',  form: 'Partner Inquiry',     source: 'Partner Referral' },
]

export const LEAD_SOURCES = [
  { label: 'Website',        count: 562, pct: 45 },
  { label: 'Event',          count: 268, pct: 21 },
  { label: 'Landing Page',   count: 214, pct: 17 },
  { label: 'Email Campaign', count: 142, pct: 11 },
  { label: 'Social Media',   count: 62,  pct: 5  },
]

export const LEAD_QUICK_ACTIONS = [
  { Icon: PlusIcon,     label: 'Create Form'    },
  { Icon: LinkIcon,     label: 'Connect CRM'    },
  { Icon: ZapIcon,      label: 'Set Automation' },
  { Icon: DownloadIcon, label: 'Download CSV'   },
]
