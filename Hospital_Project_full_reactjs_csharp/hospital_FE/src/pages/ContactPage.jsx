import React from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Liên hệ</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className=" item">Liên hệ</span>
          </div>
        </div>
      </section>

      <section className="contact-us-wrap py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="contact-info col-md-6">
              <h2>Thông tin liên hệ</h2>
              <p>
                Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của
                bạn.
              </p>
              <div className="page-content d-flex flex-wrap">
                <div className="col-md-6">
                  <div className="content-box my-5">
                    <h5 className="element-title text-uppercase fs-6 fw-bold ">
                      Trụ sở chính
                    </h5>
                    <div className="contact-address">
                      <p>268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</p>
                      <p>0123 456 789</p>
                      <p>
                        <a href="mailto:">contact@benhvien.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="content-box my-5">
                    <h5 className="element-title text-uppercase fs-6 fw-bold ">
                      GIỜ MỞ CỬA
                    </h5>
                    <div className="contact-address">
                      <p>Thứ 2 – Thứ 6: 08:00 – 17:00</p>
                      <p>Thứ 7: 08:00 – 12:00</p>
                      <p>Chủ nhật: Chỉ nhận cấp cứu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inquiry-form col-md-6">
              <h2>Bạn có câu hỏi nào không?</h2>
              <p>
                Vui lòng điền vào biểu mẫu bên dưới và chúng tôi sẽ liên hệ lại
                với bạn sớm nhất có thể.
              </p>
              <form action="#" method="post" className="form-group mt-5">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nhập tên của bạn"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="email"
                      placeholder="Nhập email của bạn"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      placeholder="Nhập lời nhắn của bạn"
                      style={{ height: "150px" }}
                    ></textarea>
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-primary btn-lg rounded-pill px-5 py-3 mt-4"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="google-map-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.266224823434!2d106.65496157480539!3d10.790932389358992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752934f253e733%3A0x2323e3514a29a32e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJBIUUcgVFAuSENNLCBDxqEgc-G7nyBMw70gVGjGsOG7nW5nIEtp4buHdCE!5e0!3m2!1svi!2s!4v1716183955609!5m2!1svi!2s"
                width="100%"
                height="500"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
