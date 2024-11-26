'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';

import { Button } from '@/components/ui/button';

interface SignatureInputProps {
  name: string;
}

export function SignatureInput({ name }: SignatureInputProps) {
  const { control } = useFormContext();
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const penColor = currentTheme === 'dark' ? 'white' : 'black';

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const saveSignature = (onChange: (value: string) => void) => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      onChange(signatureData);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className='flex flex-col items-start'>
          <SignatureCanvas
            ref={sigCanvas}
            penColor={penColor}
            canvasProps={{
              className: 'signature-canvas border border-gray-300 w-full h-56',
            }}
            onEnd={() => saveSignature(onChange)}
          />
          <div className='mt-4 flex gap-2'>
            <Button type='button' variant='outline' size='sm' onClick={clearSignature}>
              Clear
            </Button>
          </div>
          {error && <p className='mt-1 text-sm text-red-500'>{error.message}</p>}
        </div>
      )}
    />
  );
}
