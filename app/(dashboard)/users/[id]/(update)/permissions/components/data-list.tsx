'use client';

import { Client, Permission } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DataList({
  permissions,
  clients,
}: {
  permissions: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[];
  clients: Client[];
}) {
  const clientOptions = [
    { value: 'global', label: 'Global' },
    ...clients.map((client) => ({ value: client.id, label: client.name })),
  ];

  const groupedPermissions = clientOptions.map(({ value, label }) => {
    const clientPermissions = permissions.filter((perm) => (perm.clientId || 'global') === value);
    return {
      client: label,
      permissions: clientPermissions.map((p) => p.permission),
    };
  });

  return (
    <ScrollArea className='h-[310px]'>
      <div className='space-y-6 pr-4'>
        {groupedPermissions.every(({ permissions }) => permissions.length === 0) ? (
          <p className='py-4 text-center text-sm text-muted-foreground'>
            No permissions added yet.
          </p>
        ) : (
          groupedPermissions.map(({ client, permissions }) => {
            if (permissions.length === 0) return null;

            return (
              <div key={client} className='space-y-4'>
                <h4 className='text-sm font-semibold capitalize'>{client}</h4>
                <div className='flex flex-wrap gap-2'>
                  {permissions.map((permission) => (
                    <Badge
                      key={`${client}-${permission}`}
                      variant='secondary'
                      className='rounded-md px-2 py-1 font-medium'
                    >
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
}
