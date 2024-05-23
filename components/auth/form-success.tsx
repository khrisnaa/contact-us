import { CheckCircledIcon } from '@radix-ui/react-icons';

export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-600/15 p-3 text-sm text-emerald-600">
      <CheckCircledIcon />
      <p>{message}</p>
    </div>
  );
};
