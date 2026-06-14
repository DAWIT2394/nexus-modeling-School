import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const styles = {
    container: {
      minHeight: '80vh',
      background: '#f8fafc',
      padding: '80px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    headerSection: {
      textAlign: 'center',
      maxWidth: '600px',
      marginBottom: '64px',
    },
    subtitle: {
      color: '#db2777',
      fontWeight: 'bold',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontSize: '14px',
    },
    title: {
      fontSize: '40px',
      fontWeight: '900',
      color: '#0f172a',
      margin: '12px 0 0 0',
      letterSpacing: '-0.025em',
    },
    desc: {
      fontSize: '16px',
      color: '#64748b',
      margin: '16px 0 0 0',
      lineHeight: '1.6',
    },
    card: {
      background: 'white',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
      border: '1px solid #f1f5f9',
      padding: '48px',
      maxWidth: '800px',
      width: '100%',
      boxSizing: 'border-box',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '40px',
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
    },
    iconBox: (type) => {
      const colors = {
        phone: { bg: '#fdf2f8', text: '#db2777' },
        email: { bg: '#e0e7ff', text: '#4f46e5' },
        address: { bg: '#d1fae5', text: '#059669' },
        hours: { bg: '#fef3c7', text: '#d97706' },
      };
      const theme = colors[type] || colors.phone;
      return {
        padding: '16px',
        borderRadius: '16px',
        background: theme.bg,
        color: theme.text,
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
    },
    itemLabel: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      margin: 0,
    },
    itemValue: {
      fontSize: '18px',
      fontWeight: '800',
      color: '#1e293b',
      margin: '4px 0 0 0',
      textDecoration: 'none',
      display: 'block',
    },
    itemSub: {
      fontSize: '13px',
      color: '#64748b',
      margin: '4px 0 0 0',
    },
    footer: {
      marginTop: '48px',
      paddingTop: '32px',
      borderTop: '1px solid #f1f5f9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
    },
    footerText: {
      fontSize: '13px',
      color: '#94a3b8',
      fontWeight: '600',
    },
    socials: {
      display: 'flex',
      gap: '12px',
    },
    socialIcon: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#f1f5f9',
      color: '#64748b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <span style={styles.subtitle}>Find Us</span>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.desc}>
          Have questions about our courses, schedule, or enrollment? Get in touch with our team directly.
        </p>
      </div>

      <div style={styles.card}>
        <div style={styles.grid}>
          {/* Phone */}
          <div style={styles.item}>
            <div style={styles.iconBox('phone')}>
              <FaPhoneAlt />
            </div>
            <div>
              <p style={styles.itemLabel}>Call Us</p>
              <a href="tel:+251940848080" style={styles.itemValue}>
                +251 940 848 080
              </a>
              <p style={styles.itemSub}>Available Mon-Sat for inquiries</p>
            </div>
          </div>

          {/* Email */}
          <div style={styles.item}>
            <div style={styles.iconBox('email')}>
              <FaEnvelope />
            </div>
            <div>
              <p style={styles.itemLabel}>Email Us</p>
              <a href="mailto:info@nexusmodeling.com" style={styles.itemValue}>
                info@nexusmodeling.com
              </a>
              <p style={styles.itemSub}>Get reply within 24 hours</p>
            </div>
          </div>

          {/* Location */}
          <div style={styles.item}>
            <div style={styles.iconBox('address')}>
              <FaMapMarkerAlt />
            </div>
            <div>
              <p style={styles.itemLabel}>Our Campus</p>
              <span style={styles.itemValue}>                አያት አደባባይ ወርድ ብሎ ዙርያሽ ሞል ፍት ለፍት ለሚ ኩራ ክ/ከተማ ጋር
</span>
              <p style={styles.itemSub}>Addis Ababa, Ethiopia</p>
            </div>
          </div>

          {/* Working hours */}
          <div style={styles.item}>
            <div style={styles.iconBox('hours')}>
              <FaClock />
            </div>
            <div>
              <p style={styles.itemLabel}>Working Hours</p>
              <span style={styles.itemValue}>Mon - Sat: 8 AM - 6 PM</span>
              <p style={styles.itemSub}>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <span style={styles.footerText}>© 2026 Nexus Modeling School & Management</span>
          <div style={styles.socials}>
            <span style={styles.socialIcon}>f</span>
            <span style={styles.socialIcon}>in</span>
            <span style={styles.socialIcon}>ig</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;