'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Client, Permission } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { addPermissions } from '@/app/(dashboard)/users/[id]/(update)/permissions/action';
import { DataList } from '@/app/(dashboard)/users/[id]/(update)/permissions/components/data-list';
import { Schema } from '@/app/(dashboard)/users/[id]/(update)/permissions/schema';
import { MultiSelect } from '@/components/form/multiselect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { availablePermissions } from '@/lib/permissions';

export function UserPermissionsForm({
  permissions,
  clients,
  user,
}: {
  permissions: Permission[];
  clients: Client[];
  user: { user_id: string };
}) {
  const { toast } = useToast();

  const form = useForm<{ permissions: Permission[] }>({
    resolver: zodResolver(Schema),
    defaultValues: { permissions },
  });

  const [newPermissions, setNewPermissions] = useState<
    Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[]
  >([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const clientOptions = [
    { value: 'global', label: 'Global' },
    ...clients.map((client) => ({ value: client.id, label: client.name })),
  ];

  const availablePermissionsForClient = selectedClient
    ? (selectedClient === 'global'
        ? availablePermissions.global
        : availablePermissions.client
      ).filter(
        (perm) =>
          !permissions.some(
            (p) => p.permission === perm && (p.clientId || 'global') === selectedClient
          )
      )
    : [];

  const handlePermissionToggle = (selected: string[]) => {
    const clientId = selectedClient === 'global' ? null : selectedClient;

    const permissionsToAdd = selected
      .filter(
        (perm) => !newPermissions.some((p) => p.permission === perm && p.clientId === clientId)
      )
      .map((permission) => ({
        permission,
        userId: user.user_id,
        clientId,
      }));

    setNewPermissions((prev) => {
      const permissionsToRemove = prev.filter(
        (p) => p.clientId === clientId && !selected.includes(p.permission)
      );
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
      } catch {
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
              placeholder={
                selectedClient
                  ? availablePermissionsForClient.length
                    ? 'Select permissions'
                    : 'No permissions available'
                  : 'Select client'
              }
              disabled={!selectedClient || !availablePermissionsForClient.length}
            />
          </div>
          <div className='flex justify-end'>
            <Button type='submit' disabled={form.formState.isSubmitting} variant='outline'>
              {form.formState.isSubmitting ? 'Adding' : 'Add'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
