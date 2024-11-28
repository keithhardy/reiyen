'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Address, Client } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateClient } from '@/app/(dashboard)/clients/[id]/update/action';
import { Schema } from '@/app/(dashboard)/clients/[id]/update/schema';
import { handleFileChange } from '@/components/form/handle-file-change';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function ClientUpdateForm({ client }: { client: Client & { address: Address | null } }) {
  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(client.logoUrl || '');

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      id: client.id,
      logoUrl: client.logoUrl,
      address: {
        city: client.address?.city || '',
        county: client.address?.county || '',
        postTown: client.address?.postTown || '',
        postcode: client.address?.postcode || '',
        streetAddress: client.address?.streetAddress || '',
        id: client.address?.id,
        country: client.address?.country || '',
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      const client = await updateClient(data);
      toast({
        title: 'Client Updated',
        description: `Client ${client.name} was successfully updated.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update the Client. Please try again.',
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
                  <Input type='email' {...field} />
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
                  <Input type='tel' {...field} />
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
          <div className='flex justify-end'>
            <Button type='submit' disabled={form.formState.isSubmitting} variant='outline'>
              {form.formState.isSubmitting ? 'Saving' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
