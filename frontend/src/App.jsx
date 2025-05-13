// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from './api'; // Your axios instance
import RoleSelection from './components/RoleSelection';
import Login from './components/Login';
// Import other components as needed

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/auth/user')
      .then((res) => {
        console.log('Fetched user:', res.data);
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err.response?.status, err.response?.data);
        setUser(null); // Reset user on any error (e.g., 401)
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route
        path="/role-selection"
        element={
          user ? (
            !user.role ? (
              <RoleSelection setUser={setUser} />
            ) : (
              <Navigate to={user.role === 'admin' ? '/admin' : '/guest'} />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Add other routes like /admin, /guest, etc. */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;