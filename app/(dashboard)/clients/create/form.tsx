'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createClient } from '@/app/(dashboard)/clients/create/action';
import { Schema } from '@/app/(dashboard)/clients/create/schema';
import { handleFileChange } from '@/components/form/handle-file-change';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function ClientCreateForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState('');

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      logoUrl: '',
      address: {
        streetAddress: '',
        city: '',
        county: '',
        postTown: '',
        postcode: '',
        country: '',
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      const client = await createClient(data);
      router.push('/clients');
      toast({
        title: 'Client Created',
        description: `Client ${client.name} was successfully created.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create the Client. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4 pb-4'>
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
                  <Input type='email' {...field} autoComplete='email' />
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
                  <Input type='tel' {...field} autoComplete='tel' />
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
                  <Input type='file' accept='image/*' onChange={(e) => handleFileChange(e, form.setValue, 'logoUrl', setImagePreview)} />
                </FormControl>
                <FormMessage />
                {imagePreview && (
                  <div className='mt-2'>
                    <Image src={imagePreview} alt='Logo Preview' width={200} height={200} className='rounded border' />
                  </div>
                )}
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
                  <Input {...field} autoComplete='address-line1' />
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
                  <Input {...field} autoComplete='address-level2' />
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
                  <Input {...field} autoComplete='address-level1' />
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
                  <Input {...field} autoComplete='address-level2' />
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
                  <Input {...field} autoComplete='postal-code' />
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
                  <Input {...field} autoComplete='country-name' />
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
