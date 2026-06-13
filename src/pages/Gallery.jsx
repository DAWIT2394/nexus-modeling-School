import {  useState } from 'react';

// Import images from local folder
// import g1 from '../assets/g1.JPG';
import g2 from '../assets/g2.JPG';
import g3 from '../assets/g3.PNG';
import g4 from '../assets/g4.JPG';
import g5 from '../assets/g5.PNG';
import g6 from '../assets/g6.JPG';
import g7 from '../assets/g7.JPG';
import g8 from '../assets/g8.PNG';
import g9 from '../assets/g9.jpg';
// import g10 from '../assets/g10.JPG';
import g11 from '../assets/g11.JPG';
import g12 from '../assets/g12.JPG';
import g13 from '../assets/g13.PNG';
import g15 from '../assets/g15.JPG';
// Local gallery data with imported images - defined outside component
const SAMPLE_GALLERY = [
  // { id: 1, image: g1, title: 'Runway Training Session', category: 'training' },
  { id: 2, image: g2, title: 'Fashion Show 2023', category: 'event' },
  { id: 3, image: g3, title: 'Graduation Ceremony', category: 'graduation' },
  { id: 4, image: g4, title: 'Professional Photo Shoot', category: 'photoshoot' },
  { id: 5, image: g5, title: 'Model Workshop', category: 'workshop' },
  { id: 6, image: g6, title: 'Fitness Training', category: 'training' },
  { id: 7, image: g7, title: 'Portfolio Session', category: 'photoshoot' },
  { id: 8, image: g8, title: 'Fashion Week Ethiopia', category: 'event' },
  { id: 9, image: g9, title: 'Award Ceremony 2024', category: 'graduation' },
  // { id: 10, image: g10, title: 'Posing Masterclass', category: 'workshop' },
  { id: 11, image: g11, title: 'Catwalk Practice', category: 'training' },
  { id: 12, image: g12, title: 'Magazine Cover Shoot', category: 'photoshoot' },
  { id: 13, image: g13, title: 'Editorial Photo Shoot', category: 'photoshoot' },
  { id: 15, image: g15, title: 'Talent Development', category: 'training' },  
];


const Gallery = () => {
  const [gallery] = useState(SAMPLE_GALLERY);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading] = useState(false);                      

  const displayGallery = gallery;

  const categories = [
    { id: 'all', label: 'All Photos', icon: '📸' },
    { id: 'training', label: 'Training', icon: '💪' },
    { id: 'event', label: 'Events', icon: '🎉' },
    { id: 'photoshoot', label: 'Photo Shoots', icon: '📷' },
    { id: 'graduation', label: 'Graduation', icon: '🎓' },
    { id: 'workshop', label: 'Workshops', icon: '💡' },
  ];

  const filteredGallery = filter === 'all' 
    ? displayGallery 
    : displayGallery.filter(item => item.category === filter);

  const styles = {
    container: {
      maxWidth: '1290px',
      margin: '0 auto',
      padding: '60px 20px',
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
    statsBar: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      marginTop: '30px',
      flexWrap: 'wrap',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#ec4899',
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280',
    },
    filterSection: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    filterButton: {
      padding: '10px 24px',
      border: '2px solid #e5e7eb',
      background: 'white',
      borderRadius: '40px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    galleryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      marginBottom: '60px',
    },
    galleryCard: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      height: '420px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#f3f4f6',
    },
    imageWrapper: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
    },
    galleryImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
      transition: 'transform 0.5s ease',
      display: 'block',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)',
      padding: '20px 16px 16px 16px',
      transform: 'translateY(100%)',
      transition: 'transform 0.3s ease',
    },
    cardTitle: {
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '4px',
    },
    cardCategory: {
      color: '#ec4899',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'capitalize',
      display: 'inline-block',
      padding: '2px 8px',
      background: 'rgba(0,0,0,0.5)',
      borderRadius: '12px',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.95)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.3s ease-out',
    },
    modalContent: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      position: 'relative',
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '90vh',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    },
    modalClose: {
      position: 'absolute',
      top: '-45px',
      right: '-10px',
      background: 'white',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px 14px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
    },
    modalTitle: {
      position: 'absolute',
      bottom: '-40px',
      left: '0',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    },
    spinner: {
      width: '64px',
      height: '64px',
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #ec4899',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '20px',
    },
    emptyTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: '10px',
    },
    emptyText: {
      color: '#6b7280',
    },
    ctaSection: {
      textAlign: 'center',
      padding: '40px',
      background: 'linear-gradient(135deg, #ec4899, #9333ea)',
      borderRadius: '24px',
      color: 'white',
    },
    ctaTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    ctaButton: {
      background: 'white',
      color: '#ec4899',
      padding: '12px 32px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '16px',
    },
  };

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
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .gallery-card:hover img {
            transform: scale(1.1);
          }
          
          .gallery-card:hover .overlay {
            transform: translateY(0);
          }
          
          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
              gap: 16px !important;
            }
            .gallery-card {
              height: 300px !important;
            }
          }
          
          @media (max-width: 480px) {
            .gallery-grid {
              grid-template-columns: 1fr !important;
            }
            .gallery-card {
              height: 400px !important;
            }
          }
        `}
      </style>

      <div style={styles.header}>
        <div style={styles.logoIcon}>👣</div>
        <h1 style={styles.title}>Our Gallery</h1>
        <p style={styles.subtitle}>
          Explore moments from our modeling classes, fashion shows, and student achievements
        </p>
        
        <div style={styles.statsBar}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{displayGallery.length}+</div>
            <div style={styles.statLabel}>Moments Captured</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>50+</div>
            <div style={styles.statLabel}>Events Covered</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>1000+</div>
            <div style={styles.statLabel}>Happy Students</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div style={styles.filterSection}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            style={{
              ...styles.filterButton,
              background: filter === cat.id 
                ? 'linear-gradient(135deg, #ec4899, #9333ea)' 
                : 'white',
              color: filter === cat.id ? 'white' : '#374151',
              borderColor: filter === cat.id ? 'transparent' : '#e5e7eb',
              transform: hoveredCard === cat.id ? 'translateY(-2px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setHoveredCard(cat.id)}
            onMouseLeave={() => setHoveredCard(null)}>
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
        </div>
      ) : (
        <>
          {filteredGallery.length > 0 ? (
            <div className="gallery-grid" style={styles.galleryGrid}>
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id || item._id || index}
                  className="gallery-card"
                  style={styles.galleryCard}
                  onClick={() => setSelectedImage(item)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}>
                  <div style={styles.imageWrapper}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={styles.galleryImage}
                      loading="lazy"
                    />
                  </div>
                  <div className="overlay" style={styles.overlay}>
                    <div style={styles.cardTitle}>{item.title}</div>
                    <div style={styles.cardCategory}>
                      {item.category || 'Modeling'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📸</div>
              <h3 style={styles.emptyTitle}>No images found</h3>
              <p style={styles.emptyText}>Try a different filter category</p>
            </div>
          )}
        </>
      )}

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Want to be Featured in Our Gallery?</h2>
        <p style={{ opacity: 0.95 }}>
          Join Nexus Modeling School and start your journey to become a professional model
        </p>
        <button
          onClick={() => window.location.href = '/register'}
          style={styles.ctaButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
          Join Now 👣
        </button>
      </div>

      {/* Contact Info */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        background: '#f9fafb',
        borderRadius: '16px',
      }}>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          📸 Follow us on social media for more updates | 📞 <strong style={{ color: '#ec4899' }}>+251940848080</strong>
        </p>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div style={styles.modal} onClick={() => setSelectedImage(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.modalClose}
              onClick={() => setSelectedImage(null)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              ✕
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={styles.modalImage}
            />
            <div style={styles.modalTitle}>{selectedImage.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;