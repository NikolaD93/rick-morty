import { Link } from 'react-router-dom';

import { Button } from './button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto box-border flex h-14 max-w-screen-2xl items-center justify-between border-b border-border/40">
        <Link to="/">Rick and Morty App</Link>
        <div className="flex gap-2">
          <Button asChild variant="ghost" disabled>
            <Link to="characters">Characters</Link>
          </Button>
          <Button asChild variant="outline" disabled>
            <Link to="/">Logout</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
