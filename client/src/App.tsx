import { Routes, Route } from 'react-router';
import axios from 'axios';

import Home from './pages/Home';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}

export default App;
