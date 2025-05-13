// src/components/Login.jsx
import api from '../api';

function Login({ setUser }) {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="card login-card p-5 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-light">TaskList Login</h2>
        <button
          onClick={handleLogin}
          className="btn btn-primary w-100 transition-transform transform hover:scale-105"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;