import 'bootstrap-icons/font/bootstrap-icons.css';

function FormList({ user, forms, onEdit, onDelete }) {
  const formData = Array.isArray(forms) ? forms : [];

  return (
    <div className="card p-4 shadow-sm bg-secondary text-light">
      <h2 className="mb-4">Listings</h2>
      {formData.length === 0 ? (
        <p className="text-muted">No listings available</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {formData.map((item) => (
            <div key={item._id} className="col">
              <div className="card h-100 p-3 shadow-sm bg-dark text-light">
                <div className="card-body">
                  <p className="mb-2"><strong>Name:</strong> {item.name || 'N/A'}</p>
                  <p className="mb-2"><strong>Address:</strong> {item.address || 'N/A'}</p>
                  <p className="mb-2"><strong>PIN:</strong> {item.pin || 'N/A'}</p>
                  <p className="mb-2"><strong>Phone:</strong> {item.phone || 'N/A'}</p>
                  <p className="mb-0">
                    <strong>Created by:</strong>{' '}
                    {item.createdBy && item.createdBy.name ? item.createdBy.name : 'Unknown'}
                  </p>
                </div>
                {user.role === 'admin' && (
                  <div className="card-footer bg-transparent border-0 d-flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="btn btn-warning btn-sm transition-transform transform hover:scale-105"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="btn btn-danger btn-sm transition-transform transform hover:scale-105"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormList;