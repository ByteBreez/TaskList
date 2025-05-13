// frontend/src/components/RoleSelection.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function RoleSelection({ setUser }) {
  const [role, setRole] = useState('guest');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await api.post('/auth/role', { role });
      console.log('Role updated:', res.data);
      setUser(res.data);
      navigate(res.data.role === 'admin' ? '/admin' : '/guest');
    } catch (err) {
      console.error('Error selecting role:', err.response?.status, err.response?.data);
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to select role. Please try again.');
      }
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow">
        <h1 className="text-center mb-4">Select Role</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoleSelection;