export const menuLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description:
      'View an overview of system activities and key metrics in electrical certification.',
  },
  {
    label: 'Users',
    href: '/users',
    description:
      'Manage user accounts and permissions within the electrical certification system.',
  },
  {
    label: 'Clients',
    href: '/clients',
    description:
      'Handle client information and scheduling for electrical services.',
  },
  {
    label: 'Properties',
    href: '/properties',
    description:
      'Maintain records of properties requiring electrical certifications.',
  },
  // {
  //   label: 'Certificates',
  //   href: '/certificates',
  //   description:
  //     'Create, edit, and manage all types of electrical certificates.',
  // },
  {
    label: 'Settings',
    href: '/settings',
    description:
      'Configure system-wide settings for electrical certificate management.',
  },
];

export const userLinks = (userId: string) => [
  {
    label: 'General',
    href: `/users/${userId}/general`,
  },
  {
    label: 'Preferences',
    href: `/users/${userId}/preferences`,
  },
  {
    label: 'Equipment',
    href: `/users/${userId}/equipment`,
  },
  {
    label: 'Qualifications',
    href: `/users/${userId}/qualifications`,
  },
  {
    label: 'Permissions',
    href: `/users/${userId}/permissions`,
  },
];
