import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <div className="auth-visual-icon">
              <svg viewBox="0 0 80 80" fill="none">
                <rect x="8" y="16" width="64" height="48" rx="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <path d="M20 32h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 42h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 52h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="56" cy="44" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <path d="M52 44l3 3 5-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2>TaskFlow</h2>
            <p>Organize your life, one task at a time. Stay productive with our intuitive task management system.</p>
            <div className="auth-visual-stats">
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Tasks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Access</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <h1>Welcome back</h1>
              <p>Sign in to continue managing your tasks</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form" id="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <HiOutlineMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <HiOutlineLockClosed className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isSubmitting}
                id="login-submit-btn"
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner-small"></span>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="auth-switch">
              Don&apos;t have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
