import { Link, useNavigate } from 'react-router';
import { Logo } from './logo';
import { useAuth } from '@/contexts/authContext';
import { Button } from './ui/button';

export function Header() {
  const navigate = useNavigate();

  const { authToken, setAuthToken } = useAuth();
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    navigate('/admin');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
          {authToken && (
            <>
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-sm font-medium text-blue-600">
                  Home
                </Link>
                <Link to="/tickets" className="text-sm font-medium text-blue-600">
                  Tickets
                </Link>
              </nav>
              <Button
                onClick={logout}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
