'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Address, Client, Property } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { createProperty } from '@/app/(dashboard)/properties/create/action';
import { Schema } from '@/app/(dashboard)/properties/create/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function PropertyCreateForm({ clients }: { clients: Client[] }) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      uprn: '',
      occupier: '',
      address: {
        streetAddress: '',
        city: '',
        county: '',
        postTown: '',
        postcode: '',
        country: '',
      },
      client: {
        id: '',
      },
    },
  });

  const onSubmit = async (
    data: Omit<Property, 'id' | 'clientId' | 'createdAt' | 'updatedAt'> & {
      address: Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'settingsId' | 'clientId' | 'propertyId'>;
      client: Pick<Client, 'id'>;
    }
  ) => {
    try {
      await createProperty(data);
      router.push('/properties');
      toast({
        title: 'Client Created',
        description: 'Property was successfully created.',
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
            name='client.id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a client' />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='uprn'
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPRN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='occupier'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupier</FormLabel>
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
