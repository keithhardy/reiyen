'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Preferences } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { updatePreferences } from '@/app/(dashboard)/users/[id]/(update)/preferences/action';
import { Schema } from '@/app/(dashboard)/users/[id]/(update)/preferences/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { SignatureField } from '../components/signature-field';

export function UserPreferencesForm({ preferences }: { preferences: Preferences }) {
  const { toast } = useToast();

  const form = useForm<Preferences>({
    resolver: zodResolver(Schema),
    defaultValues: preferences,
  });

  const onSubmit = async (data: Preferences) => {
    try {
      await updatePreferences(data);
      toast({
        title: 'Preferences Updated',
        description: "The user's preferences have been successfully updated.",
      });
    } catch {
      toast({
        title: 'Update Failed',
        description: 'An error occurred while updating the preferences. Please try again later.',
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
            name='position'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='signature'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signature</FormLabel>
                <FormControl>
                  <SignatureField {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' disabled={form.formState.isSubmitting} variant='outline'>
            {form.formState.isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
