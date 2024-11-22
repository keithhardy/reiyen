'use client';

import { Address, Settings } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

import { updateSettings } from './action';

export function SettingsUpdateForm({
  settings,
}: {
  settings: Settings & { address: Address };
}) {
  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(settings?.logoUrl || '');

  const form = useForm({
    defaultValues: {
      id: settings?.id,
      name: settings?.name || '',
      email: settings?.email || '',
      phone: settings?.phone || '',
      logoUrl: settings?.logoUrl || '',
      governingBody: settings?.governingBody || '',
      governingBodyNumber: settings?.governingBodyNumber || '',
      addressId: settings?.addressId,
      address: settings?.address || {
        id: settings?.address.id || '',
        streetAddress: settings?.address.streetAddress || '',
        city: settings?.address.city || '',
        county: settings?.address.county || '',
        postTown: settings?.address.postTown || '',
        postcode: settings?.address.postcode || '',
        country: settings?.address.country || '',
      },
    },
  });

  const onSubmit = async (data: Settings & { address: Address }) => {
    console.log(data);

    try {
      await updateSettings(data);
      toast({
        title: 'Settings Updated',
        description: `Settings was successfully updated.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update the settings. Please try again.',
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
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='logoUrl'
            render={() => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        form.setValue,
                        'logoUrl',
                        setImagePreview
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
                {imagePreview && (
                  <div className='mt-2'>
                    <Image
                      src={imagePreview}
                      alt='Logo Preview'
                      width={200}
                      height={200}
                      className='rounded border'
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='governingBody'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Governing Body</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='governingBodyNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Governing Body Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.streetAddress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.county'
            render={({ field }) => (
              <FormItem>
                <FormLabel>County</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.postTown'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Town</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.postcode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address.country'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
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
