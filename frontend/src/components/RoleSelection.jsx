// src/components/RoleSelection.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Your axios instance

function RoleSelection({ setUser }) {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/role', { role });
      console.log('Role selection response:', res.data);
      setUser(res.data); // Update user with new role
      navigate(res.data.role === 'admin' ? '/admin' : '/guest');
    } catch (err) {
      console.error('Error selecting role:', err.response?.status, err.response?.data);
      if (err.response?.status === 401) {
        navigate('/login'); // Redirect to login on unauthorized
      } else {
        alert('Failed to submit role. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="guest">Guest</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RoleSelection;