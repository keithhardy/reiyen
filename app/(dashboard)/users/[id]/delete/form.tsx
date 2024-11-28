'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { deleteUser } from '@/app/(dashboard)/users/[id]/delete/action';
import { Schema } from '@/app/(dashboard)/users/[id]/delete/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function UserDeleteForm({ user }: { user: User }) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<User>({
    resolver: zodResolver(Schema),
    defaultValues: {
      ...user,
      name: '',
    },
  });

  const onSubmit = async (data: User) => {
    try {
      await deleteUser(data);
      router.back();
      toast({
        title: 'User Deleted',
        description: `${data.name} was successfully removed.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete the user. Please try again.',
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
                <FormLabel className='text-muted-foreground'>
                  Enter <span className='text-foreground'>{user.name}</span> and press delete to remove.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button type='submit' disabled={form.watch('name') !== user.name || form.formState.isSubmitting} variant='destructive'>
              {form.formState.isSubmitting ? 'Deleting' : 'Delete'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
