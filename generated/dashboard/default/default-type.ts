// project import — domain types for the default dashboard (Model)

export interface AnalyticCard {
  title: string;
  amount: string;
  background: string;
  border: string;
  icon: string;
  percentage: string;
  color: string;
  number: string;
}

export interface RecentOrder {
  id: string;
  name: string;
  status: string;
  status_type: string; // bootstrap text color class, e.g. 'text-success'
  quantity: number;
  amount: string;
}

export interface TransactionHistory {
  background: string;
  icon: string;
  title: string;
  time: string;
  amount: string;
  percentage: string;
}
