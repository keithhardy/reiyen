'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Client, Permission } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addPermissions } from '@/app/(dashboard)/users/[id]/(update)/permissions/action';
import { Schema } from '@/app/(dashboard)/users/[id]/(update)/permissions/schema';
import { PermissionsField } from '@/components/form/permissions-field';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

export function UserPermissionsForm({ permissions, clients, userId }: { permissions: Permission[]; clients: Client[]; userId: string }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      permissions: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await addPermissions(data);
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <FormField control={form.control} name='permissions' render={({ field }) => <PermissionsField field={field} permissions={permissions} clients={clients} userId={userId} />} />

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
