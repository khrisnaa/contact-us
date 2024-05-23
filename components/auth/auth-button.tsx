'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const AuthButton = () => {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Button variant="secondary" asChild>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/register">Sign up</Link>
      </Button>
    </div>
  );
};
