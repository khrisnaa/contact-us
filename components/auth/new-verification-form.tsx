'use client';

import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';

export const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const searchParam = useSearchParams();
  const token = searchParam.get('token');

  const router = useRouter();

  const onSubmit = useCallback(async () => {
    if (!token) {
      return setError('Token is missing!');
    }

    setTimeout(async () => {
      await newVerification(token)
        .then((data) => {
          if (data.success) {
            setSuccess(data?.success);
          }

          setTimeout(() => {
            router.push('/auth/login');
            if (data.error) {
              setError(data?.error);
            }
          }, 3000);
        })
        .catch(() => {
          setError('Something went wrong!');
        });
    }, 1000);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your email!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <PacmanLoader />}
        {!error && success && <FormSuccess message={success} />}
        {!success && error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
