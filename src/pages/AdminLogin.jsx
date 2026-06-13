import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAdmin(phone, password);
      const data = response.data;
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid phone number or password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid phone number or password');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    },
    card: {
      background: 'white',
      padding: '40px',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      width: '100%',
      maxWidth: '450px',
      animation: 'fadeInUp 0.6s ease-out',
    },
    logoSection: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    logoIcon: {
      fontSize: '48px',
      marginBottom: '10px',
      display: 'inline-block',
      animation: 'bounce 2s ease-in-out infinite',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#6b7280',
      textAlign: 'center',
    },
    errorMessage: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '12px',
      marginBottom: '20px',
      fontSize: '14px',
      textAlign: 'center',
      animation: 'shake 0.5s ease-out',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      position: 'relative',
    },
    inputLabel: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    passwordWrapper: {
      position: 'relative',
    },
    passwordToggle: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '20px',
      padding: '4px',
    },
    button: {
      width: '100%',
      padding: '14px',
      background: loading 
        ? 'linear-gradient(135deg, #94a3b8, #64748b)'
        : 'linear-gradient(135deg, #ec4899, #9333ea)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
    },
    footerLinks: {
      marginTop: '24px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280',
    },
    backLink: {
      color: '#ec4899',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
    },
    contactInfo: {
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center',
      fontSize: '12px',
      color: '#9ca3af',
    },
  };

  // Focus effects
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          input:focus {
            border-color: #ec4899 !important;
            box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1) !important;
          }
          
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
          }
          
          button:active {
            transform: translateY(0);
          }
        `}
      </style>
      
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>👣</div>
          <h2 style={styles.title}>Admin Login</h2>
          <p style={styles.subtitle}>Nexus Modeling School & Management</p>
        </div>
        
        {error && (
          <div style={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Phone Number</label>
            <input
              type="text"
              placeholder="+251900000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
              style={{
                ...styles.input,
                borderColor: focusedField === 'phone' ? '#ec4899' : '#e5e7eb',
              }}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                style={{
                  ...styles.input,
                  borderColor: focusedField === 'password' ? '#ec4899' : '#e5e7eb',
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span style={{
                  display: 'inline-block',
                  width: '18px',
                  height: '18px',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></span>
                Logging in...
              </span>
            ) : (
              '🔐 Login to Dashboard'
            )}
          </button>
        </form>

        <div style={styles.footerLinks}>
          <a 
            href="/" 
            style={styles.backLink}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            ← Back to Home
          </a>
        </div>

        <div style={styles.contactInfo}>
          <p>📞 Need help? Call +251940848080</p>
          <p style={{ marginTop: '5px' }}>© 2024 Nexus Modeling School. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;