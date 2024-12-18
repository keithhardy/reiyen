'use client';

import { useRouter } from 'next/navigation';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={onDismiss}>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
