import React from "react";
import { Link } from "react-router-dom";

const TeamPage = () => {
  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">
              Đội ngũ của chúng tôi
            </h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className=" item">Đội ngũ</span>
          </div>
        </div>
      </section>

      <section id="review">
        <div className=" services-sub container my-5 pb-5">
          <div className="row">
            <div className=" mt-5 col-md-6">
              <div className="team-member d-flex align-items-lg-center">
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
                      Bác sĩ Leslie Taylor
                    </h3>
                    <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                      Bác sĩ nhi khoa
                    </span>
                    <p>
                      Với nhiều năm kinh nghiệm trong lĩnh vực nhi khoa, bác sĩ
                      Taylor luôn tận tâm chăm sóc sức khỏe cho các bệnh nhi.
                    </p>
                    <ul className="social-links list-unstyled d-flex">
                      <li>
                        <Link to="#">
                          <svg
                            className="facebook text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#facebook" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="twitter text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#twitter" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="instagram text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#instagram" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="youtube text-primary-500"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#youtube" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-5 col-md-6">
              <div className="team-member d-flex align-items-lg-center">
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
                      Bác sĩ Zachary Brown
                    </h3>
                    <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                      Bác sĩ tim mạch
                    </span>
                    <p>
                      Chuyên gia hàng đầu về các bệnh lý tim mạch, luôn cập nhật
                      các phương pháp điều trị tiên tiến nhất.
                    </p>
                    <ul className="social-links list-unstyled d-flex">
                      <li>
                        <Link to="#">
                          <svg
                            className="facebook text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#facebook" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="twitter text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#twitter" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="instagram text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#instagram" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="youtube text-primary-500"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#youtube" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-5 col-md-6">
              <div className="team-member d-flex align-items-lg-center">
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
                      Bác sĩ Isabella Davies
                    </h3>
                    <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                      Bác sĩ phụ khoa
                    </span>
                    <p>
                      Bác sĩ Davies cung cấp các dịch vụ chăm sóc sức khỏe phụ
                      nữ một cách toàn diện và thấu hiểu.
                    </p>
                    <ul className="social-links list-unstyled d-flex">
                      <li>
                        <Link to="#">
                          <svg
                            className="facebook text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#facebook" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="twitter text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#twitter" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="instagram text-primary-500 me-4"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#instagram" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <svg
                            className="youtube text-primary-500"
                            width="30"
                            height="30"
                          >
                            <use xlinkHref="#youtube" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
