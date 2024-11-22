'use client';

import { Qualification } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { createQualification } from '@/app/dashboard/users/[id]/(update)/qualifications/action';
import { handleFileChange } from '@/components/form/handle-file-change';
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

export function UserQualificationsForm({
  user,
}: {
  user: { user_id: string };
}) {
  const { toast } = useToast();

  const form = useForm<Qualification>({
    defaultValues: {
      userId: user.user_id,
      awardingBody: '',
      qualification: '',
      qualificationNumber: '',
      awardDate: '',
      certificateUrl: '',
    },
  });

  const onSubmit = async (data: Qualification) => {
    try {
      await createQualification(data);
      form.reset();
      toast({
        title: 'Qualification Created',
        description: 'The qualification has been successfully created.',
      });
    } catch (error) {
      console.error('Error during qualification creation:', error);

      toast({
        title: 'Creation Failed',
        description:
          'An error occurred while creating the qualification. Please try again later.',
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
            name='awardingBody'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Awarding Body</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='qualification'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='qualificationNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='awardDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Award Date</FormLabel>
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
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) =>
                      handleFileChange(e, form.setValue, 'certificateUrl')
                    }
                  />
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
              {form.formState.isSubmitting ? 'Adding' : 'Add'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
