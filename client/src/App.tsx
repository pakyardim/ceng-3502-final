import { Routes, Route, Navigate } from 'react-router';
import axios from 'axios';

import Home from './pages/Home';
import FlightResultsPage from './pages/Flights';
import Layout from './components/Layout';
import AdminSignInPage from './pages/Signin';
import AdminTicketsPage from './pages/Tickets';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return !isAuthenticated() ? children : <Navigate to="/tickets" />;
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/flights" element={<FlightResultsPage />} />
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminSignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <AdminTicketsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* 
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
  );
}

export default App;
