const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-indigo-500 via-indigo-400  to-indigo-500">
      {children}
    </div>
  );
};
export default Layout;
