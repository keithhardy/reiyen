'use client';

import { Certificate } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { deleteCertificate } from '@/app/dashboard/certificates/[id]/delete/action';
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

export function CertificateDeleteForm({
  certificate,
}: {
  certificate: Certificate;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      id: certificate.id,
      name: '',
    },
  });

  const onSubmit = async (data: Pick<Certificate, 'id' | 'name'>) => {
    try {
      await deleteCertificate(data);
      router.push('/dashboard/certificates');
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
                  Enter{' '}
                  <span className='text-foreground'>{certificate.name}</span>{' '}
                  and press delete to remove.
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
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              variant='outline'
            >
              {form.formState.isSubmitting ? 'Deleting' : 'Delete'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
