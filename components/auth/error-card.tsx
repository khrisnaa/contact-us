import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { CardWrapper } from '@/components/auth/card-wrapper';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
