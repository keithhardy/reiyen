'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createEquipment } from '@/app/(dashboard)/users/[id]/(update)/equipment/action';
import { Schema } from '@/app/(dashboard)/users/[id]/(update)/equipment/schema';
import { handleFileChange } from '@/components/form/handle-file-change';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function UserEquipmentForm({ userId }: { userId: string }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      userId,
      make: '',
      model: '',
      serialNumber: '',
      testDate: '',
      certificateUrl: '',
      type: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await createEquipment(data);
      form.reset();
      toast({
        title: 'Equipment Created',
        description: 'The equipment has been successfully created.',
      });
    } catch {
      toast({
        title: 'Create Failed',
        description: 'An error occurred while creating the equipment. Please try again later.',
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
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='make'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='model'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='serialNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='testDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Date</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='certificateUrl'
            render={() => (
              <FormItem>
                <FormLabel>Certificate</FormLabel>
                <FormControl>
                  <Input type='file' accept='image/*' onChange={(e) => handleFileChange(e, form.setValue, 'certificateUrl')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button type='submit' disabled={form.formState.isSubmitting} variant='outline'>
              {form.formState.isSubmitting ? 'Adding' : 'Add'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
