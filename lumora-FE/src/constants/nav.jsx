import {
  HomeIcon,
  MonitorIcon,
  WifiIcon,
  PersonIcon,
  PeopleIcon,
  CreditCardIcon,
} from '../components/icons'

export const NAV = [
  { id: 'home',    label: 'Home',          Icon: HomeIcon,       path: '/dashboard' },
  { id: 'sites',   label: 'Sites',         Icon: MonitorIcon,    path: '/sites' },
  { id: 'live',    label: 'Live & Events', Icon: WifiIcon,       path: '/live-events' },
  { id: 'leads',   label: 'Leads',         Icon: PersonIcon,     path: '/leads' },
  { id: 'members', label: 'Members',       Icon: PeopleIcon,     path: '/members' },
  { id: 'billing', label: 'Billing',       Icon: CreditCardIcon, path: '/billing' },
]
