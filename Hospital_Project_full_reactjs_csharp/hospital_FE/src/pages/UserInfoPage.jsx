import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Form, Button, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Avatar from '../components/common/Avatar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api, { API_BASE_URL, getInvoicesByPatientId, getAppointmentsByPatientId } from '../services/api';
import { toast } from 'react-toastify';
import { FaCalendarCheck, FaClock, FaPrescription, FaFileInvoiceDollar, FaKey, FaInfoCircle, FaCapsules } from 'react-icons/fa';

const UserInfoPage = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'appointments';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData || !authData.token || !authData.userId) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Lấy thông tin user
        const userResponse = await api.get(`/User/${authData.userId}`);
        
        // Lấy patientId từ API Patient
        const patientResponse = await api.get(`/Patient/user/${authData.userId}`);
        const patientId = patientResponse.data.id;
        
        // Lấy các dữ liệu khác
        const [
          appointmentsResponse,
          waitingResponse,
          prescriptionsResponse,
        ] = await Promise.all([
          api.get(`/Appointment/by-patient/${patientId}`),
          api.get('/WaitingList'),
          api.get('/Prescriptions'),
        ]);

        // Gọi API invoices riêng để xử lý lỗi
        let invoicesData = [];
        try {
          const invoicesResponse = await getInvoicesByPatientId(authData.userId);
          invoicesData = invoicesResponse.data;
        } catch (error) {
          if (error.response?.status === 404) {
            // Nếu không có hóa đơn, set mảng rỗng
            invoicesData = [];
          } else {
            // Nếu lỗi khác, throw để xử lý ở catch bên ngoài
            throw error;
          }
        }

        setUserData(userResponse.data);
        setAppointments(appointmentsResponse.data || []);
        setWaitingList(waitingResponse.data.filter(item => item.patientId === authData.userId));
        setPrescriptions(prescriptionsResponse.data);
        setInvoices(invoicesData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        toast.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu mới không khớp');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    try {
      await api.post('/Auth/change-password', {
        currentPassword,
        newPassword
      });

      setPasswordSuccess('Đổi mật khẩu thành công!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return 'secondary';
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'completed':
      case 'paid':
        return 'success';
      case 'pending':
      case 'waiting':
        return 'warning';
      case 'cancelled':
        return 'danger';
      case 'in_progress':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'confirmed': return 'Đã xác nhận';
      case 'completed': return 'Hoàn thành';
      case 'pending': return 'Chờ xác nhận';
      case 'waiting': return 'Đang chờ';
      case 'cancelled': return 'Đã hủy';
      case 'in_progress': return 'Đang thực hiện';
      case 'paid': return 'Đã thanh toán';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="position-relative d-inline-block mb-4">
                <Avatar name={userData?.username} size={120} className="border-3 border-primary" />
                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2 border border-white"></span>
              </div>
              <h4 className="mb-1">{userData?.fullName}</h4>
              <p className="text-muted mb-3">{userData?.email}</p>
              <div className="d-grid">
                <Button variant="outline-primary" onClick={() => setShowPasswordForm(!showPasswordForm)}>
                  <FaKey className="me-2" />
                  Đổi mật khẩu
                </Button>
              </div>
              
              {showPasswordForm && (
                <Form onSubmit={handlePasswordSubmit} className="mt-4 text-start">
                  {passwordError && <Alert variant="danger">{passwordError}</Alert>}
                  {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button type="submit" variant="primary">
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h5 className="mb-3">Thông tin cá nhân</h5>
              <div className="mb-3">
                <small className="text-muted d-block">Số điện thoại</small>
                <div>{userData?.phoneNumber}</div>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Địa chỉ</small>
                <div>{userData?.address}</div>
              </div>
              <div>
                <small className="text-muted d-block">Ngày tham gia</small>
                <div>{new Date(userData?.createdAt).toLocaleDateString('vi-VN')}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="nav-fill border-bottom">
                  <Nav.Item>
                    <Nav.Link eventKey="appointments" className="border-0 px-4 py-3">
                      <FaCalendarCheck className="me-2" />
                      Lịch hẹn
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="waiting" className="border-0 px-4 py-3">
                      <FaClock className="me-2" />
                      Danh sách chờ
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="prescriptions" className="border-0 px-4 py-3">
                      <FaPrescription className="me-2" />
                      Đơn thuốc
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="invoices" className="border-0 px-4 py-3">
                      <FaFileInvoiceDollar className="me-2" />
                      Hóa đơn
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="appointments" className="p-4">
                    {appointments.length === 0 ? (
                      <Alert variant="info">Bạn chưa có lịch hẹn nào.</Alert>
                    ) : (
                      appointments.map((appointment) => (
                        <Card key={appointment.id} className="border-0 shadow-sm mb-3">
                          <Card.Body className="p-3">
                            <Row className="align-items-center">
                              <Col xs={12} md={2} className="mb-3 mb-md-0">
                                <div className="text-center text-md-start">
                                  <div className="fw-bold">
                                    {new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')}
                                  </div>
                                  <div className="text-muted small">
                                    {appointment.startTime} - {appointment.endTime}
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12} md={4} className="mb-3 mb-md-0">
                                <div className="d-flex align-items-center">
                                  <Avatar name={appointment.doctorName} size={40} className="me-3" />
                                  <div>
                                    <div className="fw-bold">{appointment.doctorName}</div>
                                    <div className="text-muted small">{appointment.specialization}</div>
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12} md={4} className="mb-3 mb-md-0">
                                <div className="text-muted small mb-1">Phòng khám</div>
                                <div>{appointment.branchName}</div>
                                {appointment.note && (
                                  <div className="text-muted small mt-1">
                                    <FaInfoCircle className="me-1" />
                                    {appointment.note}
                                  </div>
                                )}
                              </Col>
                              <Col xs={12} md={2}>
                                <div className={`badge bg-${getStatusBadge(appointment.status)}`}>
                                  {getStatusText(appointment.status)}
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="waiting" className="p-4">
                    {waitingList.length === 0 ? (
                      <Alert variant="info">Bạn không có trong danh sách chờ.</Alert>
                    ) : (
                      waitingList.map((item) => (
                        <Card key={item.id} className="border-0 shadow-sm mb-3">
                          <Card.Body className="p-3">
                            <Row className="align-items-center">
                              <Col xs={12} md={3} className="mb-3 mb-md-0">
                                <div className="text-center text-md-start">
                                  <div className="fw-bold">Số thứ tự: {item.queueNumber}</div>
                                  <div className="text-muted small">Mã lịch hẹn: {item.appointmentID}</div>
                                </div>
                              </Col>
                              <Col xs={12} md={6} className="mb-3 mb-md-0">
                                <div className="text-muted small mb-1">Trạng thái</div>
                                <div className={`badge bg-${getStatusBadge(item.status)}`}>
                                  {getStatusText(item.status)}
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="prescriptions" className="p-4">
                    {prescriptions.length === 0 ? (
                      <Alert variant="info">Bạn chưa có đơn thuốc nào.</Alert>
                    ) : (
                      prescriptions.map((prescription) => (
                        <Card key={prescription.id} className="border-0 shadow-sm mb-3">
                          <Card.Body className="p-3">
                            <Row>
                              <Col xs={12} md={3} className="mb-3 mb-md-0">
                                <div className="text-center text-md-start">
                                  <div className="fw-bold">
                                    {new Date(prescription.createdAt).toLocaleDateString('vi-VN')}
                                  </div>
                                  <div className="text-muted small">Đơn thuốc #{prescription.id}</div>
                                </div>
                              </Col>
                              <Col xs={12} md={4} className="mb-3 mb-md-0">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="fw-bold">Bác sĩ kê đơn</div>
                                    <div className="text-muted small">{prescription.prescribedBy}</div>
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <hr className="my-3" />
                                <div className="text-muted mb-2">Chi tiết đơn thuốc</div>
                                {prescription.details.map((detail, idx) => (
                                  <div key={idx} className="d-flex align-items-start mb-3">
                                    <FaCapsules className="text-primary mt-1 me-2" />
                                    <div>
                                      <div className="fw-bold">{detail.medicineName}</div>
                                      <div className="text-muted small">Liều lượng: {detail.dosage}</div>
                                      <div className="text-muted small">Số lượng: {detail.quantity}</div>
                                      <div className="text-muted small">Hướng dẫn: {detail.instructions}</div>
                                    </div>
                                  </div>
                                ))}
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="invoices" className="p-4">
                    {invoices.length === 0 ? (
                      <Alert variant="info">Bạn chưa có hóa đơn nào.</Alert>
                    ) : (
                      invoices.map((invoice) => (
                        <Card key={invoice.id} className="border-0 shadow-sm mb-3">
                          <Card.Body className="p-3">
                            <Row>
                              <Col xs={12} md={3} className="mb-3 mb-md-0">
                                <div className="text-center text-md-start">
                                  <div className="fw-bold">
                                    {new Date(invoice.createdAt).toLocaleDateString('vi-VN')}
                                  </div>
                                  <div className="text-muted small">Hóa đơn #{invoice.id}</div>
                                </div>
                              </Col>
                              <Col xs={12} md={6} className="mb-3 mb-md-0">
                                <div className="text-muted small mb-1">Chi tiết</div>
                                {invoice.invoiceDetails?.map((detail, idx) => (
                                  <div key={idx} className="mb-2">
                                    <div>{detail.serviceName || detail.medicineName}</div>
                                    <div className="text-muted small">
                                      Số lượng: {detail.quantity} x {detail.price.toLocaleString('vi-VN')} VNĐ
                                    </div>
                                  </div>
                                ))}
                              </Col>
                              <Col xs={12} md={3} className="text-md-end">
                                <div className="text-muted small mb-1">Tổng tiền</div>
                                <div className="fw-bold">
                                  {invoice.totalAmount.toLocaleString('vi-VN')} VNĐ
                                </div>
                                <div className={`badge bg-${getStatusBadge(invoice.status)} mt-2`}>
                                  {getStatusText(invoice.status)}
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfoPage;