import { ContactUsForm } from '@/components/contact-us-form';
import { Navbar } from '@/components/navbar';
import Tiptap from '@/components/tiptap';

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-y-6 bg-gradient-to-r from-indigo-500 via-indigo-400  to-indigo-500">
      <Navbar />

      <ContactUsForm />
    </main>
  );
}
