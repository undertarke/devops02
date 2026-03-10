import React, { useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SubscribeSection from "../components/SubscribeSection";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  const [activeTab, setActiveTab] = useState("laboratory");
  return (
    <>
      <section id="intro" className="position-relative overflow-hidden">
        <div className="banner">
          <img
            src="/images/banner-image.jpg"
            alt="banner"
            className="img-fluid"
          />
          <div className="container">
            <div className="banner-content position-absolute padding-large">
              <span className="sub-heading bg-light py-2 px-4 mb-4 border-radius-30 text-uppercase d-inline-block text-cadet-blue fw-medium">
                <svg
                  className="heart primary-color me-2"
                  width="20"
                  height="20"
                >
                  <use href="#heart" />
                </svg>
                Sống Cuộc Sống Của Bạn
              </span>
              <h1 className="display-3 fw-bold text-dark">
                Chúng Tôi Quan Tâm Đến Sức Khỏe Của Bạn
              </h1>
              <p className="mt-3 mb-4">
                Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất
                với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại. Sức
                khỏe của bạn là ưu tiên hàng đầu của chúng tôi.
              </p>
              <Link
                to="/contact"
                className="btn btn-medium btn-primary btn-pill text-uppercase"
              >
                Liên Hệ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="padding-large">
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
                </div>{" "}
                <p className="counter-description">Bệnh Nhân Hài Lòng</p>
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
                <p className="counter-description">Tổng Chi Nhánh</p>
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
                <p className="counter-description">Bác Sĩ Giàu Kinh Nghiệm</p>
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
                <p className="counter-description">Năm Kinh Nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="our-services"
        style={{
          backgroundImage: "url(/images/services-bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="display-header text-light d-flex flex-wrap justify-content-between padding-medium">
              <div className="col-lg-5 col-md-6 col-sm-12">
                <h2 className="text-light">
                  Dịch Vụ Tốt Nhất Cho Giải Pháp Của Bạn
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="text-light">
                  Chúng tôi cung cấp các dịch vụ y tế chất lượng cao với đội ngũ
                  chuyên gia giàu kinh nghiệm. Cam kết mang đến sự chăm sóc tốt
                  nhất cho sức khỏe của bạn và gia đình.
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
                    <use href="#home-thermometer" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Bác Sĩ Đa Khoa</h3>
                  <p>
                    Đội ngũ bác sĩ giàu kinh nghiệm với chuyên môn cao, tận tâm
                    chăm sóc sức khỏe toàn diện.
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
                    <use href="#pregnant-woman" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Hỗ Trợ Thai Kỳ</h3>
                  <p>
                    Chăm sóc toàn diện cho mẹ và bé suốt quá trình mang thai đến
                    sinh nở an toàn.
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
                    <use href="#nutrition" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Tư Vấn Dinh Dưỡng</h3>
                  <p>
                    Lời khuyên chuyên nghiệp về dinh dưỡng để duy trì sức khỏe
                    tối ưu cho từng độ tuổi.
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
                    <use href="#local-pharmacy" />
                  </svg>
                </div>
                <div className="icon-box-content">
                  <h3 className="card-title py-2">Chăm Sóc Dược Phẩm</h3>
                  <p>
                    Tư vấn và cung cấp thuốc an toàn, hiệu quả từ các dược sĩ
                    chuyên nghiệp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="testimonial"
        style={{
          backgroundImage: "url(/images/review-bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          height: "595px",
        }}
      >
        <div className="container">
          <div className="row align-items-center padding-medium">
            <div className="col-lg-5 col-md-4">
              <div className="image-holder">
                <img
                  src="/images/review-image.png"
                  alt="review"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-8">
              <div className="review-content">
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="testimonial-swiper"
                >
                  <SwiperSlide>
                    <div className="review-item">
                      <svg
                        className="quote quote-up primary-color-500 position-absolute"
                        width="80"
                        height="70"
                      >
                        <use href="#quote-up" />
                      </svg>
                      <blockquote className="fs-4">
                        <p>
                          Dịch vụ y tế tại đây thật sự tuyệt vời. Đội ngũ bác sĩ
                          chuyên nghiệp, tận tâm và luôn quan tâm đến bệnh nhân.
                          Tôi rất hài lòng với chất lượng chăm sóc sức khỏe ở
                          đây!
                        </p>
                        <div className="author-detail">
                          <div className="name fs-3 fw-bold text-dark">
                            Nguyễn Văn Minh
                          </div>
                          <span className="text-cadet-blue text-uppercase">
                            Bệnh Nhân
                          </span>
                        </div>
                      </blockquote>
                      <svg
                        className="quote quote-down primary-color-500 position-absolute"
                        width="80"
                        height="70"
                      >
                        <use href="#quote-down" />
                      </svg>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="review-item">
                      <svg
                        className="quote quote-up primary-color-500 position-absolute"
                        width="80"
                        height="70"
                      >
                        <use href="#quote-up" />
                      </svg>
                      <blockquote className="fs-4">
                        <p>
                          Tôi đã được chăm sóc rất chu đáo trong quá trình điều
                          trị. Bác sĩ luôn giải thích rõ ràng về tình trạng bệnh
                          và phương pháp điều trị. Cảm ơn bệnh viện rất nhiều!
                        </p>
                        <div className="author-detail">
                          <div className="name fs-3 fw-bold text-dark">
                            Trần Thị Lan
                          </div>
                          <span className="text-cadet-blue text-uppercase">
                            Bệnh Nhân
                          </span>
                        </div>
                      </blockquote>
                      <svg
                        className="quote quote-down primary-color-500 position-absolute"
                        width="80"
                        height="70"
                      >
                        <use href="#quote-down" />
                      </svg>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="review-item">
                      <svg
                        className="quote quote-up primary-color-500 position-absolute"
                        width="80"
                        height="70"
                      >
                        <use href="#quote-up" />
                      </svg>
                      <blockquote className="fs-4">
                        <p>
                          Bệnh viện có trang thiết bị hiện đại và môi trường
                          sạch sẽ. Nhân viên y tế rất thân thiện và chuyên
                          nghiệp. Đây thực sự là nơi tôi tin tưởng cho việc chăm
                          sóc sức khỏe gia đình.
                        </p>
                        <div className="author-detail">
                          <div className="name fs-3 fw-bold text-dark">
                            Lê Văn Hùng
                          </div>
                          <span className="text-cadet-blue text-uppercase">
                            Bệnh Nhân
                          </span>
                        </div>
                      </blockquote>
                      <svg
                        className="quote quote-down primary-color-500 position-absolute"
                        width="80"
                        height="70"
                      >
                        <use href="#quote-down" />
                      </svg>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />

      <section id="our-team" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="display-header mb-5">
              <h2 className="display-5 fw-bold text-dark">
                Đội Ngũ Của Chúng Tôi
              </h2>
            </div>
            <div className="team-content">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="team-swiper"
              >
                <SwiperSlide>
                  <div className="team-member d-flex align-items-center">
                    <div className="col-md-6">
                      <div className="image-holder me-4 mb-4">
                        <img
                          src="/images/team-item.jpg"
                          alt="team member"
                          className="border-radius-10 img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="member-info">
                        <h3 className="fs-4 fw-bold text-dark">
                          BS. Lê Thị Hương
                        </h3>
                        <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                          Bác sĩ Nhi
                        </span>
                        <p>
                          Bác sĩ có hơn 15 năm kinh nghiệm trong lĩnh vực nhi
                          khoa, chuyên điều trị các bệnh lý về trẻ em với phương
                          pháp hiện đại và an toàn.
                        </p>
                        <ul className="social-links list-unstyled d-flex">
                          <li>
                            <a href="#">
                              <svg
                                className="facebook text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#facebook" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="twitter text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#twitter" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="instagram text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#instagram" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="youtube text-primary-500"
                                width="30"
                                height="30"
                              >
                                <use href="#youtube" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="team-member d-flex align-items-center">
                    <div className="col-md-6">
                      <div className="image-holder me-4 mb-4">
                        <img
                          src="/images/team-item1.jpg"
                          alt="team member"
                          className="border-radius-10 img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="member-info">
                        <h3 className="fs-4 fw-bold text-dark">
                          BS. Nguyễn Văn Thành
                        </h3>
                        <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                          Bác sĩ Tim mạch
                        </span>
                        <p>
                          Chuyên gia hàng đầu về tim mạch với nhiều năm kinh
                          nghiệm điều trị các bệnh lý tim mạch phức tạp và phẫu
                          thuật tim.
                        </p>
                        <ul className="social-links list-unstyled d-flex">
                          <li>
                            <a href="#">
                              <svg
                                className="facebook text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#facebook" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="twitter text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#twitter" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="instagram text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#instagram" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="youtube text-primary-500"
                                width="30"
                                height="30"
                              >
                                <use href="#youtube" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="team-member d-flex align-items-center">
                    <div className="col-md-6">
                      <div className="image-holder me-4 mb-4">
                        <img
                          src="/images/team-item2.jpg"
                          alt="team member"
                          className="border-radius-10 img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="member-info">
                        <h3 className="fs-4 fw-bold text-dark">
                          BS. Trần Thị Mai
                        </h3>
                        <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                          Bác sĩ Phụ khoa
                        </span>
                        <p>
                          Bác sĩ chuyên khoa Phụ sản với kinh nghiệm phong phú
                          trong chăm sóc sức khỏe sinh sản và điều trị các bệnh
                          phụ khoa.
                        </p>
                        <ul className="social-links list-unstyled d-flex">
                          <li>
                            <a href="#">
                              <svg
                                className="facebook text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#facebook" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="twitter text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#twitter" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="instagram text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use href="#instagram" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="youtube text-primary-500"
                                width="30"
                                height="30"
                              >
                                <use href="#youtube" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="padding-large pt-0">
        <div className="container">
          <div className="row">
            <div className="display-header mb-5">
              <h2 className="display-5 fw-bold text-center text-dark">
                Chúng Tôi Có Câu Trả Lời
              </h2>
            </div>
            <div className="accordion" id="accordion">
              <div className="accordion-item border-0 py-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fs-4 fw-bold text-dark bg-transparent focus-transparent text-capitalize shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Tại sao nên tin tưởng dịch vụ y tế của chúng tôi?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse border-0 collapse show"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe chất
                      lượng cao với đội ngũ bác sĩ giàu kinh nghiệm và trang
                      thiết bị y tế hiện đại. Sự tin tưởng của bệnh nhân là động
                      lực để chúng tôi không ngừng nâng cao chất lượng dịch vụ.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-0 py-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Chúng tôi có nhận được cập nhật về sức khỏe sau phẫu thuật
                    không?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Chúng tôi cam kết theo dõi và cập nhật tình hình sức khỏe
                      của bệnh nhân sau phẫu thuật. Đội ngũ y tế sẽ liên hệ định
                      kỳ để kiểm tra quá trình hồi phục và đưa ra lời khuyên phù
                      hợp cho từng giai đoạn điều trị.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-0 py-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Chi phí cho việc khám tổng quát là bao nhiêu?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Chi phí khám tổng quát sẽ tùy thuộc vào gói dịch vụ mà bạn
                      lựa chọn. Chúng tôi có nhiều gói khám sức khỏe với mức giá
                      phù hợp. Vui lòng liên hệ với chúng tôi để được tư vấn chi
                      tiết về các gói dịch vụ và mức phí cụ thể.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-0 py-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Tôi có thể hủy lịch hẹn không?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <p>
                      Bạn có thể hủy lịch hẹn bằng cách liên hệ với chúng tôi
                      trước 24 giờ. Vui lòng gọi hotline hoặc sử dụng hệ thống
                      đặt lịch trực tuyến để thực hiện việc hủy. Chúng tôi
                      khuyến khích thông báo sớm để có thể sắp xếp lại lịch cho
                      bệnh nhân khác.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="department" className="overflow-hidden">
        <div className="container-md">
          <div className="row">
            <div className="medical-department-tab bg-primary-200 d-flex align-items-start padding-large ps-5 border-radius-20">
              <div
                className="nav nav-tabs border-0 col-lg-3 col-md-3 ps-4"
                id="medical-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${
                    activeTab === "laboratory" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("laboratory")}
                  type="button"
                >
                  Phân Tích Xét Nghiệm
                </button>
                <button
                  className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${
                    activeTab === "cardiology" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("cardiology")}
                  type="button"
                >
                  Phòng Khám Tim Mạch
                </button>
                <button
                  className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${
                    activeTab === "gynecology" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("gynecology")}
                  type="button"
                >
                  Phòng Khám Phụ Khoa
                </button>
                <button
                  className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${
                    activeTab === "pathology" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("pathology")}
                  type="button"
                >
                  Phòng Khám Bệnh Lý
                </button>
                <button
                  className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${
                    activeTab === "pediatrics" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("pediatrics")}
                  type="button"
                >
                  Phòng Khám Nhi
                </button>
                <button
                  className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent ${
                    activeTab === "neurology" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("neurology")}
                  type="button"
                >
                  Phòng Khám Thần Kinh
                </button>
              </div>
              <div className="tab-content col-lg-8 col-md-8" id="tabContent">
                <div
                  className={`tab-pane fade position-relative ${
                    activeTab === "laboratory" ? "show active" : ""
                  }`}
                >
                  <h2 className="display-5 fw-bold pb-3 text-dark">
                    Phân Tích Xét Nghiệm
                  </h2>
                  <p>
                    Phân tích xét nghiệm là quá trình kiểm tra các mẫu dịch cơ
                    thể, mô hoặc chất thải để xác định sự hiện diện, vắng mặt
                    hoặc nồng độ của các chất khác nhau trong cơ thể con người.
                  </p>
                  <p>
                    Quy trình lấy mẫu được thực hiện một cách chuyên nghiệp để
                    đảm bảo độ chính xác của kết quả. Phần mẫu thu thập sẽ được
                    phân tích để xác định nồng độ các thành phần cần thiết.
                  </p>
                  <p>
                    <a href="#" className="text-primary pe-3">
                      Chăm Sóc Thần Kinh
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Ung Bướu Thần Kinh
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Thần Kinh Lão Khoa
                    </a>
                  </p>
                  <Link
                    to="/departments"
                    className="btn btn-medium btn-primary btn-pill mt-4"
                  >
                    Tìm Hiểu Thêm
                  </Link>
                </div>
                <div
                  className={`tab-pane fade position-relative ${
                    activeTab === "cardiology" ? "show active" : ""
                  }`}
                >
                  <h2 className="display-5 fw-bold pb-3 text-dark">
                    Phòng Khám Tim Mạch
                  </h2>
                  <p>
                    Chuyên khoa Tim mạch cung cấp dịch vụ chẩn đoán và điều trị
                    các bệnh lý về tim và mạch máu. Đội ngũ bác sĩ giàu kinh
                    nghiệm với trang thiết bị hiện đại.
                  </p>
                  <p>
                    Chúng tôi thực hiện các xét nghiệm chuyên sâu và điều trị
                    hiệu quả các bệnh lý tim mạch từ nhẹ đến phức tạp, đảm bảo
                    an toàn và chất lượng cao nhất.
                  </p>
                  <p>
                    <a href="#" className="text-primary pe-3">
                      Chăm Sóc Tim Mạch
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Phẫu Thuật Tim
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Điều Trị Can Thiệp
                    </a>
                  </p>
                  <Link
                    to="/departments"
                    className="btn btn-medium btn-primary btn-pill mt-4"
                  >
                    Tìm Hiểu Thêm
                  </Link>
                </div>
                <div
                  className={`tab-pane fade position-relative ${
                    activeTab === "gynecology" ? "show active" : ""
                  }`}
                >
                  <h2 className="display-5 fw-bold pb-3 text-dark">
                    Phòng Khám Phụ Khoa
                  </h2>
                  <p>
                    Khoa Phụ sản chuyên cung cấp dịch vụ chăm sóc sức khỏe toàn
                    diện cho phụ nữ ở mọi lứa tuổi. Từ khám định kỳ đến điều trị
                    các bệnh lý phụ khoa phức tạp.
                  </p>
                  <p>
                    Đội ngũ bác sĩ chuyên khoa có kinh nghiệm lâu năm, trang
                    thiết bị hiện đại và quy trình chăm sóc chuyên nghiệp, đảm
                    bảo sự riêng tư và thoải mái cho bệnh nhân.
                  </p>
                  <p>
                    <a href="#" className="text-primary pe-3">
                      Khám Phụ Khoa
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Siêu Âm Thai
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Tư Vấn Sinh Sản
                    </a>
                  </p>
                  <Link
                    to="/departments"
                    className="btn btn-medium btn-primary btn-pill mt-4"
                  >
                    Tìm Hiểu Thêm
                  </Link>
                </div>
                <div
                  className={`tab-pane fade position-relative ${
                    activeTab === "pathology" ? "show active" : ""
                  }`}
                >
                  <h2 className="display-5 fw-bold pb-3 text-dark">
                    Phòng Khám Bệnh Lý
                  </h2>
                  <p>
                    Khoa Giải phẫu bệnh chuyên thực hiện các xét nghiệm chẩn
                    đoán bệnh lý qua mô học và tế bào học. Hỗ trợ chẩn đoán
                    chính xác các bệnh lý từ lành tính đến ác tính.
                  </p>
                  <p>
                    Với hệ thống thiết bị hiện đại và đội ngũ chuyên gia giàu
                    kinh nghiệm, chúng tôi cam kết đưa ra kết quả chẩn đoán
                    nhanh chóng và chính xác nhất.
                  </p>
                  <p>
                    <a href="#" className="text-primary pe-3">
                      Giải Phẫu Bệnh
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Tế Bào Học
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Mô Học
                    </a>
                  </p>
                  <Link
                    to="/departments"
                    className="btn btn-medium btn-primary btn-pill mt-4"
                  >
                    Tìm Hiểu Thêm
                  </Link>
                </div>
                <div
                  className={`tab-pane fade position-relative ${
                    activeTab === "pediatrics" ? "show active" : ""
                  }`}
                >
                  <h2 className="display-5 fw-bold pb-3 text-dark">
                    Phòng Khám Nhi
                  </h2>
                  <p>
                    Khoa Nhi chuyên chăm sóc sức khỏe toàn diện cho trẻ em từ sơ
                    sinh đến 18 tuổi. Đội ngũ bác sĩ nhi khoa giàu kinh nghiệm
                    với phương pháp điều trị hiện đại và an toàn.
                  </p>
                  <p>
                    Chúng tôi cung cấp môi trường thân thiện, trang thiết bị
                    chuyên dụng cho trẻ em và quy trình chăm sóc tận tâm để đảm
                    bảo sự thoải mái cho cả trẻ và phụ huynh.
                  </p>
                  <p>
                    <a href="#" className="text-primary pe-3">
                      Nhi Tổng Quát
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Tiêm Chủng
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Dinh Dưỡng Trẻ Em
                    </a>
                  </p>
                  <Link
                    to="/departments"
                    className="btn btn-medium btn-primary btn-pill mt-4"
                  >
                    Tìm Hiểu Thêm
                  </Link>
                </div>
                <div
                  className={`tab-pane fade position-relative ${
                    activeTab === "neurology" ? "show active" : ""
                  }`}
                >
                  <h2 className="display-5 fw-bold pb-3 text-dark">
                    Phòng Khám Thần Kinh
                  </h2>
                  <p>
                    Khoa Thần kinh chuyên chẩn đoán và điều trị các bệnh lý về
                    hệ thần kinh trung ương và ngoại vi. Từ đau đầu thông thường
                    đến các bệnh lý phức tạp như đột quỵ, động kinh.
                  </p>
                  <p>
                    Với trang thiết bị chẩn đoán hình ảnh hiện đại và đội ngũ
                    bác sĩ chuyên khoa giàu kinh nghiệm, chúng tôi cam kết mang
                    đến phương pháp điều trị tối ưu nhất.
                  </p>
                  <p>
                    <a href="#" className="text-primary pe-3">
                      Chăm Sóc Thần Kinh
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Ung Bướu Thần Kinh
                    </a>
                    <a href="#" className="text-primary pe-3">
                      Thần Kinh Lão Khoa
                    </a>
                  </p>
                  <Link
                    to="/departments"
                    className="btn btn-medium btn-primary btn-pill mt-4"
                  >
                    Tìm Hiểu Thêm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="latest-blog" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="display-header">
              <h2 className="display-5 fw-bold text-dark">Bài Viết Gần Đây</h2>
            </div>
            <div className="post-grid d-flex flex-wrap mt-4">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <img
                        src="/images/post-item1.jpg"
                        alt=""
                        className="post-image img-fluid border-radius-top-10"
                      />
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Y Tế
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">2 Tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/1">
                        10 thực phẩm nên tránh để bảo vệ tim mạch
                      </Link>
                    </h3>
                    <p>
                      Việc cảm thấy lo lắng,걕 tâm khi được chẩn đoán mắc bệnh
                      là điều bình thường. Hãy tìm hiểu những thực phẩm có thể
                      ảnh hưởng đến sức khỏe tim mạch...{" "}
                      <Link to="/blog/1" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-3">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <img
                        src="/images/post-item2.jpg"
                        alt=""
                        className="post-image img-fluid border-radius-top-10"
                      />
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Sức Khỏe Tâm Thần
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">3 Tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/2">
                        Cách giữ bình tĩnh và thư giãn trong tình huống khó khăn
                      </Link>
                    </h3>
                    <p>
                      Stress và lo âu có thể ảnh hưởng nghiêm trọng đến sức
                      khỏe. Hãy tìm hiểu những phương pháp hiệu quả để duy trì
                      tinh thần tích cực...{" "}
                      <Link to="/blog/2" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card-item pe-2">
                  <div className="card border-0 bg-transparent">
                    <div className="card-image position-relative">
                      <img
                        src="/images/post-item3.jpg"
                        alt=""
                        className="post-image img-fluid border-radius-top-10"
                      />
                      <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">
                        Sức Khỏe Răng Miệng
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-3 mt-2">
                    <div className="meta-date">4 Tháng 1, 2023</div>
                    <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                      <Link to="/blog/3">
                        Những cách tốt nhất để có hàm răng chắc khỏe
                      </Link>
                    </h3>
                    <p>
                      Răng miệng khỏe mạnh không chỉ giúp nụ cười tự tin mà còn
                      quan trọng cho sức khỏe tổng thể. Khám phá những bí quyết
                      chăm sóc răng miệng hiệu quả...{" "}
                      <Link to="/blog/3" className="text-decoration-underline">
                        <em>Đọc thêm</em>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/blog"
            className="btn btn-medium btn-primary btn-pill text-uppercase text-center mx-auto"
          >
            Đọc Thêm Bài Viết
          </Link>
        </div>
      </section>

      <section
        id="brand-collection"
        className="padding-large pt-0 overflow-hidden"
      >
        <div className="container">
          <div className="row justify-content-between">
            <div className="col pb-3">
              <img src="/images/betael.png" alt="brand" className="top-image" />
              <img
                src="/images/betael1.png"
                alt="brand"
                className="bottom-image"
              />
            </div>
            <div className="col pb-3">
              <img src="/images/healer.png" alt="brand" className="top-image" />
              <img
                src="/images/healer1.png"
                alt="brand"
                className="bottom-image"
              />
            </div>
            <div className="col pb-3">
              <img
                src="/images/lifetrace.png"
                alt="brand"
                className="top-image"
              />
              <img
                src="/images/lifetrace1.png"
                alt="brand"
                className="bottom-image"
              />
            </div>
            <div className="col pb-3">
              <img
                src="/images/medcare.png"
                alt="brand"
                className="top-image"
              />
              <img
                src="/images/medcare1.png"
                alt="brand"
                className="bottom-image"
              />
            </div>
            <div className="col">
              <img src="/images/soven.png" alt="brand" className="top-image" />
              <img
                src="/images/soven1.png"
                alt="brand"
                className="bottom-image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
