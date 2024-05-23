import { AuthButton } from '@/components/auth/auth-button';
import { UserButton } from '@/components/auth/user-button';
import { currentUser } from '@/lib/auth';

export const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed top-0 flex w-full items-center justify-between bg-white p-2 md:p-4">
      <h1 className="text-2xl font-bold">Sexponent</h1>
      {user ? <UserButton /> : <AuthButton />}
    </div>
  );
};
