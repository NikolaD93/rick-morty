import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes';

export const AppProvider = () => {
  const queryClient = new QueryClient();
  const Router = createBrowserRouter(AppRoutes);
  return (
    <AuthContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <div
                className="inline-block h-20 w-20 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <RouterProvider router={Router} />
          </QueryClientProvider>
          <Toaster
            richColors
            toastOptions={{
              classNames: {
                closeButton: 'bg-white',
              },
            }}
            closeButton
          />
        </Suspense>
      </ThemeProvider>
    </AuthContextProvider>
  );
};
