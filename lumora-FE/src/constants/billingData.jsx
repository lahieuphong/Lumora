import {
  DatabaseIcon,
  MonitorIcon,
  GlobeIcon,
  WifiIcon,
  VideoIcon,
  ZapIcon,
  UsersIcon,
  PersonIcon,
  CreditCardIcon,
  FileIcon,
  TrendingUpIcon,
  DownloadIcon,
  BarChartIcon,
  HelpCircleIcon,
} from '../components/icons'

export const BILLING_TABS = ['Overview', 'Usage', 'Invoices', 'Payment Methods', 'Billing Details']

export const CURRENT_PLAN = {
  name:      'Pro',
  billing:   'Monthly billing',
  price:     '$79.00',
  period:    'USD / month',
  renewDate: 'May 20, 2025',
  features: [
    { label: '50 GB storage',           done: true  },
    { label: '100 hours live streaming', done: true  },
    { label: '50 hours meetings',        done: true  },
    { label: '5 custom domains',         done: true  },
    { label: 'AI features & credits',    done: true  },
    { label: 'Up to 10 team seats',      done: false },
    { label: 'Priority support',         done: true  },
  ],
}

export const USAGE_METRICS = [
  { label: 'Storage Used',    used: '12.4 GB', total: '50 GB',     pct: 24 },
  { label: 'Live Hours',      used: '32.5',    total: '100 hours', pct: 33 },
  { label: 'Meeting Hours',   used: '15',      total: '50 hours',  pct: 30 },
  { label: 'Leads Collected', used: '2,350',   total: '10,000',    pct: 24 },
  { label: 'Team Seats',      used: '6',       total: '10 seats',  pct: 60 },
]

export const USAGE_BREAKDOWN = [
  { Icon: DatabaseIcon, label: 'Storage',          used: '12.4 GB', total: '50 GB',    pct: 24 },
  { Icon: MonitorIcon,  label: 'Published Sites',  used: '8',       total: '25',       pct: 32 },
  { Icon: GlobeIcon,    label: 'Custom Domains',   used: '3',       total: '5',        pct: 60 },
  { Icon: WifiIcon,     label: 'Live Hours',       used: '32.5',    total: '100 hrs',  pct: 33 },
  { Icon: VideoIcon,    label: 'Meeting Hours',    used: '15',      total: '50 hrs',   pct: 30 },
  { Icon: ZapIcon,      label: 'AI Credits',       used: '1,250',   total: '5,000',    pct: 25 },
  { Icon: UsersIcon,    label: 'Team Seats',       used: '6',       total: '10',       pct: 60 },
  { Icon: PersonIcon,   label: 'Leads Collected',  used: '2,350',   total: '10,000',   pct: 24 },
]

export const INVOICE_STATUS_CLASS = {
  'Paid':    'paid',
  'Pending': 'pend',
  'Failed':  'fail',
}

export const INVOICES = [
  { id: 'INV-2025-0008', date: 'Apr 20, 2025', plan: 'Pro', amount: '$79.00', status: 'Paid'    },
  { id: 'INV-2025-0007', date: 'Mar 20, 2025', plan: 'Pro', amount: '$79.00', status: 'Paid'    },
  { id: 'INV-2025-0006', date: 'Feb 20, 2025', plan: 'Pro', amount: '$79.00', status: 'Paid'    },
  { id: 'INV-2025-0005', date: 'Jan 20, 2025', plan: 'Pro', amount: '$79.00', status: 'Paid'    },
  { id: 'INV-2024-0012', date: 'Dec 20, 2024', plan: 'Pro', amount: '$79.00', status: 'Pending' },
  { id: 'INV-2024-0011', date: 'Nov 20, 2024', plan: 'Pro', amount: '$79.00', status: 'Failed'  },
]

export const BILLING_ACTIVITY = [
  { Icon: CreditCardIcon, desc: 'Payment of $79.00 was successful',    time: 'Apr 20, 2025 at 9:12 AM' },
  { Icon: FileIcon,       desc: 'Invoice INV-2025-0008 was generated', time: 'Apr 20, 2025 at 9:10 AM' },
  { Icon: TrendingUpIcon, desc: 'Plan changed from Starter to Pro',    time: 'Jan 20, 2025 at 9:05 AM' },
]

export const PAYMENT_METHOD = {
  brand:   'VISA',
  last4:   '4242',
  expires: '04 / 2027',
}

export const BILLING_CONTACT = {
  name:  'Alex Yu',
  email: 'alex.yu@acme.com',
  phone: '(415) 555-0198',
}

export const COMPANY_DETAILS = {
  name:    'Acme Corporation',
  address: '500 Market Street, Suite 200',
  city:    'San Francisco, CA 94105',
  country: 'United States',
  taxId:   '12-3456789',
}

export const BILLING_QUICK_ACTIONS = [
  { Icon: BarChartIcon,   label: 'Plan Comparison'         },
  { Icon: TrendingUpIcon, label: 'Upgrade Plan'            },
  { Icon: DownloadIcon,   label: 'Download Latest Invoice' },
  { Icon: BarChartIcon,   label: 'Download Usage Report'   },
  { Icon: HelpCircleIcon, label: 'Contact Support'         },
]
