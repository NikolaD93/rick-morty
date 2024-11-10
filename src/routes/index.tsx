import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthenticatedLayout } from '@/components/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthRoutes } from '@/features/auth';
import { CharactersRoutes } from '@/features/characters';
import { EpisodesRoutes } from '@/features/episodes';
import { LocationsRoutes } from '@/features/locations';
import { NotFound } from '@/features/misc/routes/NotFound';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

export const ErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
};

export const AppRoutes = [
  {
    path: '/',
    element: <AuthRoutes />,
    children: [
      { path: '/404', element: <NotFound />, errorElement: <ErrorFallback /> },
      { path: '*', element: <Navigate to="." />, errorElement: <ErrorFallback /> },
    ],
    errorElement: <ErrorFallback />,
  },
  {
    path: '/',
    element: <ProtectedRoute children={undefined} />,
    children: [
      { path: 'characters/*', element: <CharactersRoutes />, errorElement: <ErrorFallback /> },
      { path: 'episode/*', element: <EpisodesRoutes />, errorElement: <ErrorFallback /> },
      { path: 'location/*', element: <LocationsRoutes />, errorElement: <ErrorFallback /> },
      { path: '/404', element: <NotFound />, errorElement: <ErrorFallback /> },
      { path: '*', element: <Navigate to="." />, errorElement: <ErrorFallback /> },
    ],
    errorElement: <ErrorFallback />,
  },
];
