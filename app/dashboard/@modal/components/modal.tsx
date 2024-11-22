'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={onDismiss}>
      <DialogContent>
        <VisuallyHidden >
          <DialogTitle />
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
