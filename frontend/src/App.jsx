// frontend/src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';
import Login from './components/Login';
import RoleSelection from './components/RoleSelection';
import AdminDashboard from './components/AdminDashboard';
import GuestDashboard from './components/GuestDashboard';

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
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/role-selection" /> : <Login setUser={setUser} />}
        />
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
        <Route
          path="/admin"
          element={
            user && user.role === 'admin' ? (
              <AdminDashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/guest"
          element={
            user && user.role === 'guest' ? (
              <GuestDashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;