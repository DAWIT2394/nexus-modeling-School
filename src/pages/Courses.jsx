import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '60px 24px',
      animation: 'fadeIn 0.6s ease-out',
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    logoIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      animation: 'bounce 2s ease-in-out infinite',
    },
    title: {
      fontSize: 'clamp(32px, 6vw, 48px)',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '16px',
    },
    subtitle: {
      fontSize: 'clamp(16px, 4vw, 18px)',
      color: '#6b7280',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    singleCard: {
      background: 'white',
      borderRadius: '32px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      marginBottom: '60px',
    },
    heroSection: {
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      padding: '50px 40px',
      textAlign: 'center',
      color: 'white',
    },
    heroIcon: {
      fontSize: '64px',
      marginBottom: '16px',
    },
    heroTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '12px',
    },
    heroText: {
      fontSize: '18px',
      opacity: 0.95,
      maxWidth: '600px',
      margin: '0 auto',
    },
    coursesList: {
      padding: '40px',
    },
    courseItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      borderBottom: '1px solid #f3f4f6',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    courseIcon: {
      fontSize: '48px',
      minWidth: '60px',
      textAlign: 'center',
    },
    courseInfo: {
      flex: 1,
    },
    courseTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
    },
    courseDescription: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '8px',
      lineHeight: '1.5',
    },
    courseDetails: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      fontSize: '14px',
      color: '#6b7280',
    },
    courseDuration: {
      background: '#f3f4f6',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
    },
    coursePrice: {
      color: '#ec4899',
      fontWeight: 'bold',
    },
    arrowIcon: {
      fontSize: '24px',
      color: '#d1d5db',
      transition: 'transform 0.3s ease',
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '20px',
      padding: '40px',
      background: 'linear-gradient(135deg, #fef2f8, #f3e8ff)',
      borderRadius: '24px',
    },
    ctaTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#1f2937',
    },
    ctaText: {
      fontSize: '16px',
      marginBottom: '24px',
      color: '#6b7280',
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      color: 'white',
      padding: '14px 32px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    contactInfo: {
      textAlign: 'center',
      marginTop: '40px',
      padding: '20px',
      background: '#f9fafb',
      borderRadius: '16px',
    },
  };

  const courses = [
    { 
      id: 1, 
      title: 'High Fashion Model & Editorial', 
      icon: '', 
      // duration: '6-10 Months', 
      // price: '₿ 48,000', 
      color: '#ec4899',
      description: 'Master high-fashion poses, expressions, and editorial techniques for top magazines and designers.'
    },
    { 
      id: 2, 
      title: 'Runway/Catwalk Model', 
      icon: '', 
      // duration: '4-8 Months', 
      // price: '₿ 35,000', 
      color: '#f59e0b',
      description: 'Perfect your walk, posture, and stage presence for international fashion weeks and shows.'
    },
    { 
      id: 3, 
      title: 'Commercial Model', 
      icon: '', 
      // duration: '3-6 Months', 
      // price: '₿ 28,000', 
      color: '#3b82f6',
      description: 'Learn versatile modeling for TV commercials, print ads, catalogs, and brand campaigns.'
    },
    { 
      id: 4, 
      title: 'Photo Model', 
      icon: '', 
      // duration: '3-6 Months', 
      // price: '₿ 25,000', 
      color: '#8b5cf6',
      description: 'Master lighting, angles, and expressions for stunning portfolio and fashion photography.'
    },
    { 
      id: 5, 
      title: 'Fitness Model', 
      icon: '', 
      // duration: '4-8 Months', 
      // price: '₿ 32,000', 
      color: '#10b981',
      description: 'Combine fitness training with modeling for athletic brands, fitness magazines, and sportswear.'
    },
    { 
      id: 6, 
      title: 'Plus Size & Curve Model', 
      icon: '', 
      // duration: '4-8 Months', 
      // price: '₿ 30,000', 
      color: '#ef4444',
      description: 'Embrace body diversity and excel in curve modeling for inclusive fashion brands.'
    },
    { 
      id: 7, 
      title: 'Parts Model', 
      icon: '', 
      // duration: '2-4 Months', 
      // price: '₿ 18,000', 
      color: '#a855f7',
      description: 'Specialize in hands, feet, or other features for jewelry, cosmetics, and product ads.'
    },
  ];

  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
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
          
          .course-item:hover .arrow-icon {
            transform: translateX(5px);
            color: #ec4899;
          }
        `}
      </style>

      <div style={styles.header}>
        <div style={styles.logoIcon}>👣</div>
        <h1 style={styles.title}>Modeling Specializations</h1>
        <p style={styles.subtitle}>
          Find your niche in the modeling industry with our specialized training programs
        </p>
      </div>

      {/* Single Card with All Courses */}
      <div style={styles.singleCard}>
        <div style={styles.heroSection}>
          <div style={styles.heroIcon}>✨</div>
          <h2 style={styles.heroTitle}>Our Modeling Programs</h2>
          <p style={styles.heroText}>Choose from 7 specialized courses tailored to your unique modeling journey</p>
        </div>

        <div style={styles.coursesList}>
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="course-item"
              style={{
                ...styles.courseItem,
                background: hoveredCourse === index ? '#faf5ff' : 'white',
                borderRadius: hoveredCourse === index ? '16px' : '0px',
              }}
              onMouseEnter={() => setHoveredCourse(index)}
              onMouseLeave={() => setHoveredCourse(null)}
              onClick={() => navigate('/register', { state: { selectedCourse: course.title, duration: course.duration } })}
            >
              <div style={styles.courseIcon}>{course.icon}</div>
              <div style={styles.courseInfo}>
                <h3 style={styles.courseTitle}>{course.title}</h3>
                <div style={styles.courseDescription}>{course.description}</div>
                <div style={styles.courseDetails}>
                  <span style={styles.courseDuration}>{course.duration}</span>
                  <span style={styles.coursePrice}>{course.price}</span>
                  {/* <span>Full Program Fee</span> */}
                </div>
              </div>
              <div className="arrow-icon" style={styles.arrowIcon}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Start Your Modeling Journey?</h2>
        <p style={styles.ctaText}>
          Limited seats available for each specialization. Apply now to begin your training!
        </p>
        <button
          onClick={() => navigate('/register')}
          style={styles.ctaButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
          Apply Now 👣
        </button>
      </div>

      {/* Contact Info */}
      <div style={styles.contactInfo}>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          📞 For questions about our specializations, call us: <strong style={{ color: '#ec4899' }}>+251940848080</strong>
        </p>
        <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '8px' }}>
          Flexible payment plans available | Scholarships for exceptional talent | Free career consultation
        </p>
      </div>
    </div>
  );
};

export default Courses;