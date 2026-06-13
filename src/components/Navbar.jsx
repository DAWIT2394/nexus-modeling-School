import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to top
    });
  };

  // Handle navigation with scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
    setIsOpen(false); // Close mobile menu if open
  };

  // Styles
  const styles = {
    navbar: {
      boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      background: 'rgba(255,255,255,0.95)',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    logoIcon: {
      fontSize: '32px',
      animation: 'walking 2s ease-in-out infinite',
    },
    logoText: {
      fontSize: 'clamp(20px, 5vw, 28px)',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #ec4899, #9333ea, #6366f1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    logoSubtext: {
      fontSize: '10px',
      color: '#6b7280',
      letterSpacing: '1px',
    },
    desktopMenu: {
      display: 'flex',
      gap: 'clamp(16px, 3vw, 32px)',
      alignItems: 'center',
    },
    navLink: {
      textDecoration: 'none',
      color: '#374151',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      padding: '8px 12px',
      borderRadius: '8px',
      position: 'relative',
      cursor: 'pointer',
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    registerBtn: {
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      color: 'white',
      border: 'none',
      padding: '10px 24px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    dashboardBtn: {
      padding: '10px 20px',
      border: '2px solid #ec4899',
      background: 'transparent',
      color: '#ec4899',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    logoutBtn: {
      padding: '10px 20px',
      border: '2px solid #ef4444',
      background: 'transparent',
      color: '#ef4444',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    adminBtn: {
      padding: '10px 20px',
      border: '2px solid #6366f1',
      background: 'transparent',
      color: '#6366f1',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    mobileMenuBtn: {
      display: 'none',
      background: 'none',
      border: 'none',
      fontSize: '28px',
      cursor: 'pointer',
      color: '#ec4899',
      padding: '8px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
    },
    mobileMenu: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '20px 0',
      gap: '16px',
      borderTop: '1px solid #e5e7eb',
      marginTop: '16px',
    },
    mobileNavLink: {
      textDecoration: 'none',
      color: '#374151',
      fontWeight: '500',
      padding: '12px 16px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      display: 'block',
      textAlign: 'center',
      cursor: 'pointer',
    },
    mobileButtonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '0 16px',
    },
    mobileRegisterBtn: {
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
    },
    mobileDashboardBtn: {
      padding: '12px',
      border: '2px solid #ec4899',
      background: 'transparent',
      color: '#ec4899',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
    },
    mobileLogoutBtn: {
      padding: '12px',
      border: '2px solid #ef4444',
      background: 'transparent',
      color: '#ef4444',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
    },
    mobileAdminBtn: {
      padding: '12px',
      border: '2px solid #6366f1',
      background: 'transparent',
      color: '#6366f1',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
    },
    phoneNumber: {
      fontSize: '12px',
      color: '#6b7280',
      marginLeft: '16px',
      padding: '4px 12px',
      background: '#f3f4f6',
      borderRadius: '20px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
    },
  };

  // Media queries for responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes walking {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(3px) rotate(5deg); }
        75% { transform: translateX(-3px) rotate(-5deg); }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @media (max-width: 768px) {
        .desktop-menu {
          display: none !important;
        }
        .mobile-menu-btn {
          display: block !important;
        }
        .button-group {
          display: none !important;
        }
        .phone-number {
          display: none !important;
        }
      }
      
      @media (min-width: 769px) {
        .mobile-menu {
          display: none !important;
        }
      }
      
      .nav-link:hover {
        color: #ec4899 !important;
        background: #fce7f3 !important;
        transform: translateY(-2px);
      }
      
      .nav-link::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: linear-gradient(135deg, #ec4899, #9333ea);
        transition: width 0.3s ease;
      }
      
      .nav-link:hover::before {
        width: 80%;
      }
      
      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      button:active {
        transform: translateY(0);
      }
      
      .register-btn:hover {
        box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .mobile-menu {
        animation: slideDown 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo Section - Now scrolls to top on click */}
        <div onClick={() => handleNavigation('/')} style={styles.logoContainer}>
          <span style={styles.logoIcon}>👣</span>
          <div>
            <div style={styles.logoText}>Nexus</div>
            <div style={styles.logoSubtext}>Modeling School & Management</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={styles.desktopMenu}>
          <div onClick={() => handleNavigation('/')} className="nav-link" style={styles.navLink}>Home</div>
          <div onClick={() => handleNavigation('/about')} className="nav-link" style={styles.navLink}>About</div>
          <div onClick={() => handleNavigation('/courses')} className="nav-link" style={styles.navLink}>Courses</div>
          <div onClick={() => handleNavigation('/gallery')} className="nav-link" style={styles.navLink}>Gallery</div>
          <div onClick={() => handleNavigation('/contact')} className="nav-link" style={styles.navLink}>Contact</div>
        </div>

        {/* Desktop Buttons */}
        <div className="button-group" style={styles.buttonGroup}>
          <span className="phone-number" style={styles.phoneNumber}>
            📞 +251940848080
          </span>
          
          <button 
            onClick={() => handleNavigation('/register')} 
            className="register-btn"
            style={styles.registerBtn}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            Register 📝
          </button>


        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          style={styles.mobileMenuBtn}
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu" style={styles.mobileMenu}>
            <div 
              onClick={() => handleNavigation('/')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fce7f3';
                e.currentTarget.style.color = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}>
              🏠 Home
            </div>
            <div 
              onClick={() => handleNavigation('/about')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fce7f3';
                e.currentTarget.style.color = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}>
              ℹ️ About
            </div>
            <div 
              onClick={() => handleNavigation('/courses')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fce7f3';
                e.currentTarget.style.color = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}>
              📚 Courses
            </div>
            <div 
              onClick={() => handleNavigation('/gallery')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fce7f3';
                e.currentTarget.style.color = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}>
              🖼️ Gallery
            </div>
            <div 
              onClick={() => handleNavigation('/contact')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fce7f3';
                e.currentTarget.style.color = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#374151';
              }}>
              📞 Contact
            </div>
            
            <div style={styles.mobileButtonGroup}>
              <div style={{...styles.phoneNumber, margin: '0 0 8px 0', justifyContent: 'center'}}>
                📞 +251940848080
              </div>
              
              <button 
                onClick={() => handleNavigation('/register')} 
                style={styles.mobileRegisterBtn}>
                Register 📝
              </button>


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;