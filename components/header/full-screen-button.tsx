'use client';

import { Maximize, Minimize } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export default function FullScreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch((err) => {
            console.error(`Error attempting to exit full-screen mode: ${err.message}`);
          });
      }
    }
  };

  // Listen for changes in full-screen mode to update button state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Button variant={'ghost'} className='h-8 px-2' onClick={toggleFullScreen}>
      {isFullscreen ? <Minimize className='h-5 w-5' /> : <Maximize className='h-5 w-5' />}
    </Button>
  );
}
