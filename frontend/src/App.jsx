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
        console.log('Fetched user:', res.data); // Log user data after fetch
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/role-selection" /> : <Login setUser={setUser} />} />
        <Route
          path="/role-selection"
          element={
            user && !user.role ? (
              <RoleSelection setUser={setUser} />
            ) : (
              <>
                {console.log('Redirecting from role-selection, user:', user)} {/* Log redirect */}
                <Navigate to={user?.role === 'admin' ? '/admin' : '/guest'} />
              </>
            )
          }
        />
        <Route
          path="/admin"
          element={user && user.role === 'admin' ? <AdminDashboard user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route
          path="/guest"
          element={user && user.role === 'guest' ? <GuestDashboard user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;