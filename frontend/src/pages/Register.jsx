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

  // Password strength indicator
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);
  const strengthColors = ['', '#f07a93', '#f8d06a', '#f8d06a', '#5dda9a', '#5dda9a'];

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
            <p>Join and start managing your tasks like a pro. Free forever, no credit card required.</p>

            <div className="auth-feature-pills">
              <div className="feature-pill">
                <span className="feature-pill-dot blue"></span>
                Free forever, unlimited tasks
              </div>
              <div className="feature-pill">
                <span className="feature-pill-dot purple"></span>
                Smart priority &amp; due date tracking
              </div>
              <div className="feature-pill">
                <span className="feature-pill-dot green"></span>
                Setup in under 30 seconds
              </div>
            </div>

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
                <span className="stat-label">&amp; Secure</span>
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
              <h1>Create account</h1>
              <p>Get started with your free TaskFlow account today.</p>
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
                {formData.password && (
                  <div className="password-strength">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{
                          background: i <= strengthScore ? strengthColors[strengthScore] : undefined,
                        }}
                      />
                    ))}
                  </div>
                )}
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
                ) : 'Create Account →'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
