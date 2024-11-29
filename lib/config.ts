export const menuLinks = [
  {
    label: 'Dashboard',
    href: '/',
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
  {
    label: 'Certificates',
    href: '/certificates',
    description:
      'Create, edit, and manage all types of electrical certificates.',
  },
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

export const certificateTypeNameMapping = {
  MINOR_WORKS: 'Minor Works Certificate',
  ELECTRICAL_INSTALLATION_CERTIFICATE: 'Electrical Installation Certificate',
  ELECTRICAL_INSTALLATION_CONDITION_REPORT:
    'Electrical Installation Condition Report',
  FIRE_SAFETY_DESIGN_SUMMARY: 'Fire Safety Design Summary',
  DOMESTIC_VENTILATION_COMMISSIONING_SHEET:
    'Domestic Ventilation Commissioning Sheet',
};

export const certificateTypeUrlMapping = {
  MINOR_WORKS: 'minor-works',
  ELECTRICAL_INSTALLATION_CERTIFICATE: 'electrical-installation-certificate',
  ELECTRICAL_INSTALLATION_CONDITION_REPORT:
    'electrical-installation-condition-report',
  FIRE_SAFETY_DESIGN_SUMMARY: 'fire-safety-design-summary',
  DOMESTIC_VENTILATION_COMMISSIONING_SHEET:
    'domestic-ventilation-commissioning-sheet',
};

export const statusNameMapping = {
  IN_PROGRESS: 'In Progress',
  READY_FOR_SUPERVISOR: 'Ready for Supervisor',
  COMPLETE: 'Complete',
};

export const globalPermissions = [
  'create:user',
  'read:user',
  'update:user',
  'delete:user',
  'create:client',
  'read:client',
  'update:client',
  'delete:client',
  'create:property',
  'read:property',
  'update:property',
  'delete:property',
  'create:certificate',
  'read:certificate',
  'update:certificate',
  'delete:certificate',
  'read:settings',
  'update:settings',
];
export const clientPermissions = [
  'create:user',
  'read:user',
  'update:user',
  'delete:user',
  'create:client',
  'read:client',
  'update:client',
  'delete:client',
  'create:property',
  'read:property',
  'update:property',
  'delete:property',
  'create:certificate',
  'read:certificate',
  'update:certificate',
  'delete:certificate',
];
