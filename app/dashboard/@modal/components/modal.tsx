'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/components/ui/dialog';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={onDismiss}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
