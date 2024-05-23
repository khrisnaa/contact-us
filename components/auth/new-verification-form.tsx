'use client';

import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';

export const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const searchParam = useSearchParams();
  const token = searchParam.get('token');

  const onSubmit = useCallback(async () => {
    if (!token) {
      return setError('Token is missing!');
    }

    setTimeout(async () => {
      await newVerification(token)
        .then((data) => {
          setSuccess(data?.success);

          setError(data?.error);
        })
        .catch(() => {
          setError('Something went wrong!');
        });
    }, 10000);
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <PacmanLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
