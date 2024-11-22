'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { createUser } from '@/app/dashboard/users/create/action';
import { Schema } from '@/app/dashboard/users/create/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/lib/auth0-management';

export function CreateUserForm() {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<User>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: User) => {
    try {
      const user = await createUser(data);
      router.back();
      toast({
        title: 'User Created',
        description: `${user.name} was created successfully`,
        action: (
          <Link href={`/users/${user.user_id}/general`}>
            <ToastAction altText='Undo user creation'>Update</ToastAction>
          </Link>
        ),
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create the user. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete='new-name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} autoComplete='new-email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} autoComplete='new-password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button type='submit' disabled={form.formState.isSubmitting} variant='outline'>
              {form.formState.isSubmitting ? 'Creating' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
