import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import FormComponent from './FormComponent';
import FormList from './FormList';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AdminDashboard({ user, setUser }) {
  const [formDataList, setFormDataList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const res = await api.get('/form');
      console.log('Fetched form data:', res.data);
      setFormDataList(res.data || []);
    } catch (err) {
      console.error('Error fetching form data:', err.response?.data || err.message);
      setFormDataList([]);
    }
  };

  const handleCreate = async (data) => {
    try {
      console.log('Creating form data:', data);
      const response = await api.post('/form', data);
      console.log('Create response:', response.data);
      setShowCreateModal(false);
      await fetchFormData();
    } catch (err) {
      console.error('Error creating form data:', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      console.log('Updating form data:', data, 'ID:', editingId);
      const response = await api.put(`/form/${editingId}`, data);
      console.log('Update response:', response.data);
      setEditingId(null);
      await fetchFormData();
    } catch (err) {
      console.error('Error updating form data:', err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    console.log('Editing item:', item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting ID:', id);
      await api.delete(`/form/${id}`);
      await fetchFormData();
    } catch (err) {
      console.error('Error deleting form data:', err.response?.data || err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.get('/auth/logout');
      console.log('Logout response:', response.data);
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err.response?.data || err.message);
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand"><h3> Welcome Admin {user.name} </h3></span>
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

      {/* Main Content */}
      <div className="container py-4">
        {/* Create Box */}
        <div className="card bg-secondary text-light p-3 mb-4 shadow-sm text-center" style={{ maxWidth: '300px' }}>
          <h5 className="mb-3">Add a new listing</h5>
          <button
            className="btn btn-primary transition-transform transform hover:scale-105"
            onClick={() => setShowCreateModal(true)}
            title="Create New Entry"
          >
            <i className="bi bi-plus-circle me-2"></i>Create
          </button>
        </div>

        {/* Create Modal */}
        <div
          className={`modal fade ${showCreateModal ? 'show d-block' : ''}`}
          tabIndex="-1"
          style={{ backgroundColor: showCreateModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Create New Data</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <FormComponent
                  initialData={{}}
                  onSubmit={handleCreate}
                  submitText="Create"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingId && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-light">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Update Data</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setEditingId(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <FormComponent
                    initialData={
                      formDataList.find((item) => item._id === editingId) || {}
                    }
                    onSubmit={handleUpdate}
                    submitText="Update"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings */}
        <FormList
          user={user}
          forms={formDataList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;