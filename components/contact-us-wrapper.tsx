import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export const ContactUsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <h1 className="text-3xl font-semibold">Contact Us</h1>
          <p className="text-sm text-muted-foreground">
            Your message will be copied to the support team.
          </p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
