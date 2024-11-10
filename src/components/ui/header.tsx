import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthContext } from '@/contexts/AuthContext';

import { Button } from './button';
import { ModeToggle } from './mode-toggle';

export const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info(`${currentUser?.email} logged out`);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto box-border flex h-14 max-w-screen-2xl items-center justify-between border-b border-border/40">
        <p className="text-xl font-bold">
          Rick and Morty <span className="text-purple-500">App</span>
        </p>
        <p className="py-2">
          Hello: <span className="text-muted-foreground">{currentUser?.email}</span>{' '}
        </p>
        <div className="flex gap-2">
          <Button asChild variant="ghost" disabled>
            <Link to="characters">Characters</Link>
          </Button>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
