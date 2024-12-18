'use client';

import { useRouter } from 'next/navigation';

import { deleteProperty } from '@/app/(dashboard)/properties/[id]/delete/action';
import { Schema } from '@/app/(dashboard)/properties/[id]/delete/schema';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Property } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export function PropertyDeleteForm({ property }: { property: Property }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: property.id,
      uprn: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await deleteProperty(data);
      router.push('/properties');
      toast({
        title: 'Property Deleted',
        description: 'Property was successfully removed.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete the property. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pb-4">
          <FormField
            control={form.control}
            name="uprn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Enter <span className="text-foreground">{property.uprn}</span>{' '}
                  and press delete to remove.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                form.watch('uprn') !== property.uprn ||
                form.formState.isSubmitting
              }
              variant="outline"
            >
              {form.formState.isSubmitting ? 'Deleting' : 'Delete'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
