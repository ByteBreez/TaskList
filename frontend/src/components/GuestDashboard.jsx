import { useState, useEffect } from 'react';
import api from '../api'
import { useNavigate } from 'react-router-dom';
import FormList from './FormList';

function GuestDashboard({ user, setUser }) {
  const [formDataList, setFormDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const res = await api.get('/form');
        setFormDataList(res.data || []);
      } catch (err) {
        console.error('Error fetching form data:', err);
        setFormDataList([]);
      }
    };
    fetchFormData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.get('/auth/logout');
      console.log('Logout response:', response.data);
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand"><h3>Welcome Guest {user.name}</h3></span>
          <div className="ms-auto">
            <button
              onClick={handleLogout}
              className="btn btn-outline-light transition-transform transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Listings */}
      <div className="container py-4">
        <FormList
          user={user}
          forms={formDataList}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}

export default GuestDashboard;