import { Routes, Route } from 'react-router';
import axios from 'axios';

import Home from './pages/Home';
import FlightResultsPage from './pages/Flights';
import Layout from './components/Layout';
import AdminSignInPage from './pages/Signin';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/flights" element={<FlightResultsPage />} />
        <Route path="/admin" element={<AdminSignInPage />} />
      </Route>
    </Routes>
  );
}

export default App;
