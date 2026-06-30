// project import — mock data for the default dashboard (Model)
// In a real app this would come from an API via HttpClient.

import { AnalyticCard, RecentOrder, TransactionHistory } from './default-type';

export const ANALYTICS: AnalyticCard[] = [
  {
    title: 'Total Page Views',
    amount: '4,42,236',
    background: 'bg-light-primary ',
    border: 'border-primary',
    icon: 'rise',
    percentage: '59.3%',
    color: 'text-primary',
    number: '35,000'
  },
  {
    title: 'Total Users',
    amount: '78,250',
    background: 'bg-light-primary ',
    border: 'border-primary',
    icon: 'rise',
    percentage: '70.5%',
    color: 'text-primary',
    number: '8,900'
  },
  {
    title: 'Total Order',
    amount: '18,800',
    background: 'bg-light-warning ',
    border: 'border-warning',
    icon: 'fall',
    percentage: '27.4%',
    color: 'text-warning',
    number: '1,943'
  },
  {
    title: 'Total Sales',
    amount: '$35,078',
    background: 'bg-light-warning ',
    border: 'border-warning',
    icon: 'fall',
    percentage: '27.4%',
    color: 'text-warning',
    number: '$20,395'
  }
];

export const RECENT_ORDERS: RecentOrder[] = [
  { id: '84564564', name: 'Camera Lens', status: 'Rejected', status_type: 'text-danger', quantity: 40, amount: '$40,570' },
  { id: '84564786', name: 'Apple Watch', status: 'Pending', status_type: 'text-warning', quantity: 300, amount: '$180,139' },
  { id: '84564522', name: 'Wireless Mouse', status: 'Approved', status_type: 'text-success', quantity: 70, amount: '$90,989' },
  { id: '84564567', name: 'Mechanical Keyboard', status: 'Approved', status_type: 'text-success', quantity: 120, amount: '$140,652' },
  { id: '84564536', name: 'USB-C Hub', status: 'Rejected', status_type: 'text-danger', quantity: 90, amount: '$60,786' }
];

export const TRANSACTIONS: TransactionHistory[] = [
  {
    background: 'text-success bg-light-success',
    icon: 'gift',
    title: 'Order #002434',
    time: 'Today, 2:00 AM',
    amount: '+ $1,430',
    percentage: '78%'
  },
  {
    background: 'text-primary bg-light-primary',
    icon: 'message',
    title: 'Order #984947',
    time: '5 August, 1:45 PM',
    amount: '- $302',
    percentage: '8%'
  },
  {
    background: 'text-danger bg-light-danger',
    icon: 'setting',
    title: 'Order #988784',
    time: '7 hours ago',
    amount: '- $682',
    percentage: '16%'
  }
];
