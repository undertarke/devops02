import React from 'react';
import { Link } from 'react-router-dom';

export default function DepartmentsPage() {
  return (
    <React.Fragment>
      {/* Banner Section */}
      <section id="intro" style={{ backgroundColor: '#E8F0F1' }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Chuyên Khoa</h1>
            <span className="item"><Link to="/" className="">Trang chủ</Link></span> &nbsp; <span className="">/</span> &nbsp;
            <span className="item">Chuyên khoa</span>
          </div>
        </div>
      </section>

      <div className="post-wrap py-5 no-padding-bottom">
        <div className="container">
          <div className="row flex-md-row-reverse g-5 mt-4">
            <main className="post-grid col-md-9">
              <div className="row">
                <article className="post-item">
                  <h2 className="display-5 fw-bold pb-5 text-dark">Xét Nghiệm & Chẩn Đoán Hình Ảnh</h2>
                  <p>Khoa Xét nghiệm & Chẩn đoán hình ảnh của chúng tôi được trang bị các thiết bị hiện đại, đội ngũ chuyên gia giàu kinh nghiệm, đảm bảo kết quả chính xác và nhanh chóng cho bệnh nhân.</p>
                  <p>Chúng tôi cung cấp đầy đủ các dịch vụ xét nghiệm và chẩn đoán hình ảnh từ cơ bản đến chuyên sâu, hỗ trợ đắc lực cho công tác chẩn đoán và điều trị của các bác sĩ.</p>
                  <div className="hero-image mt-5">
                    <img src="/images/blog-large1.jpg" alt="phòng xét nghiệm" className="img-fluid" />
                  </div>
                  <div className="post-content py-5">
                    <div className="post-description">
                      <blockquote>"Với phương châm lấy người bệnh làm trung tâm, chúng tôi cam kết mang đến dịch vụ xét nghiệm chất lượng cao, an toàn và tin cậy cho mọi bệnh nhân."</blockquote>
                      <h2 className="my-5">Các Dịch Vụ Xét Nghiệm và Điều Trị</h2>
                      <div className="row">
                        <div className="col-md-6">
                          <table className="table mb-5">
                            <thead>
                              <tr>
                                <th scope="col">Dịch Vụ Xét Nghiệm</th>
                                <th scope="col">Chi Phí</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td scope="row">Nội soi đại tràng</td>
                                <td className="text-primary">5.750.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Nội soi dạ dày</td>
                                <td className="text-primary">5.428.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Xét nghiệm dị ứng</td>
                                <td className="text-primary">3.450.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Chụp CT</td>
                                <td className="text-primary">12.995.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Chụp CT tim</td>
                                <td className="text-primary">6.900.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Xạ hình tuyến cận giáp</td>
                                <td className="text-primary">4.140.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Xạ hình thận</td>
                                <td className="text-primary">7.360.000đ</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-6">
                          <table className="table mb-5">
                            <thead>
                              <tr>
                                <th scope="col">Dịch Vụ Điều Trị</th>
                                <th scope="col">Chi Phí</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td scope="row">Nội soi phế quản</td>
                                <td className="text-primary">3.450.000đ - 6.900.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Điều trị rối loạn nhịp tim</td>
                                <td className="text-primary">5.750.000đ - 9.200.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Điều trị chấn thương thể thao</td>
                                <td className="text-primary">3.450.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Chăm sóc sức khỏe phụ nữ</td>
                                <td className="text-primary">12.995.000đ</td>
                              </tr>
                              <tr>
                                <td scope="row">Chỉnh hình xương khớp</td>
                                <td className="text-primary">6.900.000đ</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <p>Với đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm và hệ thống trang thiết bị hiện đại, chúng tôi cam kết mang đến kết quả xét nghiệm chính xác, nhanh chóng, góp phần quan trọng trong việc chẩn đoán và điều trị bệnh hiệu quả.</p>
                      <h2 className="my-5">Đội Ngũ Chuyên Gia</h2>
                      <div className="row my-4">
                        <div className="col-md-6">
                          <img src="/images/team-item1.jpg" alt="bác sĩ chuyên khoa" className="img-fluid align-left" />
                          <h5 className="mt-3">PGS.TS Nguyễn Văn A - Trưởng khoa Xét nghiệm</h5>
                        </div>
                        <div className="col-md-6">
                          <img src="/images/team-item.jpg" alt="bác sĩ chuyên khoa" className="img-fluid align-right" />
                          <h5 className="mt-3">TS.BS Trần Thị B - Trưởng khoa Chẩn đoán hình ảnh</h5>
                        </div>
                      </div>
                      <p>Đội ngũ bác sĩ của chúng tôi được đào tạo tại các trường y khoa hàng đầu trong và ngoài nước, có nhiều năm kinh nghiệm trong lĩnh vực xét nghiệm và chẩn đoán hình ảnh. Họ không chỉ giỏi chuyên môn mà còn tận tâm trong việc chăm sóc và tư vấn cho bệnh nhân.</p>
                      <div className="my-5">
                        <h2 className="mb-5">Dịch Vụ Nổi Bật</h2>
                        <ul className="inner-list list-unstyled">
                          <li><span className="price-tick">✓</span> Xét nghiệm tổng quát theo gói với chi phí ưu đãi</li>
                          <li><span className="price-tick">✓</span> Chẩn đoán hình ảnh công nghệ cao (MRI, CT Scanner đa lớp cắt)</li>
                          <li><span className="price-tick">✓</span> Xét nghiệm di truyền và sinh học phân tử</li>
                          <li><span className="price-tick">✓</span> Tầm soát ung thư sớm bằng các marker đặc hiệu</li>
                          <li><span className="price-tick">✓</span> Nội soi tiêu hóa với hệ thống ống soi hiện đại</li>
                          <li><span className="price-tick">✓</span> Chụp X-quang kỹ thuật số với liều phóng xạ thấp</li>
                        </ul>
                      </div>
                      <p>Khoa Xét nghiệm & Chẩn đoán hình ảnh hoạt động 24/7, sẵn sàng đáp ứng mọi nhu cầu xét nghiệm khẩn cấp của bệnh nhân. Chúng tôi cũng cung cấp dịch vụ lấy mẫu xét nghiệm tại nhà cho những trường hợp đặc biệt.</p>
                    </div>
                  </div>
                </article>
              </div>
            </main>

            <aside className="col-md-3">
              <div className="post-sidebar">
                <div className="widget block-tag border p-3 mb-5">
                  <h5 className="widget-title text-uppercase border-bottom pb-3 mb-3">Đặt Lịch Khám</h5>
                  <p>Đặt lịch khám với bác sĩ chuyên khoa ngay hôm nay để được tư vấn và điều trị tốt nhất</p>
                  <div className="btn-book">
                    <Link to="/booking" className="btn btn-medium btn-outline-primary btn-pill text-uppercase px-4 py-3">Đặt Lịch Ngay</Link>
                  </div>
                </div>
                <div className="widget sidebar-categories border p-3 mb-5">
                  <h5 className="widget-title text-uppercase border-bottom pb-3 mb-3">Chuyên Khoa</h5>
                  <ul className="list-unstyled">
                    <li className="my-2 d-flex align-items-center">
                      <svg width="20" height="20"><use href="#arrow-right"></use></svg>
                      <Link to="/departments" className="item-anchor text-uppercase ps-2">Xét Nghiệm & Chẩn Đoán</Link>
                    </li>
                    <li className="my-2 d-flex align-items-center">
                      <svg width="20" height="20"><use href="#arrow-right"></use></svg>
                      <Link to="/departments" className="item-anchor text-uppercase ps-2">Tim Mạch</Link>
                    </li>
                    <li className="my-2 d-flex align-items-center">
                      <svg width="20" height="20"><use href="#arrow-right"></use></svg>
                      <Link to="/departments" className="item-anchor text-uppercase ps-2">Sản Phụ Khoa</Link>
                    </li>
                    <li className="my-2 d-flex align-items-center">
                      <svg width="20" height="20"><use href="#arrow-right"></use></svg>
                      <Link to="/departments" className="item-anchor text-uppercase ps-2">Giải Phẫu Bệnh</Link>
                    </li>
                    <li className="my-2 d-flex align-items-center">
                      <svg width="20" height="20"><use href="#arrow-right"></use></svg>
                      <Link to="/departments" className="item-anchor text-uppercase ps-2">Nhi Khoa</Link>
                    </li>
                    <li className="my-2 d-flex align-items-center">
                      <svg width="20" height="20"><use href="#arrow-right"></use></svg>
                      <Link to="/departments" className="item-anchor text-uppercase ps-2">Thần Kinh</Link>
                    </li>
                  </ul>
                </div>
                <div className="widget sidebar-recent-post mb-5">
                  <h5 className="widget-title text-uppercase border-bottom pb-3 mb-3">Bài Viết Mới</h5>
                  <div className="sidebar-post-item d-flex justify-content-center my-2">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="image-holder mt-1">
                          <Link to="/blog-single"><img src="/images/post-item1.jpg" alt="blog" className="img-fluid" /></Link>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="sidebar-post-content text-uppercase">
                          <div className="post-meta fs-6 text-secondary">
                            <span className="meta-date">11/07/2022</span>
                          </div>
                          <h6 className="post-title">
                            <Link to="/blog-single">Cách chăm sóc sức khỏe hiệu quả</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-post-item d-flex justify-content-center my-2">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="image-holder mt-1">
                          <Link to="/blog-single"><img src="/images/post-item2.jpg" alt="blog" className="img-fluid" /></Link>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="sidebar-post-content text-uppercase">
                          <div className="post-meta fs-6 text-secondary">
                            <span className="meta-date">18/07/2022</span>
                          </div>
                          <h6 className="post-title">
                            <Link to="/blog-single">10 bí quyết sống khỏe mỗi ngày</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-post-item d-flex justify-content-center my-2">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="image-holder mt-1">
                          <Link to="/blog-single"><img src="/images/post-item3.jpg" alt="blog" className="img-fluid" /></Link>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="sidebar-post-content text-uppercase">
                          <div className="post-meta fs-6 text-secondary">
                            <span className="meta-date">21/08/2022</span>
                          </div>
                          <h6 className="post-title">
                            <Link to="/blog-single">Cách chăm sóc răng miệng tốt nhất</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}