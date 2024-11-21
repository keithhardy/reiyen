'use client';

import { Client, Permission } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { addPermissions } from '@/app/dashboard/users/[id]/(update)/permissions/action';
import { DataList } from '@/app/dashboard/users/[id]/(update)/permissions/components/data-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multiselect';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { availablePermissions } from '@/lib/permissions';

export function UserPermissionsForm({ permissions, clients, user }: { permissions: Permission[]; clients: Client[]; user: { user_id: string } }) {
  const { toast } = useToast();

  const form = useForm<{ permissions: Permission[] }>({
    defaultValues: { permissions },
  });

  const [newPermissions, setNewPermissions] = useState<Omit<Permission, 'id'>[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const clientOptions = [{ value: 'global', label: 'Global' }, ...clients.map((client) => ({ value: client.id, label: client.name }))];

  const availablePermissionsForClient = selectedClient ? (selectedClient === 'global' ? availablePermissions.global : availablePermissions.client).filter((perm) => !permissions.some((p) => p.permission === perm && (p.clientId || 'global') === selectedClient)) : [];

  const handlePermissionToggle = (selected: string[]) => {
    const clientId = selectedClient === 'global' ? null : selectedClient;

    const permissionsToAdd = selected
      .filter((perm) => !newPermissions.some((p) => p.permission === perm && p.clientId === clientId))
      .map((permission) => ({
        permission,
        userId: user.user_id,
        clientId,
      }));

    setNewPermissions((prev) => {
      const permissionsToRemove = prev.filter((p) => p.clientId === clientId && !selected.includes(p.permission));
      return [...prev.filter((p) => !permissionsToRemove.includes(p)), ...permissionsToAdd];
    });

    setSelectedPermissions(selected);
  };

  const onSubmit = async () => {
    if (newPermissions.length) {
      try {
        await addPermissions(newPermissions);
        setNewPermissions([]);
        setSelectedPermissions([]);
        setSelectedClient('');
        toast({
          title: 'Permissions Added',
          description: 'The permissions have been successfully added.',
        });
      } catch (error) {
        console.error('Error during adding permissions:', error);

        toast({
          title: 'Adding Failed',
          description: 'An error occurred while adding the permissions. Please try again later.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='border-none shadow-none'>
          <CardHeader>
            <CardTitle>Add Permissions</CardTitle>
            <CardDescription>Assign specific permissions to the user for global or client-specific access.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              <DataList permissions={newPermissions} clients={clients} />
              <div className='space-y-4'>
                <p className='text-sm font-medium leading-none'>Client</p>
                <Select
                  onValueChange={(value) => {
                    setSelectedClient(value);
                    setSelectedPermissions([]);
                  }}
                  value={selectedClient}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select client' />
                  </SelectTrigger>
                  <SelectContent>
                    {clientOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-4'>
                <p className='text-sm font-medium leading-none'>Permissions</p>
                <MultiSelect
                  options={availablePermissionsForClient.map((perm) => ({
                    value: perm,
                    label: perm,
                  }))}
                  selectedValues={selectedPermissions}
                  onChange={handlePermissionToggle}
                  placeholder={selectedClient ? (availablePermissionsForClient.length ? 'Select permissions' : 'No permissions available') : 'Select client'}
                  disabled={!selectedClient || !availablePermissionsForClient.length}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button size='sm' variant='default' type='submit' disabled={!newPermissions.length || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Adding' : 'Add'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}