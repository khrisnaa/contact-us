'use client';

import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export const Social = () => {
  const onClick = async () => {
    await signIn('google');
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button onClick={onClick} size="lg" variant="outline" className="w-full">
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};
