'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { $Enums, Certificate } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { createCertificate } from '@/app/(dashboard)/certificates/create/action';
import { Schema } from '@/app/(dashboard)/certificates/create/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { certificateTypeNameMapping } from '@/lib/config';

export function CertificateCreateForm() {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      certificateType: $Enums.CertificateType.ELECTRICAL_INSTALLATION_CONDITION_REPORT,
    },
  });

  const onSubmit = async (data: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>) => {
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
