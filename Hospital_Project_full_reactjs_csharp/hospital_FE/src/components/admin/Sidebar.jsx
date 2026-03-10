import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { 
    FaTachometerAlt, 
    FaUsers, 
    FaPills, 
    FaSignOutAlt,
    FaProcedures,
    FaUserMd,
    FaCalendarAlt,
    FaUserInjured,
    FaFileMedicalAlt,
    FaListOl,
    FaChevronDown,
    FaChevronRight,
    FaStethoscope,
    FaFlask,
    FaVial,
    FaClipboardCheck,
    FaDollarSign,
    FaNewspaper,
    FaBars
} from 'react-icons/fa';
import './AdminStyles.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [open, setOpen] = useState({
    staff: false,
    clinical: false,
    pharmacy: false,
    services: false,
    payments: false,
    content: false
  });

  const staffRoutes = ["/admin/users", "/admin/doctors", "/admin/doctor-schedules"];
  const clinicalRoutes = ["/admin/patients", "/admin/appointments", "/admin/waiting-list", "/admin/medical-records"];
  const pharmacyRoutes = ["/admin/medicines", "/admin/prescriptions", "/admin/suppliers"];
  const servicesRoutes = ["/admin/medical-services", "/admin/lab-tests", "/admin/test-requests", "/admin/test-results"];
  const paymentRoutes = ["/admin/prescription-payments", "/admin/lab-test-payments", "/admin/service-payments"];
  const contentRoutes = ["/admin/blogs"];

  useEffect(() => {
    setOpen({
      staff: staffRoutes.some(route => location.pathname.startsWith(route)),
      clinical: clinicalRoutes.some(route => location.pathname.startsWith(route)),
      pharmacy: pharmacyRoutes.some(route => location.pathname.startsWith(route)),
      services: servicesRoutes.some(route => location.pathname.startsWith(route)),
      payments: paymentRoutes.some(route => location.pathname.startsWith(route)),
      content: contentRoutes.some(route => location.pathname.startsWith(route))
    });
  }, [location.pathname]);

  const toggleMenu = (menu) => {
    setOpen(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const renderArrowIcon = (menuName) => {
    return open[menuName] ? <FaChevronDown className="arrow-icon" /> : <FaChevronRight className="arrow-icon" />;
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="admin-sidebar-header">
        <Link to="/admin">
          <img src="/images/main-logo.png" alt="logo" className="admin-sidebar-logo" />
          <h3 className="admin-sidebar-title">Hospital Admin</h3>
        </Link>
      </div>
      <nav className="admin-menu">
        <ul className="admin-menu-list">
          {/* Dashboard */}
          <li>
            <NavLink to="/admin" end className="admin-menu-link">
              <FaTachometerAlt className="admin-menu-icon" />
              <span className="admin-menu-text">Tổng quan</span>
            </NavLink>
          </li>

          {/* Nhân viên & Bác sĩ */}
          <li>
            <div className="admin-menu-link" onClick={() => toggleMenu('staff')} aria-expanded={open.staff}>
              <FaUsers className="admin-menu-icon" />
              <span className="admin-menu-text">Nhân viên & Bác sĩ</span>
              {renderArrowIcon('staff')}
            </div>
            <Collapse in={open.staff}>
              <ul className="admin-submenu">
                <li><NavLink to="/admin/users" className="admin-menu-link sub-link">Quản lý người dùng</NavLink></li>
                <li><NavLink to="/admin/doctors" className="admin-menu-link sub-link">Quản lý bác sĩ</NavLink></li>
                <li><NavLink to="/admin/doctor-schedules" className="admin-menu-link sub-link">Lịch làm việc bác sĩ</NavLink></li>
              </ul>
            </Collapse>
          </li>
          
          {/* Bệnh nhân & Khám bệnh */}
          <li>
            <div className="admin-menu-link" onClick={() => toggleMenu('clinical')} aria-expanded={open.clinical}>
              <FaUserInjured className="admin-menu-icon" />
              <span className="admin-menu-text">Bệnh nhân & Khám bệnh</span>
              {renderArrowIcon('clinical')}
            </div>
            <Collapse in={open.clinical}>
              <ul className="admin-submenu">
                <li><NavLink to="/admin/patients" className="admin-menu-link sub-link">Quản lý bệnh nhân</NavLink></li>
                <li><NavLink to="/admin/appointments" className="admin-menu-link sub-link">Quản lý lịch hẹn</NavLink></li>
                <li><NavLink to="/admin/waiting-list" className="admin-menu-link sub-link">Danh sách chờ khám</NavLink></li>
                <li><NavLink to="/admin/medical-records" className="admin-menu-link sub-link">Hồ sơ bệnh án</NavLink></li>
              </ul>
            </Collapse>
          </li>

          {/* Dịch vụ & Xét nghiệm */}
          <li>
            <div className="admin-menu-link" onClick={() => toggleMenu('services')} aria-expanded={open.services}>
              <FaStethoscope className="admin-menu-icon" />
              <span className="admin-menu-text">Dịch vụ & Xét nghiệm</span>
              {renderArrowIcon('services')}
            </div>
            <Collapse in={open.services}>
              <ul className="admin-submenu">
                <li><NavLink to="/admin/medical-services" className="admin-menu-link sub-link">Dịch vụ y tế</NavLink></li>
                <li><NavLink to="/admin/lab-tests" className="admin-menu-link sub-link">Danh mục xét nghiệm</NavLink></li>
                <li><NavLink to="/admin/test-requests" className="admin-menu-link sub-link">Yêu cầu xét nghiệm</NavLink></li>
                <li><NavLink to="/admin/test-results" className="admin-menu-link sub-link">Kết quả xét nghiệm</NavLink></li>
              </ul>
            </Collapse>
          </li>

          {/* Nhà thuốc */}
          <li>
             <div className="admin-menu-link" onClick={() => toggleMenu('pharmacy')} aria-expanded={open.pharmacy}>
              <FaPills className="admin-menu-icon" />
              <span className="admin-menu-text">Nhà thuốc</span>
              {renderArrowIcon('pharmacy')}
            </div>
            <Collapse in={open.pharmacy}>
               <ul className="admin-submenu">
                <li><NavLink to="/admin/medicines" className="admin-menu-link sub-link">Quản lý thuốc</NavLink></li>
                <li><NavLink to="/admin/prescriptions" className="admin-menu-link sub-link">Quản lý đơn thuốc</NavLink></li>
                <li><NavLink to="/admin/suppliers" className="admin-menu-link sub-link">Quản lý nhà cung cấp</NavLink></li>
              </ul>
            </Collapse>
          </li>

          {/* Thanh toán */}
          <li>
             <div className="admin-menu-link" onClick={() => toggleMenu('payments')} aria-expanded={open.payments}>
              <FaDollarSign className="admin-menu-icon" />
              <span className="admin-menu-text">Thanh toán</span>
              {renderArrowIcon('payments')}
            </div>
            <Collapse in={open.payments}>
               <ul className="admin-submenu">
                <li><NavLink to="/admin/service-payments" className="admin-menu-link sub-link">Thanh toán dịch vụ</NavLink></li>
                <li><NavLink to="/admin/prescription-payments" className="admin-menu-link sub-link">Thanh toán đơn thuốc</NavLink></li>
                <li><NavLink to="/admin/lab-test-payments" className="admin-menu-link sub-link">Thanh toán xét nghiệm</NavLink></li>
              </ul>
            </Collapse>
          </li>

          {/* Quản lý nội dung */}
          <li>
            <div className="admin-menu-link" onClick={() => toggleMenu('content')} aria-expanded={open.content}>
              <FaNewspaper className="admin-menu-icon" />
              <span className="admin-menu-text">Nội dung</span>
              {renderArrowIcon('content')}
            </div>
            <Collapse in={open.content}>
              <ul className="admin-submenu">
                <li><NavLink to="/admin/blogs" className="admin-menu-link sub-link">Quản lý bài viết</NavLink></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
      
      <div className="admin-sidebar-footer">
        <ul className="admin-menu-list">
            <li>
                <NavLink to="/" className="admin-menu-link">
                    <FaSignOutAlt className="admin-menu-icon" />
                    <span className="admin-menu-text">Về trang chủ</span>
                </NavLink>
            </li>
        </ul>
        <div className="admin-footer-text">
            © {new Date().getFullYear()} Hospital Project.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;