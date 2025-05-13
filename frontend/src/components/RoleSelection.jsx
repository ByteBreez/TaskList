import { useState } from 'react';
import api from '../api';

function RoleSelection({ setUser }) {
  const [role, setRole] = useState('guest');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/role', { role });
      setUser(res.data);
    } catch (err) {
      console.error('Error selecting role:', err);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow">
        <h1 className="text-center mb-4">Select Role</h1>
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
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoleSelection;