import { Navigate, Outlet } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { CharactersRoutes } from '@/features/characters';
import { NotFound } from '@/features/misc/routes/NotFound';

const App = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
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
    element: <App />,
    children: [
      { path: 'characters/*', element: <CharactersRoutes />, errorElement: <ErrorFallback /> },
      { path: '/404', element: <NotFound />, errorElement: <ErrorFallback /> },
      { path: '*', element: <Navigate to="." />, errorElement: <ErrorFallback /> },
    ],
    errorElement: <ErrorFallback />,
  },
];
