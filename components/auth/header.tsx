export const Header = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-semibold">Exponent</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
