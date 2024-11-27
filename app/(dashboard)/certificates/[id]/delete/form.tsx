'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Certificate } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { deleteCertificate } from '@/app/(dashboard)/certificates/[id]/delete/action';
import { Schema } from '@/app/(dashboard)/certificates/[id]/delete/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { certificateTypeNameMapping } from '@/lib/config';

export function CertificateDeleteForm({ certificate }: { certificate: Certificate }) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: certificate.id,
      certificateType: '' as string,
    },
  });

  const onSubmit = async (
    data: Pick<Certificate, 'id'> & {
      certificateType: string;
    }
  ) => {
    try {
      await deleteCertificate(data);
      router.push('/certificates');
      toast({
        title: 'User Deleted',
        description: `${data.certificateType} was successfully removed.`,
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
            name='certificateType'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-muted-foreground'>
                  Enter <span className='text-foreground'>{certificateTypeNameMapping[certificate.certificateType]}</span> and press delete to remove.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='id'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type='hidden' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button type='submit' disabled={form.watch('certificateType') !== certificateTypeNameMapping[certificate.certificateType] || form.formState.isSubmitting} variant='outline'>
              {form.formState.isSubmitting ? 'Deleting' : 'Delete'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
