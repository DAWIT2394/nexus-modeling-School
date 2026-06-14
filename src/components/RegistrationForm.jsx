import { useState } from 'react';
import { registerStudent } from '../services/api';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    weight: '',
    height: '',
    sex: '',
    phone: '',
    idNumber: '',
    talent: '',
    language: '',
    course: '',
    courseDuration: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [focusedField, setFocusedField] = useState(null);

  const inputStyle = {
    width: '100%',
    padding: '15px 20px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '15px',
    backgroundColor: focusedField ? '#f8fafc' : '#fff',
    transform: 'scale(1)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    background: loading 
      ? 'linear-gradient(135deg, #94a3b8, #64748b)'
      : 'linear-gradient(135deg, #ec4899, #9333ea)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: loading ? 'scale(0.98)' : 'scale(1)',
    boxShadow: loading 
      ? 'none'
      : '0 4px 15px rgba(236, 72, 153, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '40px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    animation: 'fadeInUp 0.6s ease-out',
  };

  const fileInputStyle = {
    ...inputStyle,
    padding: '12px 20px',
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: profileImage ? '#f0fdf4' : '#fff',
    borderColor: profileImage ? '#22c55e' : '#e2e8f0',
  };

  const successMessageStyle = {
    textAlign: 'center',
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    color: '#16a34a',
    fontWeight: 'bold',
    animation: 'slideDown 0.5s ease-out',
  };

  const errorMessageStyle = {
    textAlign: 'center',
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    color: '#dc2626',
    fontWeight: 'bold',
    animation: 'shake 0.5s ease-out',
  };

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '0',
  };

  const scheduleCardStyle = {
    background: 'linear-gradient(135deg, #fef2f8 0%, #f3e8ff 100%)',
    borderRadius: '16px',
    padding: '15px 20px',
    marginBottom: '15px',
    border: '1px solid #f0d9ff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };

  const scheduleTitleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#7e22ce',
    textAlign: 'center',
    marginBottom: '10px',
    letterSpacing: '0.5px',
  };

  const scheduleGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  };

  const scheduleItemStyle = {
    background: 'white',
    padding: '8px 16px',
    borderRadius: '40px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4c1d95',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  };

  const pricingCardStyle = {
    background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
    borderRadius: '16px',
    padding: '15px 20px',
    marginBottom: '15px',
    border: '1px solid #fde68a',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };

  const pricingTitleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#b45309',
    textAlign: 'center',
    marginBottom: '12px',
    letterSpacing: '0.5px',
  };

  const pricingGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginBottom: '10px',
  };

  const pricingItemStyle = {
    background: 'white',
    padding: '10px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const pricingDurationStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
  };

  const pricingFeeStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ec4899',
    marginTop: '4px',
  };

  const registrationFeeStyle = {
    textAlign: 'center',
    marginTop: '8px',
    padding: '8px',
    background: '#fef2f2',
    borderRadius: '40px',
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#dc2626',
  };

  const cocBadgeStyle = {
    display: 'inline-block',
    background: '#10b981',
    color: 'white',
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '20px',
    marginLeft: '8px',
  };

  const paymentCardStyle = {
    background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    borderRadius: '16px',
    padding: '15px 20px',
    marginBottom: '15px',
    border: '1px solid #7dd3fc',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };

  const paymentTitleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#0369a1',
    textAlign: 'center',
    marginBottom: '12px',
    letterSpacing: '0.5px',
  };

  const paymentGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px',
    marginBottom: '10px',
  };

  const paymentItemStyle = {
    background: 'white',
    padding: '12px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const paymentMethodStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  };

  const paymentNumberStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ec4899',
    fontFamily: 'monospace',
    letterSpacing: '1px',
  };

  const outfitCardStyle = {
    background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '25px',
    border: '1px solid #d8b4fe',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };

  const outfitTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#6b21a5',
    textAlign: 'center',
    marginBottom: '16px',
    letterSpacing: '0.5px',
  };

  const outfitGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  };

  const outfitItemStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };

  const outfitGenderStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ec4899',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const outfitListStyle = {
    textAlign: 'left',
    marginTop: '12px',
    paddingLeft: '20px',
  };

  const outfitItem = {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const shoeImagesStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '20px',
    flexWrap: 'wrap',
  };

  const shoeCardStyle = {
    textAlign: 'center',
    padding: '12px',
    background: 'white',
    borderRadius: '12px',
    width: '150px',
  };

  const shoeEmojiStyle = {
    fontSize: '48px',
    marginBottom: '8px',
  };

  const shoeLabelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4c1d95',
    marginTop: '5px',
  };

  const shoeDescStyle = {
    fontSize: '11px',
    color: '#6b7280',
  };

  const courseOptions = [
    { value: 'High Fashion & Editorial Model', label: '👗 High Fashion & Editorial Model' },
    { value: 'Runway & Catwalk Model', label: '👠 Runway & Catwalk Model' },
    { value: 'Commercial Model', label: '📺 Commercial Model' },
    { value: 'Photo Model', label: '📸 Photo Model' },
    { value: 'Fitness Model', label: '💪 Fitness Model' },
    { value: 'Plus Size & Curve Model', label: '👑 Plus Size & Curve Model' },
    { value: 'Parts Model', label: '🖐️ Parts Model (Hands/Feet/Legs)' },
  ];

  const durationOptions = [
    { value: '6-10 Months', label: '📘 3 Months ' },
    { value: '4-8 Months', label: '📗 6 Months ' },
    { value: '3-6 Months', label: '📙 10 Months ' },
    // { value: '2-4 Months', label: '📕 2-4 Months - Parts Model' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.fullName || !formData.age || !formData.sex || !formData.phone || !formData.idNumber || !formData.course) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields',
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return;
    }

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('age', formData.age);
    data.append('weight', formData.weight || '0');
    data.append('height', formData.height || '0');
    data.append('sex', formData.sex);
    data.append('phone', formData.phone);
    data.append('idNumber', formData.idNumber);
    data.append('talent', formData.talent || 'None');
    data.append('language', formData.language || 'Amharic');
    data.append('course', formData.course);
    data.append('courseDuration', formData.courseDuration || '3-6 Months');

    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    try {
      setLoading(true);
      const response = await registerStudent(data);
      
      console.log('Registration successful:', response);
      
      setMessage({
        type: 'success',
        text: 'Registration Successful! 🎉 We will contact you soon.',
      });

      // Reset form
      setFormData({
        fullName: '',
        age: '',
        weight: '',
        height: '',
        sex: '',
        phone: '',
        idNumber: '',
        talent: '',
        language: '',
        course: '',
        courseDuration: '',
      });
      setProfileImage(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Registration failed. Please try again.',
      });
      
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div style={containerStyle}>
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
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          input:hover, select:hover, textarea:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          
          input:focus, select:focus, textarea:focus {
            border-color: #ec4899;
            box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
            transform: scale(1.01);
          }
          
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
          }
          
          button:active {
            transform: translateY(0);
          }
          
          button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          
          button:active::before {
            width: 300px;
            height: 300px;
          }
          
          input[type="file"]:hover {
            transform: translateY(-2px);
            border-color: #ec4899;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 640px) {
            .row-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '48px' }}>👣</span>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ec4899, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginTop: '10px',
            marginBottom: '5px',
          }}
        >
          Join Nexus Modeling School
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
          Start your journey to become a professional model
        </p>
        <p style={{ color: '#4b5563', fontSize: '12px', fontWeight: '500' }}>
          Nexus 👣 Modeling School & Management
        </p>
      </div>

      {/* Schedule Section */}
      <div style={scheduleCardStyle}>
        <div style={scheduleTitleStyle}>
          📅 የሞዴሊንግ ስልጠና ቀን እና ሰዓት (Training Schedule)
        </div>
        <div style={scheduleGridStyle}>
          <div style={scheduleItemStyle}>
            <span>📆 ማክሰኞ</span> <span>9-11 ሰዓት</span>
          </div>
          <div style={scheduleItemStyle}>
            <span>📆 ሀሙስ</span> <span>9-11 ሰዓት</span>
          </div>
          <div style={scheduleItemStyle}>
            <span>📆 ቅዳሜ</span> <span>4-6 ሰዓት</span>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b21a5', marginTop: '8px' }}>
          ⏰ Tuesday 9-11 AM | Thursday 9-11 AM | Saturday 4-6 PM
        </div>
      </div>

      {/* Outfit Requirements Section */}
      <div style={outfitCardStyle}>
        <div style={outfitTitleStyle}>
          👔 ለሞዴሊንግ ክላስ የሚያስፈልግ አለባበስ (Outfit Requirements for Modeling Class)
        </div>
        <div style={outfitGridStyle}>
          <div style={outfitItemStyle}>
            <div style={outfitGenderStyle}>
              <span>👨</span> Male Model
            </div>
            <ul style={outfitListStyle}>
              <li style={outfitItem}>
                <span>👕</span> Fitted Outfit
              </li>
              <li style={outfitItem}>
                <span>👞</span> Leather Shoes
              </li>
            </ul>
          </div>

          <div style={outfitItemStyle}>
            <div style={outfitGenderStyle}>
              <span>👩</span> Female Model
            </div>
            <ul style={outfitListStyle}>
              <li style={outfitItem}>
                <span>👖</span> Tight Pants / Fitted Pants
              </li>
              <li style={outfitItem}>
                <span>👠</span> Heel Shoes (Black or Nude Color)
              </li>
            </ul>
          </div>
        </div>

        <div style={shoeImagesStyle}>
          <div style={shoeCardStyle}>
            <div style={shoeEmojiStyle}>👞✨</div>
            <div style={shoeLabelStyle}>Men's Leather Shoes</div>
            <div style={shoeDescStyle}>Black/Brown Leather</div>
          </div>

          <div style={shoeCardStyle}>
            <div style={shoeEmojiStyle}>👠🖤</div>
            <div style={shoeLabelStyle}>Black Heel Shoes</div>
            <div style={shoeDescStyle}>Classic Black Pumps</div>
          </div>

          <div style={shoeCardStyle}>
            <div style={shoeEmojiStyle}>👠🤎</div>
            <div style={shoeLabelStyle}>Nude Heel Shoes</div>
            <div style={shoeDescStyle}>Nude Color Pumps</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b21a5', marginTop: '12px' }}>
          ⚡ እባክዎ ለክላስ ሲመጡ በተገቢ አለባበስ ይገኙ | Please come with proper outfit for class
        </div>
      </div>

      {/* Pricing Section */}
      <div style={pricingCardStyle}>
        <div style={pricingTitleStyle}>
          💰 የሞዴሊንግ ኮርስ የጊዜ ቆይታ ከክፍያ ጋር (Course Duration & Fees)
        </div>
        <div style={pricingGridStyle}>
          <div style={pricingItemStyle}>
            <div style={pricingDurationStyle}>📘 3 ወር ኮርስ</div>
            <div style={pricingFeeStyle}>3,000 ብር</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>ወርሃዊ ክፍያ</div>
          </div>
          <div style={pricingItemStyle}>
            <div style={pricingDurationStyle}>📗 6 ወር ኮርስ</div>
            <div style={pricingFeeStyle}>2,500 ብር</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>ወርሃዊ ክፍያ</div>
          </div>
          <div style={pricingItemStyle}>
            <span style={cocBadgeStyle}>✓ COC አለው</span>
            <div style={pricingDurationStyle}>📕 10 ወር ኮርስ</div>
            <div style={pricingFeeStyle}>2,500 ብር</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>ወርሃዊ ክፍያ</div>
          </div>
        </div>
        <div style={registrationFeeStyle}>
          📝 የምዝገባ ክፍያ (Registration Fee): <strong>500 ብር</strong>
        </div>
        <div style={{ textAlign: 'center', fontSize: '10px', color: '#92400e', marginTop: '8px' }}>
          * ክፍያ በወርሃዊ ክፍያ መልክ ይከፈላል | Monthly payment plan available
        </div>
      </div>

      {/* Payment Information Section */}
      <div style={paymentCardStyle}>
        <div style={paymentTitleStyle}>
          💳 የክፍያ መረጃ (Payment Information)
        </div>
        <div style={paymentGridStyle}>
          <div style={paymentItemStyle}>
            <div style={paymentMethodStyle}>🏦 Commercial Bank of Ethiopia (CBE)</div>
            <div style={paymentNumberStyle}>1000391318585</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '5px' }}>
              Account Name: Tadele Balcha
            </div>
          </div>
          <div style={paymentItemStyle}>
            <div style={paymentMethodStyle}>📱 Telebirr</div>
            <div style={paymentNumberStyle}>0922572652</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '5px' }}>
              Merchant Name: Tadele
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#0369a1', marginTop: '8px' }}>
          ⚡ ክፍያ ሲፈጽሙ ስምዎን በማመልከት ደረሰኙን በአመልካች ቅጽ ላይ ያስረክቡ | Please attach payment receipt after transfer
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name 👤"
          required
          value={formData.fullName}
          onChange={(e) => handleInputChange(e, 'fullName')}
          onFocus={() => handleFocus('fullName')}
          onBlur={handleBlur}
          style={inputStyle}
        />

        <div className="row-grid" style={rowStyle}>
          <input
            type="number"
            placeholder="Age 📅"
            required
            value={formData.age}
            onChange={(e) => handleInputChange(e, 'age')}
            onFocus={() => handleFocus('age')}
            onBlur={handleBlur}
            style={inputStyle}
            min="15"
            max="60"
          />
          
          <input
            type="number"
            placeholder="Weight (kg) ⚖️"
            value={formData.weight}
            onChange={(e) => handleInputChange(e, 'weight')}
            onFocus={() => handleFocus('weight')}
            onBlur={handleBlur}
            style={inputStyle}
            step="0.1"
          />
          
          <input
            type="number"
            placeholder="Height (cm) 📏"
            value={formData.height}
            onChange={(e) => handleInputChange(e, 'height')}
            onFocus={() => handleFocus('height')}
            onBlur={handleBlur}
            style={inputStyle}
            step="0.1"
          />
        </div>

        <div className="row-grid" style={rowStyle}>
          <select
            required
            value={formData.sex}
            onChange={(e) => handleInputChange(e, 'sex')}
            onFocus={() => handleFocus('sex')}
            onBlur={handleBlur}
            style={inputStyle}
          >
            <option value="">Select Gender </option>
            <option value="Female">Female 👩</option>
            <option value="Male">Male 👨</option>
          </select>
          
          <input
            type="tel"
            placeholder="Phone Number 📱"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange(e, 'phone')}
            onFocus={() => handleFocus('phone')}
            onBlur={handleBlur}
            style={inputStyle}
          />
        </div>

        <input
          type="text"
          placeholder="ID Number (Passport/National ID) 🆔"
          required
          value={formData.idNumber}
          onChange={(e) => handleInputChange(e, 'idNumber')}
          onFocus={() => handleFocus('idNumber')}
          onBlur={handleBlur}
          style={inputStyle}
        />

        <div className="row-grid" style={rowStyle}>
          <select
            value={formData.talent}
            onChange={(e) => handleInputChange(e, 'talent')}
            onFocus={() => handleFocus('talent')}
            onBlur={handleBlur}
            style={inputStyle}
          >
            <option value="">Select Your Talent ⭐</option>
            <option value="Catwalk">Catwalk/Runway 👠</option>
            <option value="Photography">Photography Pose 📸</option>
            <option value="Acting">Acting 🎭</option>
            <option value="Dancing">Dancing 💃</option>
            <option value="Singing">Singing 🎤</option>
            <option value="Fitness">Fitness 💪</option>
            <option value="None - Willing to Learn">None - Willing to Learn 🌱</option>
          </select>
          
          <select
            value={formData.language}
            onChange={(e) => handleInputChange(e, 'language')}
            onFocus={() => handleFocus('language')}
            onBlur={handleBlur}
            style={inputStyle}
          >
            <option value="">Select Language 🗣️</option>
            <option value="Amharic">Amharic 🇪🇹</option>
            <option value="English">English 🇬🇧</option>
            <option value="Oromo">Oromo 🗣️</option>
            <option value="Tigrigna">Tigrigna 🗣️</option>
            <option value="Both Amharic & English">Both Amharic & English</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <select
          required
          value={formData.course}
          onChange={(e) => handleInputChange(e, 'course')}
          onFocus={() => handleFocus('course')}
          onBlur={handleBlur}
          style={inputStyle}
        >
          <option value="">Select Modeling Course 📚</option>
          {courseOptions.map((course) => (
            <option key={course.value} value={course.value}>
              {course.label}
            </option>
          ))}
        </select>

        <select
          required
          value={formData.courseDuration}
          onChange={(e) => handleInputChange(e, 'courseDuration')}
          onFocus={() => handleFocus('courseDuration')}
          onBlur={handleBlur}
          style={inputStyle}
        >
          <option value="">Select Course Duration ⏰</option>
          {durationOptions.map((duration) => (
            <option key={duration.value} value={duration.value}>
              {duration.label}
            </option>
          ))}
        </select>

        <div style={{ position: 'relative', marginBottom: '15px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            style={fileInputStyle}
          />
          {profileImage && (
            <div
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
                animation: 'pulse 0.5s ease-out',
              }}
            >
              ✅
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={buttonStyle}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                border: '2px solid white',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}></span>
              Submitting Application...
            </span>
          ) : (
            '✨ Submit Application ✨'
          )}
        </button>

        {message.text && (
          <div style={message.type === 'success' ? successMessageStyle : errorMessageStyle}>
            {message.text}
          </div>
        )}
      </form>
      
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#64748b',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span>📞 +251940848080</span>
          <span>📸 Profile Photo Required</span>
          <span>🎓 Limited Seats Available</span>
        </div>
        <p style={{ marginTop: '10px' }}>
          ⚡ Join Nexus Modeling School - Where Dreams Meet the Runway
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;