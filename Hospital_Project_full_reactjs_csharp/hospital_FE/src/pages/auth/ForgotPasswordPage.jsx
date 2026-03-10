import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaEnvelope, FaKey, FaCheckCircle } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Vui lòng nhập email của bạn');
      return;
    }
    // Mock sending email
    setTimeout(() => {
      setEmailSent(true);
      setError('');
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }
    // Mock reset password API call with token
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // Hiển thị form email nếu không có token
  if (!token) {
    if (emailSent) {
      return (
        <Container fluid className="auth-container p-4">
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col md={6} lg={4}>
              <Card className="shadow-lg border-0">
                <Card.Body className="p-5">
                  <div className="text-center">
                    <FaCheckCircle className="text-success mb-4" size={50} />
                    <h3 className="fw-bold">Email Đã Được Gửi!</h3>
                    <p className="text-muted mb-4">
                      Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn.
                      Vui lòng kiểm tra hộp thư (bao gồm cả thư rác).
                    </p>
                    <div>
                      <Button variant="link" onClick={() => setEmailSent(false)}>
                        Gửi lại email
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container fluid className="auth-container p-4">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Quên Mật Khẩu?</h2>
                  <p className="text-muted">
                    Nhập email của bạn để nhận link đặt lại mật khẩu
                  </p>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmitEmail}>
                  <Form.Group className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100 mb-3">
                    Gửi Link Đặt Lại Mật Khẩu
                  </Button>
                  <div className="text-center">
                    <Button variant="link" onClick={() => navigate('/login')}>
                      Quay lại đăng nhập
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // Hiển thị form đặt lại mật khẩu nếu có token
  return (
    <Container fluid className="auth-container p-4">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Đặt Lại Mật Khẩu</h2>
                <p className="text-muted">
                  Nhập mật khẩu mới cho tài khoản của bạn
                </p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaKey />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaKey />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Đặt Lại Mật Khẩu
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage; 