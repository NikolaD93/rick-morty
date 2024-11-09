import { Link } from 'react-router-dom';

import { Button } from './button';
import { ModeToggle } from './mode-toggle';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto box-border flex h-14 max-w-screen-2xl items-center justify-between border-b border-border/40">
        <p className="text-xl font-bold">
          Rick and Morty <span className="text-purple-500">App</span>
        </p>
        <div className="flex gap-2">
          <Button asChild variant="ghost" disabled>
            <Link to="characters">Characters</Link>
          </Button>
          <Button asChild variant="outline" disabled>
            <Link to="/">Logout</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
