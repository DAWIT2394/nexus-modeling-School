const Footer = () => {
  const socialLinks = [
    {
      name: "YouTube",
      url: "https://youtube.com/@nexus_modeling?si=wWrJXo2HOxn1_SUN",
      icon: "📺",
      color: "#ff0000"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/p/1CVDiqPCVW/?mibextid=wwXIfr",
      icon: "📘",
      color: "#1877f2"
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@nexusmodelingethiopia?_r=1&_t=ZS-96wOW2LZJmn",
      icon: "🎵",
      color: "#000000"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nexus_modeling_school_manag?igsh=bGhwM2FkcG1yODY2",
      icon: "📷",
      color: "#e4405f"
    },
    {
      name: "Telegram",
      url: "https://t.me/Nexus_modeling_management",
      icon: "📱",
      color: "#26A5E4"
    }
  ];

  const styles = {
    footer: {
      backgroundColor: "#111827",
      color: "#fff",
      padding: "40px 20px 20px",
      marginTop: "60px",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    mainContent: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      marginBottom: "40px",
      textAlign: "left",
    },
    section: {
      padding: "0 15px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#ec4899",
      position: "relative",
      display: "inline-block",
    },
    companyInfo: {
      lineHeight: "1.8",
      fontSize: "14px",
      color: "#d1d5db",
    },
    mapContainer: {
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      marginTop: "10px",
    },
    mapIframe: {
      width: "100%",
      height: "250px",
      border: "none",
    },
    socialLinksContainer: {
      display: "flex",
      justifyContent: "flex-start",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "15px",
    },
    socialLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      backgroundColor: "#1f2937",
      borderRadius: "40px",
      color: "#fff",
      textDecoration: "none",
      fontSize: "13px",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    quickLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    quickLink: {
      color: "#d1d5db",
      textDecoration: "none",
      fontSize: "14px",
      transition: "color 0.3s",
      display: "inline-block",
    },
    contactInfo: {
      lineHeight: "1.8",
      fontSize: "14px",
      color: "#d1d5db",
    },
    telegramBox: {
      marginTop: "15px",
      padding: "10px 12px",
      backgroundColor: "#1e293b",
      borderRadius: "12px",
    },
    locationCard: {
      marginTop: "15px",
      padding: "12px",
      backgroundColor: "#1f2937",
      borderRadius: "12px",
    },
    bottomBar: {
      borderTop: "1px solid #374151",
      paddingTop: "20px",
      textAlign: "center",
    },
    copyright: {
      fontSize: "13px",
      color: "#9ca3af",
    },
    amharicText: {
      fontSize: "12px",
      color: "#9ca3af",
      lineHeight: "1.5",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Main Content Grid */}
        <div style={styles.mainContent}>
          {/* Company Info Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>👣 Nexus Modeling School</h3>
            <div style={styles.companyInfo}>
              <p>Ethiopia's premier institution for professional modeling education, empowering dreams since 2018.</p>
              <p style={{ marginTop: "10px" }}>
                📍 Addis Ababa, Ethiopia<br />
                📞 +251 940848080<br />
                ✉️ info@nexusmodeling.com
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🔗 Quick Links</h3>
            <div style={styles.quickLinks}>
              <a href="/" style={styles.quickLink} onMouseEnter={(e) => e.target.style.color = "#ec4899"} onMouseLeave={(e) => e.target.style.color = "#d1d5db"}>🏠 Home</a>
              <a href="/courses" style={styles.quickLink} onMouseEnter={(e) => e.target.style.color = "#ec4899"} onMouseLeave={(e) => e.target.style.color = "#d1d5db"}>📚 Courses</a>
              <a href="/register" style={styles.quickLink} onMouseEnter={(e) => e.target.style.color = "#ec4899"} onMouseLeave={(e) => e.target.style.color = "#d1d5db"}>📝 Register</a>
              <a href="/gallery" style={styles.quickLink} onMouseEnter={(e) => e.target.style.color = "#ec4899"} onMouseLeave={(e) => e.target.style.color = "#d1d5db"}>📸 Gallery</a>
              <a href="/contact" style={styles.quickLink} onMouseEnter={(e) => e.target.style.color = "#ec4899"} onMouseLeave={(e) => e.target.style.color = "#d1d5db"}>📞 Contact</a>
            </div>
          </div>

          {/* Location & Map Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📍 Our Location</h3>
            <div style={styles.mapContainer}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7881.042208263861!2d38.87245500000001!3d9.016136!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMDAnNTguMSJOIDM4wrA1MicyMC44IkU!5e0!3m2!1sen!2set!4v1780751159142!5m2!1sen!2set" 
                width="100%" 
                height="200" 
                style={styles.mapIframe} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Nexus Modeling School Location"
              />
            </div>
            <div style={styles.locationCard}>
              <p style={{ fontSize: "13px", marginBottom: "5px", fontWeight: "bold", color: "#ec4899" }}>
                📍 ዝርዝር አድራሻ (Detailed Address)
              </p>
              <p style={styles.amharicText}>
                አያት አደባባይ ወርድ ብሎ ዙርያሽ ሞል ፍት ለፍት ለሚ ኩራ ክ/ከተማ ጋር
              </p>
              <p style={{ fontSize: "11px", color: "#ec4899", marginTop: "8px" }}>
                📞 ለበለጠ መረጃ: 940848080
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div style={{ ...styles.section, textAlign: "center", marginBottom: "30px" }}>
          <h3 style={{ ...styles.sectionTitle, textAlign: "center" }}>📱 Follow & Connect With Us</h3>
          <div style={{ ...styles.socialLinksContainer, justifyContent: "center" }}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = social.color;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1f2937";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "16px" }}>{social.icon}</span>
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Telegram Channel Info */}
        <div style={{ ...styles.telegramBox, maxWidth: "350px", margin: "0 auto 20px" }}>
          <p style={{ fontSize: "12px", color: "#26A5E4", textAlign: "center" }}>
            📱 Telegram Channel: <strong>@Nexus_modeling_management</strong>
          </p>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Nexus Modeling School & Management. All Rights Reserved.
          </p>
          <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "8px" }}>
            Empowering Dreams | Shaping the Future of Fashion in Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;