'use client';

import { sendContactUsMail } from '@/actions/send-contact-us-mail';
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
import { LoginButton } from '@/components/auth/login-button';
import { ContactUsWrapper } from '@/components/contact-us-wrapper';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ContactUsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ContactUsForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  console.log('🚀 ~ ContactUsForm ~ user:', user);

  const form = useForm<z.infer<typeof ContactUsSchema>>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      message: '',
    },
  });
  const onSubmit = (values: z.infer<typeof ContactUsSchema>) => {
    startTransition(() => {
      sendContactUsMail(values, user?.email || '')
        .then((data) => {
          setSuccess(data.success);
          setError(data.errror);
        })
        .catch(() => setError('Something went wrong!'));
    });
  };
  return (
    <ContactUsWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{JSON.stringify(user)}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your message here..."
                      className="resize-none"
                      disabled={!user || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          {user ? (
            <Button
              type="submit"
              className="w-full"
              disabled={!user || isPending}
            >
              Send
            </Button>
          ) : (
            <LoginButton mode="modal" asChild>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                className="w-full"
              >
                Sign in
              </Button>
            </LoginButton>
          )}
        </form>
      </Form>
    </ContactUsWrapper>
  );
};
