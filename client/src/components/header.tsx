import { Link } from 'react-router';
import { Logo } from './logo';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
}
