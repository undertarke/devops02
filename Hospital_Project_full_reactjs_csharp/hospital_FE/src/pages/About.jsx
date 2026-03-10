import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserMd, FaHospital, FaAward, FaHandHoldingMedical } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section bg-primary-100 py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Về Chúng Tôi</h1>
              <p className="lead mb-4">
                Bệnh viện Đa khoa Betael là một trong những bệnh viện tư nhân hàng đầu tại Việt Nam, 
                cung cấp dịch vụ chăm sóc sức khỏe toàn diện và chất lượng cao.
              </p>
              <div className="d-flex gap-4">
                <div className="text-center">
                  <h2 className="display-5 fw-bold text-primary">20+</h2>
                  <p className="text-muted">Năm Kinh Nghiệm</p>
                </div>
                <div className="text-center">
                  <h2 className="display-5 fw-bold text-primary">50+</h2>
                  <p className="text-muted">Bác Sĩ Chuyên Khoa</p>
                </div>
                <div className="text-center">
                  <h2 className="display-5 fw-bold text-primary">10k+</h2>
                  <p className="text-muted">Bệnh Nhân Hài Lòng</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="/images/about-hero.jpg" 
                alt="Bệnh viện Betael" 
                className="img-fluid rounded-4 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Tại sao chọn Betael?</h2>
          <Row className="g-4">
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white rounded-4 shadow-sm h-100">
                <FaUserMd className="text-primary mb-3" size={40} />
                <h4>Đội Ngũ Chuyên Môn</h4>
                <p>Bác sĩ giàu kinh nghiệm, được đào tạo tại các trường y khoa hàng đầu</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white rounded-4 shadow-sm h-100">
                <FaHospital className="text-primary mb-3" size={40} />
                <h4>Cơ Sở Vật Chất</h4>
                <p>Trang thiết bị hiện đại, đạt tiêu chuẩn quốc tế</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white rounded-4 shadow-sm h-100">
                <FaAward className="text-primary mb-3" size={40} />
                <h4>Chất Lượng Cao</h4>
                <p>Đạt chứng nhận JCI và nhiều giải thưởng y tế uy tín</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card text-center p-4 bg-white rounded-4 shadow-sm h-100">
                <FaHandHoldingMedical className="text-primary mb-3" size={40} />
                <h4>Chăm Sóc Tận Tâm</h4>
                <p>Đặt sự hài lòng của bệnh nhân lên hàng đầu</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <img 
                src="/images/mission.jpg" 
                alt="Sứ mệnh của chúng tôi" 
                className="img-fluid rounded-4 shadow"
              />
            </Col>
            <Col lg={6} className="ps-lg-5">
              <h2 className="mb-4">Sứ Mệnh & Tầm Nhìn</h2>
              <div className="mb-4">
                <h5 className="text-primary">Sứ mệnh</h5>
                <p>
                  Mang đến dịch vụ chăm sóc sức khỏe chất lượng cao, 
                  an toàn và hiệu quả cho mọi người dân. Chúng tôi cam kết 
                  không ngừng nâng cao chất lượng dịch vụ và áp dụng những 
                  tiến bộ y học mới nhất.
                </p>
              </div>
              <div>
                <h5 className="text-primary">Tầm nhìn</h5>
                <p>
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
      <section className="values-section py-5">
        <Container>
          <h2 className="text-center mb-5">Giá Trị Cốt Lõi</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="value-card p-4 bg-white rounded-4 shadow-sm h-100">
                <h4 className="text-primary">Chuyên Nghiệp</h4>
                <p>
                  Đội ngũ y bác sĩ và nhân viên được đào tạo bài bản, 
                  làm việc theo quy trình chuẩn quốc tế, đảm bảo an toàn 
                  và hiệu quả cao nhất cho người bệnh.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card p-4 bg-white rounded-4 shadow-sm h-100">
                <h4 className="text-primary">Tận Tâm</h4>
                <p>
                  Lấy người bệnh làm trung tâm, mọi hoạt động đều hướng đến 
                  mục tiêu mang lại sự hài lòng và trải nghiệm tốt nhất cho 
                  người bệnh và gia đình.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card p-4 bg-white rounded-4 shadow-sm h-100">
                <h4 className="text-primary">Đổi Mới</h4>
                <p>
                  Không ngừng cập nhật và áp dụng những tiến bộ y học mới nhất, 
                  đầu tư trang thiết bị hiện đại để nâng cao chất lượng điều trị.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="mb-4">Đặt Lịch Khám Ngay</h2>
          <p className="lead mb-4">
            Để được tư vấn và đặt lịch khám với bác sĩ chuyên khoa, 
            vui lòng liên hệ với chúng tôi
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/booking" className="btn btn-light btn-lg">
              Đặt Lịch Khám
            </a>
            <a href="/contact" className="btn btn-outline-light btn-lg">
              Liên Hệ
            </a>
          </div>
        </Container>
      </section>

      <style jsx>{`
        .about-page {
          overflow-x: hidden;
        }
        .hero-section {
          background-color: #f8f9fa;
        }
        .feature-card, .value-card {
          transition: transform 0.3s ease;
        }
        .feature-card:hover, .value-card:hover {
          transform: translateY(-5px);
        }
        .text-primary {
          color: #0d6efd !important;
        }
        .bg-primary {
          background-color: #0d6efd !important;
        }
        .rounded-4 {
          border-radius: 1rem;
        }
        .shadow-sm {
          box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default About;