import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData.username, formData.email, formData.password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
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
            <p>Join thousands of productive people. Create your account and start managing tasks like a pro.</p>
            <div className="auth-visual-stats">
              <div className="stat-item">
                <span className="stat-number">Free</span>
                <span className="stat-label">Forever</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Fast</span>
                <span className="stat-label">Setup</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Safe</span>
                <span className="stat-label">& Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <h1>Create account</h1>
              <p>Get started with your free TaskFlow account</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form" id="register-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <HiOutlineUser className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={50}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email Address</label>
                <div className="input-wrapper">
                  <HiOutlineMail className="input-icon" />
                  <input
                    type="email"
                    id="reg-email"
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
                <label htmlFor="reg-password">Password</label>
                <div className="input-wrapper">
                  <HiOutlineLockClosed className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="reg-password"
                    name="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <HiOutlineLockClosed className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isSubmitting}
                id="register-submit-btn"
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner-small"></span>
                    Creating account...
                  </span>
                ) : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
