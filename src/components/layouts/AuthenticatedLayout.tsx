import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/ui/header';

export const AuthenticatedLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto">{children ? children : <Outlet />}</div>
    </div>
  );
};
