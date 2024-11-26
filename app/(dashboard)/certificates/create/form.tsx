'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { $Enums, Address, Certificate, Client, Property } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createCertificate } from '@/app/(dashboard)/certificates/create/action';
import { Schema } from '@/app/(dashboard)/certificates/create/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { certificateTypeNameMapping } from '@/lib/config';

export function CertificateCreateForm({
  clients,
}: {
  clients: (Client & {
    properties: (Property & {
      address: Address | null;
    })[];
  })[];
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      certificateType: $Enums.CertificateType.ELECTRICAL_INSTALLATION_CONDITION_REPORT,
      date: '24/11/2024',
      technicianId: '',
      technicianSignature: '',
      technicianSignatureDate: '',
      supervisorId: '',
      supervisorSignature: '',
      supervisorSignatureDate: '',
      status: 'In progress',
      property: {
        id: '',
        client: {
          id: '',
        },
      },
    },
  });

  const selectedClient = clients.find((client) => client.id === selectedClientId);

  const onSubmit = async (
    data: Omit<Certificate, 'id' | 'propertyId' | 'createdAt' | 'updatedAt'> & {
      property: Pick<Property, 'id'> & {
        client: Pick<Client, 'id'>;
      };
    }
  ) => {
    try {
      await createCertificate(data);
      router.push('/certificates');
      toast({
        title: 'Certificate Created',
        description: `Certificate was successfully created.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create the Certificate. Please try again.',
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
            name='certificateType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a certificate type' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(certificateTypeNameMapping).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
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
          {selectedClient && selectedClient.properties.length > 0 && (
            <FormField
              control={form.control}
              name='property.id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a property' />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedClient.properties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.address?.streetAddress}, {property.address?.postcode}
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
