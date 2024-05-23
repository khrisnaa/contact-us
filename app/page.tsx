import { ContactUsForm } from '@/components/contact-us-form';
import { Navbar } from '@/components/navbar';
import { currentUser } from '@/lib/auth';

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex h-full flex-col items-center justify-center gap-y-6 bg-gradient-to-r from-indigo-500 via-indigo-400  to-indigo-500">
      <Navbar />
      <ContactUsForm user={user} />
    </main>
  );
}
