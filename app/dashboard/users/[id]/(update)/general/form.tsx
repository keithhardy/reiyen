'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { updateUser } from '@/app/dashboard/users/[id]/(update)/general/action';
import { handleFileChange } from '@/components/form/handle-file-change';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/lib/auth0-management';

export function UserGeneralForm({ user }: { user: User }) {
  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(user.picture || '');

  const form = useForm<User>({
    defaultValues: user,
  });

  const onSubmit = async (data: User) => {
    try {
      await updateUser(data);
      toast({
        title: 'User Updated',
        description: `${data.name} was successfully updated.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update the user. Please try again.',
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
            name='picture'
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <div className='flex items-center space-x-4'>
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt='Profile Picture Preview'
                      width={50}
                      height={50}
                      className='rounded-full'
                    />
                  )}
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          form.setValue,
                          'picture',
                          setImagePreview
                        )
                      }
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            variant='outline'
          >
            {form.formState.isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
