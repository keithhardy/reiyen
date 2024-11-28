import { Client } from '@prisma/client';
import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select as UISelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { clientPermissions, globalPermissions } from '@/lib/permissions';

interface PermissionFormData {
  userId: string;
  permission: string;
  clientId: string | null;
  id?: string;
}

interface PermissionsFieldProps {
  field: {
    value: PermissionFormData[];
    onChange: (value: PermissionFormData[]) => void;
  };
  permissions: PermissionFormData[];
  clients: Client[];
  userId: string;
}

export function PermissionsField({ field, permissions, clients, userId }: PermissionsFieldProps) {
  const [clientId, setClientId] = useState<string>('global');

  const availablePermissions = clientId === 'global' || !clientId ? globalPermissions.filter((permission) => !permissions.some((p) => p.permission === permission && p.clientId === null)) : clientPermissions.filter((permission) => !permissions.some((p) => p.permission === permission && p.clientId === clientId));

  return (
    <>
      <FormItem>
        <FormLabel>Client</FormLabel>
        <FormControl>
          <UISelect
            value={clientId}
            onValueChange={(value) => {
              setClientId(value);
              field.onChange([]);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select client' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key='global' value='global'>
                Global
              </SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </UISelect>
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Permissions</FormLabel>
        <FormControl>
          <div className='space-y-2'>
            {availablePermissions.map((permission) => {
              const isChecked = field.value.some((p) => p.permission === permission && p.clientId === (clientId === 'global' ? null : clientId));

              return (
                <div key={`${clientId}-${permission}`} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`${clientId}-${permission}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([
                          ...field.value,
                          {
                            userId: userId,
                            permission: permission,
                            clientId: clientId === 'global' ? null : clientId,
                          },
                        ]);
                      } else {
                        field.onChange(field.value.filter((p) => !(p.permission === permission && p.clientId === (clientId === 'global' ? null : clientId))));
                      }
                    }}
                  />
                  <label htmlFor={`${clientId}-${permission}`}>{permission}</label>
                </div>
              );
            })}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
}
