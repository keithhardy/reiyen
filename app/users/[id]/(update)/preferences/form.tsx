'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Preferences } from '@prisma/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';

import { updatePreferences } from '@/app/users/[id]/(update)/preferences/action';
import { Schema } from '@/app/users/[id]/(update)/preferences/schema';
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

export function UserPreferencesForm({
  preferences,
  user,
}: {
  preferences?: Preferences;
  user: { user_id: string };
}) {
  const { toast } = useToast();

  const [isEditingSignature, setIsEditingSignature] = useState(false);

  const form = useForm<Preferences>({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: preferences?.id || '',
      position: preferences?.position || '',
      signature: preferences?.signature || '',
      userId: user.user_id,
    },
  });

  const signaturePad = useRef<SignatureCanvas>(null);

  const handleClearSignature = () => {
    signaturePad.current?.clear();
    form.setValue('signature', '');
    setIsEditingSignature(true);
  };

  const onSubmit = async (data: Preferences) => {
    if (signaturePad.current && !signaturePad.current.isEmpty()) {
      data.signature = signaturePad.current.toDataURL('image/png');
    } else {
      data.signature = isEditingSignature ? '' : preferences?.signature || '';
    }
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
            render={() => (
              <FormItem>
                <FormLabel>Signature</FormLabel>
                <FormControl>
                  {isEditingSignature || !preferences?.signature ? (
                    <SignatureCanvas
                      ref={signaturePad}
                      canvasProps={{
                        className: 'signature-canvas border rounded-md w-full h-56 bg-white',
                      }}
                    />
                  ) : (
                    <Image
                      src={preferences.signature}
                      alt='Saved signature'
                      width='1000'
                      height='1000'
                      className='h-56 w-full rounded-md border bg-white'
                    />
                  )}
                </FormControl>
                <button
                  type='button'
                  onClick={handleClearSignature}
                  className='mt-2 bg-background text-sm'
                >
                  Clear Signature
                </button>
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
