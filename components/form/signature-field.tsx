'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';

import { Button } from '@/components/ui/button';

export function SignatureField({ value, onChange }: ControllerRenderProps) {
  const signaturePad = useRef<SignatureCanvas>(null);

  const signatureValue = value as string;

  const [isEditingSignature, setIsEditingSignature] = useState(!signatureValue);

  const handleClearSignature = () => {
    signaturePad.current?.clear();
    onChange('');
  };

  const handleEndSignature = () => {
    if (signaturePad.current) {
      if (!signaturePad.current.isEmpty()) {
        const signatureData = signaturePad.current.toDataURL('image/png');
        onChange(signatureData);
      } else {
        onChange('');
      }
    }
  };

  const handleEditSignature = () => {
    setIsEditingSignature(true);
    onChange('');
  };

  return (
    <>
      {isEditingSignature ? (
        <>
          <SignatureCanvas
            ref={signaturePad}
            onEnd={handleEndSignature}
            canvasProps={{
              className: 'signature-canvas border rounded-md w-full h-56 bg-white',
            }}
          />
          <Button type='button' variant={'ghost'} onClick={handleClearSignature}>
            Clear Signature
          </Button>
        </>
      ) : (
        <>
          <Image src={signatureValue} alt='Saved signature' width={1000} height={1000} className='h-56 w-full rounded-md border bg-white' />
          <Button type='button' variant={'ghost'} onClick={handleEditSignature}>
            Edit Signature
          </Button>
        </>
      )}
    </>
  );
}
