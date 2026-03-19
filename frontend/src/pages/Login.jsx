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
        {/* Visual Panel */}
        <div className="auth-visual">
          <div className="auth-visual-content">
            <div className="auth-visual-icon">
              <svg viewBox="0 0 80 80" fill="none">
                <rect x="8" y="14" width="64" height="52" rx="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <path d="M20 30h26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 40h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 50h22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="56" cy="44" r="13" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <path d="M51.5 44l3.5 3.5 6-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2>TaskFlow</h2>
            <p>Organize your life, one task at a time. Stay productive with our intuitive task management system.</p>

            <div className="auth-feature-pills">
              <div className="feature-pill">
                <span className="feature-pill-dot blue"></span>
                JWT-secured authentication
              </div>
              <div className="feature-pill">
                <span className="feature-pill-dot purple"></span>
                Priority-based task management
              </div>
              <div className="feature-pill">
                <span className="feature-pill-dot green"></span>
                Real-time stats &amp; tracking
              </div>
            </div>

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

        {/* Form Section */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            {/* Mobile Logo */}
            <div className="auth-logo-mobile">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path d="M7 9h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M7 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="17" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path d="M15.8 13l1 1 1.8-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>TaskFlow</span>
            </div>

            <div className="auth-header">
              <h1>Welcome back</h1>
              <p>Sign in to continue managing your tasks and track your progress.</p>
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
                ) : 'Sign In →'}
              </button>
            </form>

            <p className="auth-switch">
              Don&apos;t have an account?{' '}
              <Link to="/register">Create one for free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
