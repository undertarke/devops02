import React from "react";
import { Link } from "react-router-dom";

const PricingPage = () => {
  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Bảng giá</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className=" item">Bảng giá</span>
          </div>
        </div>
      </section>

      <section id="price" className="my-5">
        <div className="container py-5">
          <h2 className=" fw-bold display-4 mb-5">Các gói dịch vụ</h2>

          <div className="row py-4">
            <div className="col-md-6 col-lg-3 pb-4">
              <div className="py-5 plan-post text-center">
                <h6 className="mb-3">Tiêu chuẩn</h6>

                <h2 className="heading-color display-5 fw-bold mb-5">
                  1.425.000 VNĐ
                </h2>
                <div className="price-option">
                  <p>
                    <span className="price-tick">✓</span> Khám tổng quát
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Xét nghiệm máu
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Tư vấn sức khỏe
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Đo điện tâm đồ
                  </p>
                </div>

                <Link
                  to="/booking"
                  className="btn btn-primary mt-3 px-4 py-3 mx-2 "
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 pb-4">
              <div className="py-5 plan-post recommend-price text-center">
                <h6 className="text-white mb-3">Cơ bản</h6>

                <h2 className="text-white display-5 fw-bold mb-5">
                  1.990.000 VNĐ
                </h2>
                <div className="price-option">
                  <p className="text-white">
                    <span className="price-tick text-white">✓</span> Khám tổng
                    quát
                  </p>
                  <p className="text-white">
                    <span className="price-tick text-white">✓</span> Xét nghiệm
                    máu
                  </p>
                  <p className="text-white">
                    <span className="price-tick text-white">✓</span> Tư vấn sức
                    khỏe
                  </p>
                  <p className="text-white">
                    <span className="price-tick text-white">✓</span> Siêu âm ổ
                    bụng
                  </p>
                  <p className="text-white">
                    <span className="price-tick text-white">✓</span> Đo điện tâm
                    đồ
                  </p>
                </div>

                <Link
                  to="/booking"
                  className="btn btn-primary text-black mt-3 px-4 py-3 mx-2"
                  style={{ background: "white" }}
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 pb-4">
              <div className="py-5 plan-post text-center">
                <h6 className="mb-3">Nâng cao</h6>

                <h2 className="heading-color display-5 fw-bold mb-5">
                  2.585.000 VNĐ
                </h2>
                <div className="price-option">
                  <p>
                    <span className="price-tick">✓</span> Khám tổng quát
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Xét nghiệm máu
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Tư vấn sức khỏe
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Đo điện tâm đồ
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Siêu âm ổ bụng
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Chụp X-quang
                  </p>
                </div>

                <Link
                  to="/booking"
                  className="btn btn-primary mt-3 px-4 py-3 mx-2 "
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 pb-4">
              <div className="py-5 plan-post text-center">
                <h6 className="mb-3">Toàn diện</h6>

                <h2 className="heading-color display-5 fw-bold mb-5">
                  4.765.000 VNĐ
                </h2>
                <div className="price-option">
                  <p>
                    <span className="price-tick">✓</span> Khám tổng quát
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Xét nghiệm máu
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Tư vấn sức khỏe
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Đo điện tâm đồ
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Siêu âm ổ bụng
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Chụp X-quang
                  </p>
                  <p>
                    <span className="price-tick">✓</span> Nội soi dạ dày
                  </p>
                </div>

                <Link
                  to="/booking"
                  className="btn btn-primary mt-3 px-4 py-3 mx-2 "
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="padding-large pt-0">
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
                    data-to="26"
                    data-speed="8000"
                  >
                    26
                  </h5>
                </div>
                <p className="counter-description">Tổng số chi nhánh</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter-info text-center">
                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                  <span className="counter-prefix">+</span>
                  <h5
                    className="timer display-4 fw-bold m-0"
                    data-to="53"
                    data-speed="8000"
                  >
                    53
                  </h5>
                </div>
                <p className="counter-description">Bác sĩ chuyên khoa</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter-info text-center">
                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                  <span className="counter-prefix">+</span>
                  <h5
                    className="timer display-4 fw-bold m-0"
                    data-to="10"
                    data-speed="8000"
                  >
                    10
                  </h5>
                </div>
                <p className="counter-description">Năm kinh nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="our-services"
        style={{
          backgroundImage: "url(images/services-bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="display-header text-light d-flex flex-wrap justify-content-between padding-medium">
              <div className="col-lg-5 col-md-6 col-sm-12">
                <h2 className="text-light">
                  Dịch vụ tốt nhất cho sức khỏe của bạn
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="text-light">
                  Chúng tôi cung cấp các dịch vụ y tế chất lượng cao, giúp bạn
                  giải quyết các vấn đề sức khỏe một cách hiệu quả và an toàn.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box p-4 bg-light border-radius-10 text-center">
                <div className="icon-box-icon">
                  <svg
                    className="home-thermometer mt-3 primary-color-500"
                    width="50"
                    height="50"
                  >
                    <use xlinkHref="#home-thermometer" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Bác sĩ đa khoa</h3>
                  <p>
                    Đội ngũ bác sĩ giàu kinh nghiệm luôn sẵn sàng chăm sóc sức
                    khỏe cho bạn.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box p-4 bg-light border-radius-10 text-center">
                <div className="icon-box-icon">
                  <svg
                    className="pregnant-woman mt-3 primary-color-500"
                    width="50"
                    height="50"
                  >
                    <use xlinkHref="#pregnant-woman" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Hỗ trợ thai sản</h3>
                  <p>
                    Đội ngũ bác sĩ giàu kinh nghiệm luôn sẵn sàng chăm sóc sức
                    khỏe cho bạn.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box p-4 bg-light border-radius-10 text-center">
                <div className="icon-box-icon">
                  <svg
                    className="nutrition mt-3 primary-color-500"
                    width="50"
                    height="50"
                  >
                    <use xlinkHref="#nutrition" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Tư vấn dinh dưỡng</h3>
                  <p>
                    Đội ngũ bác sĩ giàu kinh nghiệm luôn sẵn sàng chăm sóc sức
                    khỏe cho bạn.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 pb-3">
              <div className="icon-box p-4 bg-light border-radius-10 text-center">
                <div className="icon-box-icon">
                  <svg
                    className="local-pharmacy mt-3 primary-color-500"
                    width="50"
                    height="50"
                  >
                    <use xlinkHref="#local-pharmacy" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Chăm sóc dược phẩm</h3>
                  <p>
                    Đội ngũ bác sĩ giàu kinh nghiệm luôn sẵn sàng chăm sóc sức
                    khỏe cho bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="book-appointment" className="padding-large mb-0">
        <div className="container">
          <div className="row">
            <div className="display-header">
              <h2 className="display-5 fw-bold text-dark">
                Đặt lịch hẹn hoặc gọi:{" "}
                <span className="text-primary-500">(028) 3865 1234</span>
              </h2>
            </div>
            <form className="contact-form d-flex flex-wrap mt-5 gx-1">
              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                <select
                  className="form-select focus-transparent border border-radius-10 ps-4"
                  aria-invalid="false"
                  name="choose"
                >
                  <option value="Select Your Department">
                    Chọn chuyên khoa
                  </option>
                  <option value="Department">Khoa Vật lý trị liệu</option>
                  <option value="Department">Khoa Răng hàm mặt</option>
                  <option value="Department">Khoa Tai mũi họng</option>
                  <option value="Department">Khoa Dược</option>
                  <option value="Department">Khoa Điều dưỡng</option>
                </select>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                <select
                  className="form-select focus-transparent border ps-4 border-radius-10"
                  aria-invalid="false"
                  name="choose"
                >
                  <option value="Select Your Doctor">Chọn bác sĩ</option>
                  <option value="Naidan Smith">Nguyễn Văn An</option>
                  <option value="Danial Frankie">Trần Thị Bích</option>
                  <option value="Jason Roy">Lê Hoàng Cường</option>
                </select>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  className="border ps-4 border-radius-10"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Số điện thoại"
                  className="border ps-4 border-radius-10"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                <div className="input-group date" id="datepicker">
                  <input
                    type="date"
                    id="start"
                    name="appointment"
                    placeholder="Chọn ngày"
                    className="bg-transparent ps-4 border border-radius-10 position-relative"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                <div className="input-group time" id="timepicker">
                  <input
                    type="time"
                    id="start"
                    name="appointment"
                    className="bg-transparent ps-4 border border-radius-10 position-relative"
                  />
                </div>
              </div>
            </form>
          </div>
          <a
            href="/booking"
            className="btn btn-medium btn-primary btn-pill mt-3 text-uppercase"
          >
            Đặt lịch hẹn
          </a>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
