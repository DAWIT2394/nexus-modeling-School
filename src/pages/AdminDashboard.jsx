import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  getStatistics, 
  getStudents, 
  updateStudentStatus, 
  updateStudent,
  deleteStudent 
} from '../services/api';
import { 
  FaUsers, FaChartPie, FaCheckCircle, FaUserClock,
  FaSyncAlt, FaSignOutAlt, FaSearch, 
  FaRegBell, FaRegQuestionCircle, FaUserPlus, FaChevronDown, FaBalanceScale,
  FaCamera
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const [selectedDetailStudent, setSelectedDetailStudent] = useState(null);

  // Edit Student Form State
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({
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
    studentType: '',
    status: ''
  });
  const [editPhotoFile, setEditPhotoFile] = useState(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // Fetch stats and student lists
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const response = await getStatistics();
      if (response.data && response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error loading analytics');
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchStudentList = async () => {
    setLoading(true);
    try {
      const response = await getStudents();
      if (response.data && response.data.success) {
        setStudents(response.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error loading student directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchStats();
    fetchStudentList();
  }, [navigate]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchStudentList()]);
    setRefreshing(false);
    toast.success('Data synchronized');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateStudentStatus(id, newStatus);
      if (response.data && response.data.success) {
        toast.success(`Status updated to ${newStatus}`);
        fetchStudentList();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete student record?')) return;
    try {
      const response = await deleteStudent(id);
      if (response.data && response.data.success) {
        toast.success('Record deleted');
        fetchStudentList();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete student');
    }
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setEditForm({
      fullName: student.fullName || '',
      age: student.age || '',
      weight: student.weight || '',
      height: student.height || '',
      sex: student.sex || 'Female',
      phone: student.phone || '',
      idNumber: student.idNumber || '',
      talent: student.talent || 'Catwalk',
      language: student.language || 'Amharic',
      course: student.course || 'High Fashion & Editorial Model',
      courseDuration: student.courseDuration || '6-10 Months',
      studentType: student.studentType || 'new',
      status: student.status || 'pending'
    });
    setEditPhotoPreview(student.profileImage || '');
    setEditPhotoFile(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPhotoFile(file);
      setEditPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const data = new FormData();
      data.append('fullName', editForm.fullName);
      data.append('age', editForm.age);
      data.append('weight', editForm.weight);
      data.append('height', editForm.height);
      data.append('sex', editForm.sex);
      data.append('phone', editForm.phone);
      data.append('idNumber', editForm.idNumber);
      data.append('talent', editForm.talent);
      data.append('language', editForm.language);
      data.append('course', editForm.course);
      data.append('courseDuration', editForm.courseDuration);
      data.append('studentType', editForm.studentType);
      data.append('status', editForm.status);
      
      if (editPhotoFile) {
        data.append('profileImage', editPhotoFile);
      }

      const response = await updateStudent(editingStudent._id, data);
      if (response.data && response.data.success) {
        toast.success('Student record updated successfully');
        setEditingStudent(null);
        fetchStudentList();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update student profile');
    } finally {
      setEditLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  // Filter logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.phone?.includes(searchQuery) ||
                          student.idNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = courseFilter === 'All' || student.course === courseFilter;
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    const matchesType = typeFilter === 'All' || student.studentType === typeFilter;

    return matchesSearch && matchesCourse && matchesStatus && matchesType;
  });

  // Unique lists for filters
  const uniqueCourses = ['All', ...new Set(students.map(s => s.course).filter(Boolean))];
  const uniqueStatuses = ['All', 'pending', 'approved', 'rejected'];
  const uniqueTypes = ['All', 'new', 'returning', 'graduated', 'experts', 'conducted'];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    sidebar: {
      width: '260px',
      background: 'white',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
    },
    logoSection: {
      padding: '24px',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    logoBox: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: '#4f46e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    logoTitle: {
      fontSize: '18px',
      fontWeight: '900',
      color: '#0f172a',
      margin: 0,
      letterSpacing: '-0.025em',
    },
    logoSub: {
      fontSize: '11px',
      color: '#94a3b8',
      margin: 0,
      fontWeight: '500',
    },
    nav: {
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    navItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      border: 'none',
      background: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
      color: isActive ? '#4f46e5' : '#64748b',
      fontWeight: '600',
      fontSize: '14px',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s',
      borderLeft: isActive ? '4px solid #4f46e5' : '4px solid transparent',
      paddingLeft: isActive ? '12px' : '16px',
    }),
    sidebarFooter: {
      padding: '16px',
      borderTop: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      background: 'rgba(248, 250, 252, 0.5)',
    },
    newTermBtn: {
      width: '100%',
      padding: '12px',
      background: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
    },
    signOutBtn: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px',
      background: 'transparent',
      color: '#94a3b8',
      border: 'none',
      fontWeight: '600',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflowY: 'auto',
    },
    header: {
      height: '64px',
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: '#f1f5f9',
      borderRadius: '9999px',
      padding: '8px 16px',
      width: '320px',
    },
    searchInput: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      width: '100%',
      fontSize: '13px',
      fontWeight: '600',
      color: '#1e293b',
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    registerBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: '13px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
    },
    iconBtn: {
      background: 'transparent',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      padding: '6px',
      fontSize: '18px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#e0e7ff',
      border: '1px solid #c7d2fe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#4f46e5',
    },
    contentArea: {
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    headingTitle: {
      fontSize: '24px',
      fontWeight: '900',
      color: '#0f172a',
      margin: 0,
      letterSpacing: '-0.025em',
    },
    headingSub: {
      fontSize: '13px',
      color: '#64748b',
      margin: '4px 0 0 0',
      fontWeight: '600',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '24px',
    },
    statCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    },
    statHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    statLabel: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      margin: 0,
    },
    statValue: {
      fontSize: '36px',
      fontWeight: '900',
      color: '#0f172a',
      margin: '8px 0 0 0',
      letterSpacing: '-0.03em',
    },
    statIconBox: (color) => ({
      padding: '10px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      background: color === 'indigo' ? '#e0e7ff' : color === 'amber' ? '#fef3c7' : color === 'emerald' ? '#d1fae5' : '#f1f5f9',
      color: color === 'indigo' ? '#4f46e5' : color === 'amber' ? '#d97706' : color === 'emerald' ? '#059669' : '#475569',
    }),
    statSubtext: (color) => ({
      fontSize: '12px',
      fontWeight: '700',
      marginTop: '16px',
      color: color === 'indigo' ? '#4f46e5' : color === 'amber' ? '#d97706' : color === 'emerald' ? '#059669' : '#64748b',
    }),
    chartsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
    },
    chartCard: {
      background: 'white',
      borderRadius: '20px',
      border: '1px solid #f1f5f9',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    },
    chartTitle: {
      fontSize: '14px',
      fontWeight: '900',
      color: '#0f172a',
      margin: '0 0 16px 0',
    },
    gaugeContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: '16px 0',
    },
    gaugeCenter: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gaugeText: {
      fontSize: '24px',
      fontWeight: '900',
      color: '#0f172a',
    },
    gaugeLabel: {
      fontSize: '10px',
      fontWeight: '800',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginTop: '2px',
    },
    legendContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '16px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      fontWeight: '700',
    },
    legendDot: (color) => ({
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: color,
    }),
    barChartContainer: {
      display: 'flex',
      alignItems: 'end',
      justifyContent: 'space-between',
      height: '144px',
      borderBottom: '1px solid #f1f5f9',
      paddingBottom: '8px',
      gap: '12px',
    },
    barWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    barValue: {
      fontSize: '10px',
      fontWeight: '900',
      color: '#4f46e5',
      marginBottom: '4px',
      position: 'absolute',
      top: '-18px',
    },
    bar: (isActive, heightPct) => ({
      width: '24px',
      borderRadius: '6px 6px 0 0',
      background: isActive ? '#4f46e5' : '#f1f5f9',
      height: `${heightPct}%`,
      transition: 'height 1s ease-out',
    }),
    barLabelsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '12px',
    },
    barLabel: {
      flex: 1,
      fontSize: '9px',
      fontWeight: '800',
      color: '#94a3b8',
      textTransform: 'uppercase',
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    progressBarsCard: {
      background: 'white',
      borderRadius: '20px',
      border: '1px solid #f1f5f9',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    },
    progressRow: {
      marginBottom: '16px',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      fontWeight: '700',
      marginBottom: '6px',
    },
    progressBg: {
      width: '100%',
      background: '#f1f5f9',
      height: '10px',
      borderRadius: '9999px',
      overflow: 'hidden',
    },
    progressFill: (pct) => ({
      height: '100%',
      background: '#4f46e5',
      borderRadius: '9999px',
      width: `${pct}%`,
      transition: 'width 1s ease-out',
    }),
    footer: {
      textAlign: 'center',
      fontSize: '10px',
      color: '#94a3b8',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      padding: '16px 0',
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
    },
    filterCard: {
      background: 'white',
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
    },
    filterLabel: {
      fontSize: '10px',
      fontWeight: '800',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    filterSelect: {
      width: '100%',
      border: 'none',
      background: 'transparent',
      outline: 'none',
      fontSize: '13px',
      fontWeight: '800',
      color: '#1e293b',
      marginTop: '8px',
      cursor: 'pointer',
      paddingRight: '24px',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
    },
    chevronIcon: {
      position: 'absolute',
      right: '16px',
      bottom: '20px',
      color: '#94a3b8',
      pointerEvents: 'none',
      fontSize: '11px',
    },
    tableContainer: {
      background: 'white',
      borderRadius: '20px',
      border: '1px solid #f1f5f9',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
    },
    th: {
      background: '#f8fafc',
      padding: '16px',
      fontSize: '10px',
      fontWeight: '800',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: '1px solid #f1f5f9',
    },
    td: {
      padding: '16px',
      fontSize: '12px',
      color: '#334155',
      borderBottom: '1px solid #f1f5f9',
    },
    avatarCircle: (bgColor) => ({
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '800',
      fontSize: '10px',
      color: 'white',
      background: bgColor,
    }),
    badge: (type) => {
      const colors = {
        new: { bg: '#e0e7ff', text: '#4338ca' },
        returning: { bg: '#f3e8ff', text: '#7e22ce' },
        graduated: { bg: '#d1fae5', text: '#065f46' },
        experts: { bg: '#fee2e2', text: '#991b1b' },
        conducted: { bg: '#f1f5f9', text: '#475569' }
      };
      const theme = colors[type] || colors.new;
      return {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '9px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: theme.bg,
        color: theme.text,
      };
    },
    selectStatus: (status) => {
      const isApproved = status === 'approved';
      const isRejected = status === 'rejected';
      return {
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: '900',
        textTransform: 'uppercase',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        background: isApproved ? '#d1fae5' : isRejected ? '#fee2e2' : '#fef3c7',
        color: isApproved ? '#065f46' : isRejected ? '#991b1b' : '#92400e',
      };
    },
    actionBtn: {
      padding: '6px 12px',
      background: '#e2e8f0',
      color: '#475569',
      border: 'none',
      borderRadius: '8px',
      fontSize: '11px',
      fontWeight: '700',
      cursor: 'pointer',
      marginRight: '6px',
    },
    deleteBtn: {
      padding: '6px 12px',
      background: '#fee2e2',
      color: '#b91c1c',
      border: 'none',
      borderRadius: '8px',
      fontSize: '11px',
      fontWeight: '700',
      cursor: 'pointer',
    },
    syncRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
    },
    syncBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      background: '#0f172a',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: '12px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
    },

    // Edit Profile Modal Overlay Styles (Matching screenshot)
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      overflowY: 'auto',
    },
    modalContainer: {
      background: 'white',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      width: '100%',
      maxWidth: '1000px',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '90vh',
      overflow: 'hidden',
    },
    modalHeader: {
      padding: '24px 32px',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalGrid: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      overflowY: 'auto',
      flex: 1,
    },
    modalLeftPanel: {
      borderRight: '1px solid #f1f5f9',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fafbfd',
      overflowY: 'auto',
    },
    modalRightPanel: {
      padding: '32px',
      overflowY: 'auto',
    },
    photoContainer: {
      position: 'relative',
      width: '144px',
      height: '144px',
      borderRadius: '50%',
      marginBottom: '16px',
    },
    profileImageEdit: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid white',
      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    },
    photoEditBtn: {
      position: 'absolute',
      bottom: '4px',
      right: '4px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#4f46e5',
      color: 'white',
      border: '2px solid white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(79, 70, 229, 0.3)',
    },
    modalSectionTitle: {
      fontSize: '16px',
      fontWeight: '900',
      color: '#0f172a',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    editInputGroup: {
      marginBottom: '20px',
    },
    editInputLabel: {
      display: 'block',
      fontSize: '10px',
      fontWeight: '800',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '8px',
    },
    editInput: {
      width: '100%',
      padding: '12px 16px',
      border: '1.5px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: '600',
      outline: 'none',
      color: '#1e293b',
      boxSizing: 'border-box',
    },
    editRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
    },
    modalCancelBtn: {
      padding: '10px 20px',
      border: '1.5px solid #e2e8f0',
      background: 'white',
      color: '#64748b',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: '700',
      cursor: 'pointer',
    },
    modalSaveBtn: {
      padding: '10px 20px',
      background: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          button:active {
            transform: translateY(0);
          }
          select {
            appearance: none;
          }
        `}
      </style>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logoSection}>
            <div style={styles.logoBox}>E</div>
            <div>
              <h2 style={styles.logoTitle}>EduAcademy</h2>
              <p style={styles.logoSub}>Admin Portal</p>
            </div>
          </div>

          <nav style={styles.nav}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={styles.navItem(activeTab === 'dashboard')}
            >
              <FaChartPie style={{ fontSize: '16px' }} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              style={styles.navItem(activeTab === 'students')}
            >
              <FaUsers style={{ fontSize: '16px' }} />
              <span>Students</span>
            </button>

            {/* <button
              onClick={() => toast.success('Courses tab coming soon')}
              style={styles.navItem(false)}
            > */}
              {/* <FaBookOpen style={{ fontSize: '16px' }} />
              <span>Courses</span>
            </button>

            <button
              onClick={() => toast.success('Reports tab coming soon')}
              style={styles.navItem(false)}
            >
              <FaFileAlt style={{ fontSize: '16px' }} />
              <span>Reports</span>
            </button>

            <button
              onClick={() => toast.success('Settings tab coming soon')}
              style={styles.navItem(false)}
            >
              <FaCog style={{ fontSize: '16px' }} />
              <span>Settings</span>
            </button> */}
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <button
            onClick={() => navigate('/register')}
            style={styles.newTermBtn}
          >
            + New Term
          </button>
          
          <button
            onClick={handleLogout}
            style={styles.signOutBtn}
          >
            <FaSignOutAlt style={{ fontSize: '14px' }} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.searchContainer}>
            <FaSearch style={{ color: '#94a3b8', fontSize: '14px' }} />
            <input
              type="text"
              placeholder="Search analytics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.headerActions}>
            <button 
              onClick={() => navigate('/register')}
              style={styles.registerBtn}
            >
              <FaUserPlus />
              <span>Register Student</span>
            </button>
            <button style={styles.iconBtn}>
              <FaRegBell />
            </button>
            <button style={styles.iconBtn}>
              <FaRegQuestionCircle />
            </button>
            <div style={styles.avatar}>A</div>
          </div>
        </header>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div style={styles.contentArea}>
            {statsLoading ? (
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8', fontWeight: 'bold' }}>
                Loading Analytics...
              </div>
            ) : stats ? (
              <>
                {/* 4 Stat Cards */}
                <div style={styles.statsGrid}>
                  <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                      <div>
                        <p style={styles.statLabel}>Total Students</p>
                        <h3 style={styles.statValue}>{stats.totalStudents || 0}</h3>
                      </div>
                      <div style={styles.statIconBox('indigo')}>
                        <FaUsers />
                      </div>
                    </div>
                    <p style={styles.statSubtext('indigo')}>+1 this week</p>
                  </div>

                  <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                      <div>
                        <p style={styles.statLabel}>Pending Students</p>
                        <h3 style={styles.statValue}>{stats.statusDistribution?.pending || 0}</h3>
                      </div>
                      <div style={styles.statIconBox('amber')}>
                        <FaUserClock />
                      </div>
                    </div>
                    <p style={styles.statSubtext('amber')}>100% current</p>
                  </div>

                  <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                      <div>
                        <p style={styles.statLabel}>Approved Students</p>
                        <h3 style={styles.statValue}>{stats.statusDistribution?.approved || 0}</h3>
                      </div>
                      <div style={styles.statIconBox('emerald')}>
                        <FaCheckCircle />
                      </div>
                    </div>
                    <p style={styles.statSubtext('emerald')}>0 pending action</p>
                  </div>

                  <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                      <div>
                        <p style={styles.statLabel}>Male/Female Ratio</p>
                        <h3 style={styles.statValue}>
                          {stats.genderDistribution?.male || 0}:{stats.genderDistribution?.female || 0}
                        </h3>
                      </div>
                      <div style={styles.statIconBox('slate')}>
                        <FaBalanceScale />
                      </div>
                    </div>
                    <p style={styles.statSubtext('slate')}>Balanced ratio</p>
                  </div>
                </div>

                {/* Gauge Charts & Bar Chart */}
                <div style={styles.chartsRow}>
                  {/* Gender Gauge */}
                  <div style={styles.chartCard}>
                    <h4 style={styles.chartTitle}>Gender Distribution</h4>
                    <div style={styles.gaugeContainer}>
                      <svg width="144" height="144" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="72" cy="72" r="62" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                        <circle 
                          cx="72" cy="72" r="62" stroke="#4f46e5" strokeWidth="12" fill="transparent" 
                          strokeDasharray={2 * Math.PI * 62}
                          strokeDashoffset={
                            stats.totalStudents > 0 
                              ? (2 * Math.PI * 62) * (1 - (stats.genderDistribution?.male / stats.totalStudents))
                              : 2 * Math.PI * 62
                          }
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1s ease' }}
                        />
                      </svg>
                      <div style={styles.gaugeCenter}>
                        <span style={styles.gaugeText}>
                          {stats.totalStudents > 0 ? Math.round((stats.genderDistribution?.male / stats.totalStudents) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                    <div style={styles.legendContainer}>
                      <div style={styles.legendItem}>
                        <span style={styles.legendDot('#4f46e5')} />
                        <span style={{ color: '#4338ca' }}>Male ({stats.genderDistribution?.male || 0})</span>
                      </div>
                      <div style={styles.legendItem}>
                        <span style={styles.legendDot('#cbd5e1')} />
                        <span style={{ color: '#94a3b8' }}>Female ({stats.genderDistribution?.female || 0})</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Gauge */}
                  <div style={styles.chartCard}>
                    <h4 style={styles.chartTitle}>Status Distribution</h4>
                    <div style={styles.gaugeContainer}>
                      <svg width="144" height="144" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="72" cy="72" r="62" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                        <circle 
                          cx="72" cy="72" r="62" stroke="#475569" strokeWidth="12" fill="transparent" 
                          strokeDasharray={2 * Math.PI * 62}
                          strokeDashoffset={
                            stats.totalStudents > 0 
                              ? (2 * Math.PI * 62) * (1 - (stats.statusDistribution?.pending / stats.totalStudents))
                              : 2 * Math.PI * 62
                          }
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1s ease' }}
                        />
                      </svg>
                      <div style={styles.gaugeCenter}>
                        <span style={styles.gaugeText}>{stats.statusDistribution?.pending || 0}</span>
                        <span style={styles.gaugeLabel}>Pending</span>
                      </div>
                    </div>
                    <div style={styles.legendContainer}>
                      <div style={styles.legendItem}>
                        <span style={styles.legendDot('#475569')} />
                        <span style={{ color: '#334155' }}>Pending ({stats.statusDistribution?.pending || 0})</span>
                      </div>
                      <div style={styles.legendItem}>
                        <span style={styles.legendDot('#cbd5e1')} />
                        <span style={{ color: '#94a3b8' }}>Approved ({stats.statusDistribution?.approved || 0})</span>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Bar Chart */}
                  <div style={styles.chartCard}>
                    <h4 style={styles.chartTitle}>Student Type</h4>
                    <div>
                      <div style={styles.barChartContainer}>
                        {['new', 'returning', 'graduated', 'experts', 'conducted'].map((typeKey) => {
                          const count = stats.studentType?.[typeKey] || 0;
                          const maxCount = Math.max(...Object.values(stats.studentType || {}), 1);
                          const percentHeight = Math.max((count / maxCount) * 100, 4);

                          return (
                            <div key={typeKey} style={styles.barWrapper}>
                              {count > 0 && <span style={styles.barValue}>{count}</span>}
                              <div style={styles.bar(count > 0, percentHeight)} />
                            </div>
                          );
                        })}
                      </div>
                      <div style={styles.barLabelsRow}>
                        <span style={styles.barLabel}>New</span>
                        <span style={styles.barLabel}>Returning</span>
                        <span style={styles.barLabel}>Graduated</span>
                        <span style={styles.barLabel}>Experts</span>
                        <span style={styles.barLabel}>Conducted</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course distribution list */}
                <div style={styles.progressBarsCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#0f172a' }}>Course Distribution</h4>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Enrollments</span>
                  </div>

                  {stats.courseDistribution && stats.courseDistribution.length > 0 ? (
                    <div>
                      {stats.courseDistribution.map((courseItem, index) => {
                        const total = stats.totalStudents || 1;
                        const pct = Math.round((courseItem.count / total) * 100);

                        return (
                          <div key={index} style={styles.progressRow}>
                            <div style={styles.progressHeader}>
                              <span style={{ color: '#0f172a' }}>{courseItem.course}</span>
                              <span style={{ color: '#4f46e5' }}>{courseItem.count} {courseItem.count === 1 ? 'Student' : 'Students'}</span>
                            </div>
                            <div style={styles.progressBg}>
                              <div style={styles.progressFill(pct)} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px', padding: '12px 0' }}>
                      No active courses distribution stats.
                    </div>
                  )}
                </div>

                <footer style={styles.footer}>
                  © 2024 EduAcademy Systems • Academic Excellence Through Data
                </footer>
              </>
            ) : null}
          </div>
        )}

        {/* Tab 2: Students Directory */}
        {activeTab === 'students' && (
          <div style={styles.contentArea}>
            <div>
              <h1 style={styles.headingTitle}>Student Directory</h1>
              <p style={styles.headingSub}>Manage and track enrollment status for the current academic session.</p>
            </div>

            {/* Filters */}
            <div style={styles.filtersGrid}>
              <div style={styles.filterCard}>
                <label style={styles.filterLabel}>Course Focus</label>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  style={styles.filterSelect}
                >
                  {uniqueCourses.map((c, i) => (
                    <option key={i} value={c}>{c === 'All' ? 'All Courses' : c}</option>
                  ))}
                </select>
                <FaChevronDown style={styles.chevronIcon} />
              </div>

              <div style={styles.filterCard}>
                <label style={styles.filterLabel}>Enrollment Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={styles.filterSelect}
                >
                  {uniqueStatuses.map((s, i) => (
                    <option key={i} value={s}>{s === 'All' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <FaChevronDown style={styles.chevronIcon} />
              </div>

              <div style={styles.filterCard}>
                <label style={styles.filterLabel}>Student Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={styles.filterSelect}
                >
                  {uniqueTypes.map((t, i) => (
                    <option key={i} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
                <FaChevronDown style={styles.chevronIcon} />
              </div>

              <div style={{ ...styles.filterCard, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label style={styles.filterLabel}>Total Records</label>
                  <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>{filteredStudents.length}</h3>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#4f46e5' }}>
                  <FaUserPlus style={{ margin: 'auto' }} />
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div style={styles.tableContainer}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8', fontWeight: 'bold' }}>
                  Loading Student List...
                </div>
              ) : filteredStudents.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Full Name</th>
                        <th style={styles.th}>Age</th>
                        <th style={styles.th}>Sex</th>
                        <th style={styles.th}>Phone</th>
                        <th style={styles.th}>Course</th>
                        <th style={styles.th}>Student Type</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => {
                        const initials = student.fullName ? student.fullName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'JD';
                        const avatarColor = getAvatarColorClass(student.fullName);

                        return (
                          <tr key={student._id}>
                            <td style={{ ...styles.td, display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {student.profileImage ? (
                                <img 
                                  src={student.profileImage} 
                                  alt={student.fullName} 
                                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              ) : (
                                <div style={styles.avatarCircle(avatarColor)}>
                                  {initials}
                                </div>
                              )}
                              <div>
                                <p style={{ margin: 0, fontWeight: '800', color: '#0f172a' }}>{student.fullName}</p>
                                <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>{student.idNumber}</p>
                              </div>
                            </td>
                            <td style={{ ...styles.td, fontWeight: '700' }}>{student.age}</td>
                            <td style={styles.td}>{student.sex}</td>
                            <td style={{ ...styles.td, fontFamily: 'monospace', color: '#64748b' }}>{student.phone}</td>
                            <td style={{ ...styles.td, color: '#4f46e5', fontWeight: '800' }}>{student.course}</td>
                            <td style={styles.td}>
                              <span style={styles.badge(student.studentType)}>
                                {student.studentType || 'New'}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <select
                                value={student.status}
                                onChange={(e) => handleStatusChange(student._id, e.target.value)}
                                style={styles.selectStatus(student.status)}
                              >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                            <td style={styles.td}>
                              <button
                                onClick={() => setSelectedDetailStudent(student)}
                                style={{ ...styles.actionBtn, background: '#e0f2fe', color: '#0369a1' }}
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleOpenEdit(student)}
                                style={styles.actionBtn}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(student._id)}
                                style={styles.deleteBtn}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8', fontWeight: 'bold' }}>
                  No student records match your filters.
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div style={styles.syncRow}>
              <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', uppercase: true, letterSpacing: '0.05em', margin: 0 }}>
                Showing 1 - {filteredStudents.length} of {filteredStudents.length} entries
              </p>
              
              <button
                onClick={handleRefresh}
                style={styles.syncBtn}
              >
                <FaSyncAlt className={refreshing ? 'animate-spin' : ''} />
                <span>Sync Student Records</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Student Modal Overlay - Matching "Update Student Profile" mockup */}
      {editingStudent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>Update Student Profile</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                  Review and edit the academic records for {editForm.fullName}.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setEditingStudent(null)} 
                  style={styles.modalCancelBtn}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit} 
                  disabled={editLoading}
                  style={styles.modalSaveBtn}
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            <div style={styles.modalGrid}>
              
              {/* Left Panel: Profile Photo & Key Metadata */}
              <div style={styles.modalLeftPanel}>
                <div style={styles.photoContainer}>
                  <img 
                    src={editPhotoPreview || 'https://via.placeholder.com/150'} 
                    alt="Preview" 
                    style={styles.profileImageEdit} 
                  />
                  <label htmlFor="edit-photo-file" style={styles.photoEditBtn}>
                    <FaCamera size={12} />
                  </label>
                  <input 
                    type="file" 
                    id="edit-photo-file" 
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }} 
                  />
                </div>

                <h3 style={{ margin: '12px 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                  {editForm.fullName || 'Student Name'}
                </h3>
                <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>
                  Student ID: {editingStudent.idNumber || '#N/A'}
                </p>

                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  <span style={{ ...styles.badge(editForm.studentType), textTransform: 'capitalize' }}>
                    {editForm.studentType} Enrollment
                  </span>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '9999px', 
                    fontSize: '9px', 
                    fontWeight: '900', 
                    background: '#f1f5f9', 
                    color: '#475569',
                    textTransform: 'capitalize'
                  }}>
                    {editForm.status}
                  </span>
                </div>

                {/* Contact Info Block */}
                <div style={{ width: '100%', marginTop: '32px', background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', boxSizing: 'border-box' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '900', color: '#0f172a' }}>Contact Info</h4>
                  
                  <div style={styles.editInputGroup}>
                    <label style={styles.editInputLabel}>Phone Number</label>
                    <input 
                      type="text" 
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      style={styles.editInput}
                    />
                  </div>

                  <div style={{ ...styles.editInputGroup, marginBottom: 0 }}>
                    <label style={styles.editInputLabel}>ID Number</label>
                    <input 
                      type="text" 
                      value={editForm.idNumber}
                      onChange={(e) => setEditForm({ ...editForm, idNumber: e.target.value })}
                      style={styles.editInput}
                    />
                  </div>
                </div>
              </div>

              {/* Right Panel: Full Edit Form Fields */}
              <div style={styles.modalRightPanel}>
                
                {/* Section 1: Personal Information */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={styles.modalSectionTitle}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '12px' }}>👤</span>
                    <span>Personal Information</span>
                  </h3>

                  <div style={styles.editInputGroup}>
                    <label style={styles.editInputLabel}>Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      style={styles.editInput}
                    />
                  </div>

                  <div style={styles.editRow}>
                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Age</label>
                      <input 
                        type="number" 
                        value={editForm.age}
                        onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                        style={styles.editInput}
                      />
                    </div>
                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Sex</label>
                      <select 
                        value={editForm.sex}
                        onChange={(e) => setEditForm({ ...editForm, sex: e.target.value })}
                        style={{ ...styles.editInput, WebkitAppearance: 'listbox' }}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.editRow}>
                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Weight (kg)</label>
                      <input 
                        type="number" 
                        value={editForm.weight}
                        onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                        style={styles.editInput}
                      />
                    </div>
                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Height (cm)</label>
                      <input 
                        type="number" 
                        value={editForm.height}
                        onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                        style={styles.editInput}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Academic & Modeling Selection */}
                <div>
                  <h3 style={styles.modalSectionTitle}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '12px' }}>🎓</span>
                    <span>Academic Selection</span>
                  </h3>

                  <div style={styles.editRow}>
                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Assigned Course</label>
                      <select 
                        value={editForm.course}
                        onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                        style={{ ...styles.editInput, WebkitAppearance: 'listbox' }}
                      >
                        <option value="High Fashion & Editorial Model">High Fashion & Editorial Model</option>
                        <option value="Runway & Catwalk Model">Runway & Catwalk Model</option>
                        <option value="Commercial Model">Commercial Model</option>
                        <option value="Photo Model">Photo Model</option>
                        <option value="Fitness Model">Fitness Model</option>
                        <option value="Plus Size & Curve Model">Plus Size & Curve Model</option>
                        <option value="Parts Model">Parts Model</option>
                      </select>
                    </div>

                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Course Duration</label>
                      <select 
                        value={editForm.courseDuration}
                        onChange={(e) => setEditForm({ ...editForm, courseDuration: e.target.value })}
                        style={{ ...styles.editInput, WebkitAppearance: 'listbox' }}
                      >
                        <option value="6-10 Months">6-10 Months</option>
                        <option value="4-8 Months">4-8 Months</option>
                        <option value="3-6 Months">3-6 Months</option>
                        <option value="2-4 Months">2-4 Months</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.editRow}>
                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Primary Talent</label>
                      <select 
                        value={editForm.talent}
                        onChange={(e) => setEditForm({ ...editForm, talent: e.target.value })}
                        style={{ ...styles.editInput, WebkitAppearance: 'listbox' }}
                      >
                        <option value="Catwalk">Catwalk</option>
                        <option value="Photography">Photography</option>
                        <option value="Acting">Acting</option>
                        <option value="Dancing">Dancing</option>
                        <option value="Singing">Singing</option>
                        <option value="Fitness">Fitness</option>
                        <option value="None - Willing to Learn">None - Willing to Learn</option>
                      </select>
                    </div>

                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Language Preference</label>
                      <select 
                        value={editForm.language}
                        onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
                        style={{ ...styles.editInput, WebkitAppearance: 'listbox' }}
                      >
                        <option value="Amharic">Amharic</option>
                        <option value="English">English</option>
                        <option value="Oromo">Oromo</option>
                        <option value="Tigrigna">Tigrigna</option>
                        <option value="Both Amharic & English">Both Amharic & English</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.editRow}>
                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Student Type</label>
                      <select 
                        value={editForm.studentType}
                        onChange={(e) => setEditForm({ ...editForm, studentType: e.target.value })}
                        style={{ ...styles.editInput, WebkitAppearance: 'listbox' }}
                      >
                        <option value="new">New</option>
                        <option value="returning">Returning</option>
                        <option value="graduated">Graduated</option>
                        <option value="experts">Experts</option>
                        <option value="conducted">Conducted</option>
                      </select>
                    </div>

                    <div style={styles.editInputGroup}>
                      <label style={styles.editInputLabel}>Review Status</label>
                      <select 
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        style={{ ...styles.editInput, WebkitAppearance: 'listbox' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
      {selectedDetailStudent && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContainer, maxWidth: '600px' }}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>Student Detail Profile</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                  Complete academic and personal record.
                </p>
              </div>
              <button 
                onClick={() => setSelectedDetailStudent(null)} 
                style={styles.modalCancelBtn}
              >
                Close
              </button>
            </div>
            
            <div style={{ padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
              <img 
                src={selectedDetailStudent.profileImage || 'https://via.placeholder.com/150'} 
                alt="Student Profile" 
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
              />
              
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{selectedDetailStudent.fullName}</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>ID: {selectedDetailStudent.idNumber}</p>
              </div>

              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9', boxSizing: 'border-box' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Age</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.age} Years</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gender</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.sex}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Height</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.height} cm</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weight</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.weight} kg</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.phone}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student Type</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b', textTransform: 'capitalize' }}>{selectedDetailStudent.studentType}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course Focus</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#4f46e5' }}>{selectedDetailStudent.course}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course Duration</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.courseDuration}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Talent</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.talent}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Language</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{selectedDetailStudent.language}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enrollment Status</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#1e293b', textTransform: 'capitalize' }}>{selectedDetailStudent.status}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Registration Fee</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#10b981' }}>{selectedDetailStudent.registrationFee} ETB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Simple avatar color selection helper
const getAvatarColorClass = (name = '') => {
  const colors = [
    '#4f46e5',
    '#334155',
    '#0ea5e9',
    '#7c3aed',
    '#db2777'
  ];
  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

export default AdminDashboard;