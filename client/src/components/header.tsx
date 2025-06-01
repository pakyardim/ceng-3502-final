import { Plane } from 'lucide-react';
import { Link } from 'react-router';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FlyTicket
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
