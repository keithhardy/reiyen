export const menuLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description:
      'View an overview of system activities and key metrics in electrical certification.',
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    description:
      'Manage user accounts and permissions within the electrical certification system.',
  },
  {
    label: 'Clients',
    href: '/dashboard/clients',
    description:
      'Handle client information and scheduling for electrical services.',
  },
  // {
  //   label: 'Properties',
  //   href: '/dashboard/properties',
  //   description: 'Maintain records of properties requiring electrical certifications.',
  // },
  // {
  //   label: 'Certificates',
  //   href: '/dashboard/certificates',
  //   description: 'Create, edit, and manage all types of electrical certificates.',
  // },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    description:
      'Configure system-wide settings for electrical certificate management.',
  },
];

export const userLinks = (userId: string) => [
  {
    label: 'General',
    href: `/dashboard/users/${userId}/general`,
  },
  {
    label: 'Preferences',
    href: `/dashboard/users/${userId}/preferences`,
  },
  {
    label: 'Equipment',
    href: `/dashboard/users/${userId}/equipment`,
  },
  {
    label: 'Qualifications',
    href: `/dashboard/users/${userId}/qualifications`,
  },
  {
    label: 'Permissions',
    href: `/dashboard/users/${userId}/permissions`,
  },
];
