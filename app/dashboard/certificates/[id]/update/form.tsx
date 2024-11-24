'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Address, Certificate, Client, Property } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { updateCertificate } from '@/app/dashboard/certificates/[id]/update/action';
import { Schema } from '@/app/dashboard/certificates/[id]/update/schema';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function CertificateUpdateForm({
  certificate,
  clients,
}: {
  certificate: Certificate & {
    property: Property & { client: Client; address: Address };
  };
  clients: (Client & { Property: (Property & { address: Address })[] })[];
}) {
  const { toast } = useToast();

  const [selectedClientId, setSelectedClientId] = useState<string | null>(
    certificate.property.client.id
  );
  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: certificate,
  });

  const onSubmit = async (
    data: Pick<Certificate, 'id' | 'name'> & { property: Pick<Property, 'id'> }
  ) => {
    try {
      await updateCertificate(data);
      toast({
        title: 'Client Updated',
        description: 'Certificate was successfully updated.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update the Client. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='property.client.id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedClientId(value);
                    }}
                    defaultValue={field.value}
                  >
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

          {selectedClient && selectedClient.Property.length > 0 && (
            <FormField
              control={form.control}
              name='property.id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a property' />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedClient.Property.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.address.streetAddress},{' '}
                            {property.address.postcode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              variant='outline'
            >
              {form.formState.isSubmitting ? 'Saving' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
