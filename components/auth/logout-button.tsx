'use client';

import { signOut } from 'next-auth/react';
import { logout } from '@/actions/logout';
import { useRouter } from 'next/navigation';

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = async () => {
    // await logout();
    await signOut();
  };
  return (
    <span onClick={onClick} className="flex items-center justify-center">
      {children}
    </span>
  );
};
