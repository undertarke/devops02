import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="footer-menu">
              <img 
                src="/images/main-logo.png" 
                alt="logo" 
                className="footer-logo mb-4" 
                height="50"
              />
              <p className="footer-description mb-4">
                Chúng tôi tận tâm mang đến dịch vụ chăm sóc sức khỏe toàn diện
                và chất lượng cao cho mọi bệnh nhân.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="footer-menu">
              <h5 className="footer-title mb-4">Liên kết nhanh</h5>
              <div className="row">
                <div className="col-6">
                  <ul className="quick-links list-unstyled">
                    <li className="mb-2">
                      <Link to="/" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Trang chủ
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/about" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Giới thiệu
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/services" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Dịch vụ
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/booking" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Đặt lịch hẹn
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/review" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Đánh giá
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="quick-links list-unstyled">
                    <li className="mb-2">
                      <Link to="/team" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Đội ngũ
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/faq" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Câu hỏi thường gặp
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/departments" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Chuyên khoa
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/blog" className="text-decoration-none">
                        <i className="fas fa-chevron-right me-2 small"></i>
                        Tin tức
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="footer-menu">
              <h5 className="footer-title mb-4">Giờ mở cửa</h5>
              <div className="opening-hours">
                <div className="time-slot d-flex justify-content-between align-items-center mb-3">
                  <span className="day">Thứ Hai - Thứ Năm</span>
                  <span className="hours text-primary">8:00 - 18:00</span>
                </div>
                <div className="time-slot d-flex justify-content-between align-items-center mb-3">
                  <span className="day">Thứ Sáu - Thứ Bảy</span>
                  <span className="hours text-primary">10:00 - 16:00</span>
                </div>
                <div className="time-slot d-flex justify-content-between align-items-center mb-3">
                  <span className="day">Chủ Nhật</span>
                  <span className="hours text-primary">Chỉ nhận cấp cứu</span>
                </div>
                <div className="time-slot d-flex justify-content-between align-items-center">
                  <span className="day">Khám cá nhân</span>
                  <span className="hours text-primary">19:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
