import {
  UsersIcon,
  UserCheckIcon,
  MailIcon,
  ShieldIcon,
  UserPlusIcon,
  UploadIcon,
} from '../components/icons'

export const MEMBER_TABS = ['All Members', 'Active', 'Pending Invites', 'Admins', 'Guests / Viewers']

export const MEMBER_STATS = [
  { Icon: UsersIcon,     val: '24', label: 'Total Members',  delta: '↑ 12% this month'  },
  { Icon: UserCheckIcon, val: '20', label: 'Active Members', delta: '↑ 8% this month'   },
  { Icon: MailIcon,      val: '4',  label: 'Pending Invites',delta: '↑ 2 vs last week'  },
  { Icon: ShieldIcon,    val: '5',  label: 'Admins / Owners',delta: '↑ 1 vs last month' },
]

export const MEMBER_ROLE_CLASS = {
  'Owner':    'role-owner',
  'Admin':    'role-admin',
  'Editor':   'role-editor',
  'Host':     'role-host',
  'Marketer': 'role-marketer',
  'Billing':  'role-billing',
  'Viewer':   'role-viewer',
}

export const MEMBER_STATUS_CLASS = {
  'Active':    'active',
  'Pending':   'pending',
  'Suspended': 'suspended',
}

export const MEMBERS_LIST = [
  { id: 0, name: 'Alex Yu',         isYou: true,  email: 'alex.yu@example.com',      role: 'Owner',    status: 'Active',    lastDate: 'May 22, 2025', lastTime: '9:15 AM',  joined: 'Nov 10, 2023',         access: 'Full Access'    },
  { id: 1, name: 'Sarah Kim',       isYou: false, email: 'sarah.kim@example.com',     role: 'Admin',    status: 'Active',    lastDate: 'May 22, 2025', lastTime: '8:42 AM',  joined: 'Oct 5, 2023',          access: 'Full Access'    },
  { id: 2, name: 'Brian Chen',      isYou: false, email: 'brian.chen@example.com',    role: 'Editor',   status: 'Active',    lastDate: 'May 22, 2025', lastTime: '7:20 AM',  joined: 'Jan 12, 2024',         access: 'Edit & Publish' },
  { id: 3, name: 'Emily Davis',     isYou: false, email: 'emily.davis@example.com',   role: 'Host',     status: 'Active',    lastDate: 'May 21, 2025', lastTime: '6:05 PM',  joined: 'Feb 3, 2024',          access: 'Host Events'    },
  { id: 4, name: 'Michael Johnson', isYou: false, email: 'michael.j@example.com',     role: 'Marketer', status: 'Active',    lastDate: 'May 21, 2025', lastTime: '11:18 AM', joined: 'Mar 18, 2024',         access: 'Marketing'      },
  { id: 5, name: 'Jessica Lee',     isYou: false, email: 'jessica.lee@example.com',   role: 'Billing',  status: 'Active',    lastDate: 'May 20, 2025', lastTime: '3:27 PM',  joined: 'Apr 2, 2024',          access: 'Billing'        },
  { id: 6, name: 'David Lopez',     isYou: false, email: 'david.lopez@example.com',   role: 'Viewer',   status: 'Active',    lastDate: 'May 20, 2025', lastTime: '9:10 AM',  joined: 'Apr 15, 2024',         access: 'View Only'      },
  { id: 7, name: 'Olivia Brown',    isYou: false, email: 'olivia.brown@example.com',  role: 'Editor',   status: 'Pending',   lastDate: null,           lastTime: null,       joined: 'Invited May 21, 2025', access: 'Invite pending' },
  { id: 8, name: 'Ryan Patel',      isYou: false, email: 'ryan.patel@example.com',    role: 'Host',     status: 'Suspended', lastDate: null,           lastTime: null,       joined: 'Mar 1, 2024',          access: 'Suspended'      },
]

export const RECENT_INVITES = [
  { name: 'Olivia Brown',    date: 'Invited May 21, 2025' },
  { name: 'Daniel Taylor',   date: 'Invited May 19, 2025' },
  { name: 'Sophia Martinez', date: 'Invited May 18, 2025' },
  { name: 'James Wilson',    date: 'Invited May 17, 2025' },
]

export const ROLE_SUMMARY = [
  { label: 'Owner',          count: 1,  pct: 4  },
  { label: 'Admin',          count: 2,  pct: 8  },
  { label: 'Editor',         count: 3,  pct: 13 },
  { label: 'Host',           count: 2,  pct: 8  },
  { label: 'Marketer',       count: 1,  pct: 4  },
  { label: 'Billing',        count: 1,  pct: 4  },
  { label: 'Viewer',         count: 10, pct: 42 },
  { label: 'Pending Invites',count: 4,  pct: 17 },
]

export const MEMBER_QUICK_ACTIONS = [
  { Icon: UserPlusIcon, label: 'Invite Member'      },
  { Icon: ShieldIcon,   label: 'Create Role'        },
  { Icon: ShieldIcon,   label: 'Manage Permissions' },
  { Icon: UploadIcon,   label: 'Import Members'     },
]
