import { Outlet } from 'react-router';
import { Header } from './header';
import { Footer } from './footer';

function Layout() {
  return (
    <div className="w-screen flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
