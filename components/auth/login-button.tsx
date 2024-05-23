'use client';

import { LoginForm } from '@/components/auth/login-form';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger
          asChild={asChild}
          className="flex items-center justify-center"
        >
          {children}
        </DialogTrigger>
        <DialogContent className="flex w-full items-center justify-center border-none bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="flex items-center justify-center">
      {children}
    </span>
  );
};
