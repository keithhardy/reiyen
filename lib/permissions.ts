const userPermissions = [
  'create:user',
  'read:user',
  'update:user',
  'delete:user',
];

const clientPermissions = [
  'create:client',
  'read:client',
  'update:client',
  'delete:client',
];

const propertyPermissions = [
  'create:property',
  'read:property',
  'update:property',
  'delete:property',
];

const certificatePermissions = [
  'create:certificate',
  'read:certificate',
  'update:certificate',
  'delete:certificate',
];

const globalOnlyPermissions = ['read:settings', 'update:settings'];

const sharedPermissions = [
  ...userPermissions,
  ...clientPermissions,
  ...propertyPermissions,
  ...certificatePermissions,
];

export const availablePermissions = {
  global: [...globalOnlyPermissions, ...sharedPermissions],
  client: [...sharedPermissions],
};

export type Permission =
  | (typeof sharedPermissions)[number]
  | (typeof globalOnlyPermissions)[number];
