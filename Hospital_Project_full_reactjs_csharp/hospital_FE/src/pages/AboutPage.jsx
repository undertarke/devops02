import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserMd, FaHospital, FaAward, FaHandHoldingMedical, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4 text-dark">Về Chúng Tôi</h1>
              <p className="lead mb-4 text-secondary">
                Bệnh viện Đa khoa là một trong những bệnh viện tư nhân hàng đầu tại Việt Nam, 
                cung cấp dịch vụ chăm sóc sức khỏe toàn diện và chất lượng cao.
              </p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="d-flex gap-4 justify-content-center">
                <div className="text-center">
                  <h2 className="display-5 fw-bold text-primary-500">20+</h2>
                  <p className="text-cadet-blue">Năm Kinh Nghiệm</p>
                </div>
                <div className="text-center">
                  <h2 className="display-5 fw-bold text-primary-500">50+</h2>
                  <p className="text-cadet-blue">Bác Sĩ Chuyên Khoa</p>
                </div>
                <div className="text-center">
                  <h2 className="display-5 fw-bold text-primary-500">10k+</h2>
                  <p className="text-cadet-blue">Bệnh Nhân Hài Lòng</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="/images/post-item3.jpg" 
                alt="Bệnh viện" 
                className="img-fluid border-radius-10"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-primary-100">
        <Container>
          <h2 className="text-center mb-5 text-dark">Tại sao chọn Chúng tôi?</h2>
          <Row className="g-4">
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white border-radius-10 h-100">
                <FaUserMd className="text-primary-500 mb-3" size={40} />
                <h4 className="text-dark">Đội Ngũ Chuyên Môn</h4>
                <p className="text-cadet-blue">Bác sĩ giàu kinh nghiệm, được đào tạo tại các trường y khoa hàng đầu</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white border-radius-10 h-100">
                <FaHospital className="text-primary-500 mb-3" size={40} />
                <h4 className="text-dark">Cơ Sở Vật Chất</h4>
                <p className="text-cadet-blue">Trang thiết bị hiện đại, đạt tiêu chuẩn quốc tế</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white border-radius-10 h-100">
                <FaAward className="text-primary-500 mb-3" size={40} />
                <h4 className="text-dark">Chất Lượng Cao</h4>
                <p className="text-cadet-blue">Đạt chứng nhận JCI và nhiều giải thưởng y tế uy tín</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white border-radius-10 h-100">
                <FaHandHoldingMedical className="text-primary-500 mb-3" size={40} />
                <h4 className="text-dark">Chăm Sóc Tận Tâm</h4>
                <p className="text-cadet-blue">Đặt sự hài lòng của bệnh nhân lên hàng đầu</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <img 
                src="/images/post-item2.jpg" 
                alt="Sứ mệnh của chúng tôi" 
                className="img-fluid border-radius-10"
              />
            </Col>
            <Col lg={6} className="ps-lg-5">
              <h2 className="mb-4 text-dark">Sứ Mệnh & Tầm Nhìn</h2>
              <div className="mb-4">
                <h5 className="text-primary-500">Sứ mệnh</h5>
                <p className="text-cadet-blue">
                  Mang đến dịch vụ chăm sóc sức khỏe chất lượng cao, 
                  an toàn và hiệu quả cho mọi người dân. Chúng tôi cam kết 
                  không ngừng nâng cao chất lượng dịch vụ và áp dụng những 
                  tiến bộ y học mới nhất.
                </p>
              </div>
              <div>
                <h5 className="text-primary-500">Tầm nhìn</h5>
                <p className="text-cadet-blue">
                  Trở thành bệnh viện tư nhân hàng đầu Việt Nam, 
                  ngang tầm với các bệnh viện quốc tế trong khu vực. 
                  Xây dựng môi trường y tế chuyên nghiệp, hiện đại và 
                  thân thiện.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 bg-primary-100">
        <Container>
          <h2 className="text-center mb-5 text-dark">Giá Trị Cốt Lõi</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="value-card p-4 bg-white border-radius-10 h-100">
                <h4 className="text-primary-500">Chuyên Nghiệp</h4>
                <p className="text-cadet-blue">
                  Đội ngũ y bác sĩ và nhân viên được đào tạo bài bản, 
                  làm việc theo quy trình chuẩn quốc tế, đảm bảo an toàn 
                  và hiệu quả cao nhất cho người bệnh.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card p-4 bg-white border-radius-10 h-100">
                <h4 className="text-primary-500">Tận Tâm</h4>
                <p className="text-cadet-blue">
                  Lấy người bệnh làm trung tâm, mọi hoạt động đều hướng đến 
                  mục tiêu mang lại sự hài lòng và trải nghiệm tốt nhất cho 
                  người bệnh và gia đình.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card p-4 bg-white border-radius-10 h-100">
                <h4 className="text-primary-500">Đổi Mới</h4>
                <p className="text-cadet-blue">
                  Không ngừng cập nhật và áp dụng những tiến bộ y học mới nhất, 
                  đầu tư trang thiết bị hiện đại để nâng cao chất lượng điều trị.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      <style jsx>{`
        .about-page {
          overflow-x: hidden;
        }
        .feature-card, .value-card {
          transition: transform 0.3s ease;
        }
        .feature-card:hover, .value-card:hover {
          transform: translateY(-5px);
        }
        .text-primary-500 {
          color: var(--primary-500) !important;
        }
        .bg-primary-500 {
          background-color: var(--primary-500) !important;
        }
        .bg-primary-100 {
          background-color: var(--primary-100) !important;
        }
        .text-cadet-blue {
          color: var(--cadet-blue) !important;
        }
        .border-radius-10 {
          border-radius: 10px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .btn-pill {
          border-radius: 50px;
          padding: 15px 35px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .btn-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .cta-wrapper {
          background-image: linear-gradient(45deg, var(--primary-500), #2563eb);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .cta-section {
          background-color: var(--primary-100);
        }
      `}</style>
    </div>
  );
};

export default AboutPage;