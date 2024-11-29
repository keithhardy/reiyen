'use client';

import { deletePermission } from '@/app/(dashboard)/users/[id]/(update)/permissions/action';
import { useToast } from '@/hooks/use-toast';
import { Client, Permission } from '@prisma/client';
import { XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DataList({
  permissions,
  clients,
}: {
  permissions: Permission[];
  clients: Client[];
}) {
  const { toast } = useToast();

  const clientOptions = [
    { value: 'global', label: 'Global' },
    ...clients.map((client) => ({
      value: client.id,
      label: client.name,
    })),
  ];

  const groupedPermissions = clientOptions.map(({ value, label }) => {
    const clientPermissions = permissions.filter(
      (perm) => (perm.clientId || 'global') === value
    );
    return {
      client: label,
      permissions: clientPermissions,
    };
  });

  const handleDelete = async (id: string) => {
    try {
      await deletePermission(id);
      toast({
        title: 'Permission Deleted',
        description: 'The permission has been successfully deleted.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete the permission. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <ScrollArea className="h-[310px]">
      <div className="space-y-6 pr-4">
        {groupedPermissions.every(
          ({ permissions }) => permissions.length === 0
        ) ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No permissions added yet.
          </p>
        ) : (
          groupedPermissions.map(({ client, permissions }) => {
            if (permissions.length === 0) return null;

            return (
              <div key={client} className="space-y-4">
                <h4 className="text-sm font-semibold capitalize">{client}</h4>
                <div className="flex flex-wrap gap-2">
                  {permissions.map(({ id, permission }) => (
                    <div key={id} className="flex space-x-1">
                      <Badge
                        variant="outline"
                        className="rounded-md px-2 py-1 font-medium"
                      >
                        {permission}
                      </Badge>
                      <Badge
                        variant="destructive"
                        className="h-[26px] cursor-pointer rounded-md px-1.5"
                        onClick={() => handleDelete(id)}
                      >
                        <XIcon className="h-3 w-3" />
                      </Badge>
                    </div>
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
