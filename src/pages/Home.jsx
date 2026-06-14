import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/herr.JPG';
import promoVideo from '../assets/kk.mp4';
import { getStatistics } from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    approvedStudents: 0,
    graduates: 0,
    experts: 0,
    workshops: 0,
    maleCount: 0,
    femaleCount: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Hover effects
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredWhy, setHoveredWhy] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  // Fetch real statistics from API
  const fetchStatistics = async () => {
    setStatsLoading(true);
    try {
      const response = await getStatistics();
      if (response.data && response.data.success) {
        const data = response.data.data;
        
        // Calculate graduates from student types
        const graduatesCount = data.studentType?.graduated || 0;
        const expertsCount = data.studentType?.experts || 0;
        const conductedCount = data.studentType?.conducted || 0;
        
        setStats({
          totalStudents: data.totalStudents || 0,
          approvedStudents: data.statusDistribution?.approved || 0,
          graduates: graduatesCount,
          experts: expertsCount,
          conducted: conductedCount,
          workshops: 0, // Static or could be fetched from a workshops API
          maleCount: data.genderDistribution?.male || 0,
          femaleCount: data.genderDistribution?.female || 0,
          pendingStudents: data.statusDistribution?.pending || 0
        });
      } else {
        // Fallback to demo data if API fails
        setStats({
          totalStudents: 156,
          approvedStudents: 142,
          graduates: 89,
          experts: 12,
          workshops: 0,
          maleCount: 48,
          femaleCount: 108
        });
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
      toast.error('Could not load live statistics');
      // Fallback data
      setStats({
        totalStudents: 156,
        approvedStudents: 142,
        graduates: 89,
        experts: 12,
        workshops: 0,
        maleCount: 48,
        femaleCount: 108
      });
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current && !videoError) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.error("Playback failed:", err);
        }
      };
      playVideo();
    }
  }, [showVideo, videoError]);

  const handleVideoError = (e) => {
    setVideoError(true);
    setVideoLoading(false);
    console.error("Video failed to load.", e);
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
    console.log("Video loaded successfully");
  };

  const handlePlayClick = () => {
    setShowVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => {
          console.error("Autoplay failed:", e);
        });
      }
    }, 100);
  };

  // Styles
  const styles = {
    heroContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      background: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))",
      overflow: 'hidden',
    },
    heroImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      zIndex: -1,
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255,107,107,0.2), rgba(78,205,196,0.2))',
      pointerEvents: 'none',
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10,
      width: '100%',
    },
    logoBadge: {
      marginBottom: '32px',
      animation: 'bounce 2s infinite',
    },
    logoBadgeInner: {
      display: 'inline-block',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(12px)',
      borderRadius: '9999px',
      padding: '12px 24px',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
    },
    mainTitle: {
      fontSize: 'clamp(40px, 8vw, 72px)',
      fontWeight: 'bold',
      marginBottom: '24px',
      lineHeight: '1.2',
      color: 'white',
    },
    gradientText: {
      background: 'linear-gradient(135deg, #f472b6, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    subtitle: {
      fontSize: 'clamp(18px, 4vw, 24px)',
      marginBottom: '32px',
      color: '#e5e7eb',
      maxWidth: '768px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
    },
    secondaryButton: {
      border: '2px solid white',
      background: 'transparent',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      backdropFilter: 'blur(4px)',
    },
    contactBar: {
      marginTop: '48px',
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      flexWrap: 'wrap',
    },
    contactBadge: {
      background: 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(12px)',
      borderRadius: '9999px',
      padding: '12px 24px',
      color: 'white',
      fontSize: '14px',
      textDecoration: 'none',
    },
    contactLink: {
      color: 'white',
      textDecoration: 'none',
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      animation: 'bounce 2s infinite',
    },
    scrollWheel: {
      width: '24px',
      height: '40px',
      border: '2px solid white',
      borderRadius: '9999px',
      display: 'flex',
      justifyContent: 'center',
    },
    scrollDot: {
      width: '4px',
      height: '12px',
      background: 'white',
      borderRadius: '9999px',
      marginTop: '8px',
      animation: 'pulse 2s infinite',
    },
    
    statsSection: {
      background: 'linear-gradient(135deg, #111827, #1f2937)',
      padding: '64px 0',
    },
    statsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '32px',
    },
    statCard: {
      textAlign: 'center',
      padding: '24px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: 'white',
    },
    statLabel: {
      color: '#d1d5db',
      fontSize: '14px',
    },
    statLoader: {
      width: '30px',
      height: '30px',
      border: '3px solid rgba(255,255,255,0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 8px',
    },
    
    videoSection: {
      padding: '80px 0',
      background: '#0f0f0f',
    },
    videoContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '48px',
    },
    sectionTitle: {
      fontSize: 'clamp(32px, 6vw, 48px)',
      fontWeight: 'bold',
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    sectionSubtitle: {
      fontSize: '20px',
      color: '#9ca3af',
      maxWidth: '576px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    titleUnderline: {
      width: '96px',
      height: '4px',
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      margin: '16px auto 0',
      borderRadius: '9999px',
    },
    videoWrapper: {
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      marginBottom: '32px',
      backgroundColor: '#1a1a1a',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    videoElement: {
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: '24px',
      cursor: 'pointer',
    },
    videoPlaceholder: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
    },
    playButton: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      marginBottom: '16px',
    },
    videoCaption: {
      textAlign: 'center',
      color: '#9ca3af',
      fontSize: '14px',
      marginTop: '16px',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px',
    },
    
    whySection: {
      padding: '80px 0',
      background: 'white',
    },
    whyContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    },
    whyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      marginTop: '48px',
    },
    whyCard: {
      textAlign: 'center',
      padding: '24px',
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    whyIcon: {
      width: '80px',
      height: '80px',
      background: '#fce7f3',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
      fontSize: '32px',
      transition: 'all 0.3s ease',
    },
    whyTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#1f2937',
    },
    whyText: {
      color: '#6b7280',
      lineHeight: '1.6',
    },
    
    ctaSection: {
      background: 'linear-gradient(135deg, #ec4899, #9333ea, #6366f1)',
      padding: '80px 0',
    },
    ctaContainer: {
      maxWidth: '768px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center',
      color: 'white',
    },
    ctaTitle: {
      fontSize: 'clamp(32px, 6vw, 48px)',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    ctaText: {
      fontSize: '20px',
      marginBottom: '32px',
      opacity: 0.9,
    },
    ctaButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    ctaPrimaryButton: {
      background: 'white',
      color: '#9333ea',
      padding: '16px 32px',
      borderRadius: '12px',
      fontWeight: 'bold',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
    },
    ctaSecondaryButton: {
      border: '2px solid white',
      background: 'transparent',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '12px',
      fontWeight: 'bold',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    ctaPhone: {
      marginTop: '32px',
      fontSize: '14px',
      opacity: 0.8,
    },
  };

  const statItems = [
    { key: 'totalStudents', label: 'Active Students', suffix: '+' },
    { key: 'graduates', label: 'Successful Graduates', suffix: '+' },
    { key: 'experts', label: 'Industry Experts', suffix: '+' },
    { key: 'workshops', label: 'Workshops Conducted', suffix: '+' }
  ];

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }
          video {
            max-width: 100%;
            height: auto;
            display: block;
          }
        `}
      </style>

      {/* Hero Section */}
      <div style={styles.heroContainer}>
        <img
          src={heroImage}
          alt="Nexus Modeling School Hero"
          style={styles.heroImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
          }}
        />
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.logoBadge}>
            <div style={styles.logoBadgeInner}>
              <span style={styles.logoText}>👣 Nexus Modeling School</span>
            </div>
          </div>
          
          <h1 style={styles.mainTitle}>
            Walk with Confidence,
            <br />
            <span style={styles.gradientText}>Shine with Nexus</span>
          </h1>
          
          <p style={styles.subtitle}>
            Ethiopia's Premier Modeling & Management School — Where Dreams Meet the Runway
          </p>
          
          <div style={styles.buttonGroup}>
            <button 
              onClick={() => navigate('/courses')}
              style={styles.primaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              Explore Programs ✨
            </button>
            <button 
              onClick={() => navigate('/register')}
              style={styles.secondaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'black';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
              Start Your Journey 👣
            </button>
          </div>
          
          <div style={styles.contactBar}>
            <div style={styles.contactBadge}>
              <a href="tel:+251940848080" style={styles.contactLink}>
                📞 +251 940 848 080
              </a>
            </div>
            <div style={styles.contactBadge}>
              <a href="mailto:info@nexusmodeling.com" style={styles.contactLink}>
                ✉️ info@nexusmodeling.com
              </a>
            </div>
          </div>
        </div>
        
        <div style={styles.scrollIndicator}>
          <div style={styles.scrollWheel}>
            <div style={styles.scrollDot}></div>
          </div>
        </div>
      </div>

      {/* Stats Section - Now with Real Data */}
      <div style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statsGrid}>
            {statItems.map((stat, index) => (
              <div 
                key={index}
                style={{
                  ...styles.statCard,
                  transform: hoveredStat === index ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}>
                {statsLoading ? (
                  <div style={styles.statLoader}></div>
                ) : (
                  <>
                    <div style={styles.statNumber}>
                      {stats[stat.key]?.toLocaleString() || 0}{stat.suffix}
                    </div>
                    <div style={styles.statLabel}>{stat.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div style={styles.videoSection}>
        <div style={styles.videoContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Watch Our Journey</h2>
            <p style={styles.sectionSubtitle}>
              See what makes Nexus the premier modeling school in Ethiopia
            </p>
            <div style={styles.titleUnderline}></div>
          </div>
          
          <div style={styles.videoWrapper}>
            {!showVideo && !videoError ? (
              <div style={styles.videoPlaceholder}>
                <div 
                  style={styles.playButton}
                  onClick={handlePlayClick}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  ▶️
                </div>
                <p style={{ marginTop: '16px', fontSize: '18px', fontWeight: 'bold' }}>Click to Play Video</p>
                <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '8px' }}>Watch our modeling journey</p>
              </div>
            ) : videoError ? (
              <div style={styles.videoPlaceholder}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Video Unavailable</p>
                <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '8px' }}>
                  Please check back later or visit our YouTube channel
                </p>
                <a 
                  href="https://youtube.com/@nexus_modeling" 
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: '20px',
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #ec4899, #9333ea)',
                    borderRadius: '40px',
                    color: 'white',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}>
                  Visit YouTube Channel
                </a>
              </div>
            ) : (
              <>
                {videoLoading && (
                  <div style={styles.videoPlaceholder}>
                    <div style={styles.loadingSpinner}></div>
                    <p>Loading video...</p>
                  </div>
                )}
                <video 
                  ref={videoRef}
                  controls 
                  loop
                  style={{
                    ...styles.videoElement,
                    display: videoLoading ? 'none' : 'block'
                  }}
                  poster={heroImage}
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  onCanPlay={() => setVideoLoading(false)}
                  playsInline
                  preload="auto"
                >
                  <source src={promoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </div>
          
          <div style={styles.videoCaption}>
            🎬 Experience the transformation - From aspiring models to runway stars
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div style={styles.whySection}>
        <div style={styles.whyContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={{
              ...styles.sectionTitle,
              background: 'linear-gradient(135deg, #1f2937, #4b5563)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Why Choose Nexus?</h2>
            <p style={styles.sectionSubtitle}>The leading modeling school in Ethiopia</p>
            <div style={styles.titleUnderline}></div>
          </div>
          
          <div style={styles.whyGrid}>
            {[
              { icon: '👑', title: 'Industry Experts', text: `Learn from ${stats.experts}+ top models and industry professionals with years of experience` },
              { icon: '🎯', title: 'Practical Training', text: 'Real runway experience, professional photoshoots, and portfolio development' },
              { icon: '🌍', title: 'Global Opportunities', text: 'International connections, casting calls, and placement assistance worldwide' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  ...styles.whyCard,
                  transform: hoveredWhy === index ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: hoveredWhy === index ? '0 20px 30px -10px rgba(0,0,0,0.15)' : 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={() => setHoveredWhy(index)}
                onMouseLeave={() => setHoveredWhy(null)}>
                <div style={{
                  ...styles.whyIcon,
                  background: hoveredWhy === index ? '#fbcfe8' : '#fce7f3',
                }}>{item.icon}</div>
                <h3 style={styles.whyTitle}>{item.title}</h3>
                <p style={styles.whyText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p style={styles.ctaText}>Join Nexus today and transform your passion into a profession</p>
          <div style={styles.ctaButtons}>
            <button 
              onClick={() => navigate('/register')}
              style={styles.ctaPrimaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              Register Now 👣
            </button>
            <button 
              onClick={() => navigate('/contact')}
              style={styles.ctaSecondaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#9333ea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}>
              Contact Us 📞
            </button>
          </div>
          <p style={styles.ctaPhone}>📞 Call us: +251 940 848 080</p>
        </div>
      </div>
    </>
  );
};

export default Home;