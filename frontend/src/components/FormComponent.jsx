import { useState } from 'react';

function FormComponent({ initialData = {}, onSubmit, submitText }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    address: initialData.address || '',
    pin: initialData.pin || '',
    phone: initialData.phone || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.pin) newErrors.pin = 'PIN is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log('Validation errors:', validationErrors);
      return;
    }
    console.log('Submitting form data:', formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-light">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label text-light">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label text-light">PIN</label>
        <input
          type="text"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          className={`form-control ${errors.pin ? 'is-invalid' : ''}`}
        />
        {errors.pin && <div className="invalid-feedback">{errors.pin}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label text-light">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100 transition-transform transform hover:scale-105">
        {submitText || 'Submit'}
      </button>
    </form>
  );
}

export default FormComponent;