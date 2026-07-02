// Menu data for the left (retractable) sidebar.
// Empty on purpose: this is the initial blank shell. Add your groups/items below.
//
// Structure (group -> collapse -> item):
//
// export const NavigationItems: NavigationItem[] = [
//   {
//     id: 'main',
//     title: 'Main',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'home',
//         title: 'Home',
//         type: 'item',
//         url: '/home',
//         icon: 'dashboard',
//         breadcrumbs: false
//       }
//       // {
//       //   id: 'reports',
//       //   title: 'Reports',
//       //   type: 'collapse',
//       //   icon: 'file-text',
//       //   children: [
//       //     { id: 'monthly', title: 'Monthly', type: 'item', url: '/reports/monthly' }
//       //   ]
//       // }
//     ]
//   }
// ];

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
  role?: string[];
  disabled?: boolean;
  isMainParent?: boolean; // specify if item is main parent
}

// Empty menu — no items or sub-items yet.
export const NavigationItems: NavigationItem[] = [];
