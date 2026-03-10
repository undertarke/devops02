import React from "react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <React.Fragment>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container ">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Dịch vụ</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className=" item">Dịch vụ</span>
          </div>
        </div>
      </section>

      <section id="about-us" className="py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter-info text-center">
                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                  <span className="counter-prefix">+</span>
                  <h5
                    className="timer display-4 fw-bold m-0"
                    data-to="5120"
                    data-speed="8000"
                  >
                    5120
                  </h5>
                </div>
                <p className="counter-description">Bệnh nhân hài lòng</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter-info text-center">
                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                  <span className="counter-prefix">+</span>
                  <h5
                    className="timer display-4 fw-bold m-0"
                    data-to="25"
                    data-speed="8000"
                  >
                    25
                  </h5>
                </div>
                <p className="counter-description">Năm kinh nghiệm</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter-info text-center">
                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                  <h5
                    className="timer display-4 fw-bold m-0"
                    data-to="45"
                    data-speed="8000"
                  >
                    45
                  </h5>
                </div>
                <p className="counter-description">Bác sĩ chuyên khoa</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter-info text-center">
                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                  <h5
                    className="timer display-4 fw-bold m-0"
                    data-to="30"
                    data-speed="8000"
                  >
                    30
                  </h5>
                </div>
                <p className="counter-description">Chuyên khoa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="our-services"
        className="padding-large"
        style={{
          background: `url(/images/services-bg.jpg) no-repeat`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="display-header text-center position-relative">
            <h2 className="display-2 fw-bold text-white">
              Dịch vụ của chúng tôi
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card-item p-4 my-4">
                <div className="card-icon">
                  <svg className="home-thermometer" width="50" height="50">
                    <use href="#home-thermometer"></use>
                  </svg>
                </div>
                <h4 className="card-title fw-bold py-3">Khám tổng quát</h4>
                <p className="card-paragraph">
                  Khám sức khỏe tổng quát, hay còn gọi là khám sức khỏe định kỳ,
                  là một phần cơ bản của việc chăm sóc sức khỏe dự phòng.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card-item p-4 my-4">
                <div className="card-icon">
                  <svg className="pregnant-woman" width="50" height="50">
                    <use href="#pregnant-woman"></use>
                  </svg>
                </div>
                <h4 className="card-title fw-bold py-3">Phụ khoa</h4>
                <p className="card-paragraph">
                  Đây là chuyên khoa y tế chăm sóc sức khỏe hệ sinh sản của phụ
                  nữ, bao gồm chẩn đoán và điều trị các bệnh lý.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card-item p-4 my-4">
                <div className="card-icon">
                  <svg className="nutrition" width="50" height="50">
                    <use href="#nutrition"></use>
                  </svg>
                </div>
                <h4 className="card-title fw-bold py-3">Dinh dưỡng</h4>
                <p className="card-paragraph">
                  Dinh dưỡng là ngành khoa học nghiên cứu về ảnh hưởng của thực
                  phẩm và đồ uống đến cơ thể, tập trung vào các chất dinh dưỡng
                  cần thiết để hỗ trợ sức khỏe con người.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card-item p-4 my-4">
                <div className="card-icon">
                  <svg className="local-pharmacy" width="50" height="50">
                    <use href="#local-pharmacy"></use>
                  </svg>
                </div>
                <h4 className="card-title fw-bold py-3">Nhà thuốc</h4>
                <p className="card-paragraph">
                  Nhà thuốc là một cơ sở y tế được cấp phép để lưu trữ, cấp phát
                  và bán các loại thuốc theo toa và không theo toa.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card-item p-4 my-4">
                <div className="card-icon">
                  <svg className="calendar" width="50" height="50">
                    <use href="#calendar"></use>
                  </svg>
                </div>
                <h4 className="card-title fw-bold py-3">Đặt lịch hẹn</h4>
                <p className="card-paragraph">
                  Bạn có thể đặt lịch hẹn bằng cách gọi điện cho chúng tôi hoặc
                  đặt trực tiếp từ trang web của chúng tôi một cách dễ dàng.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card-item p-4 my-4">
                <div className="card-icon">
                  <svg className="clock" width="50" height="50">
                    <use href="#clock"></use>
                  </svg>
                </div>
                <h4 className="card-title fw-bold py-3">Giờ mở cửa</h4>
                <p className="card-paragraph">
                  Phòng khám của chúng tôi mở cửa 24/7. Vì vậy chúng tôi có thể
                  giúp đỡ mọi bệnh nhân. Các bác sĩ của chúng tôi luôn sẵn sàng
                  phục vụ bệnh nhân.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ServicesPage;
