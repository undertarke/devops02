import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Pagination,
  Badge,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaUserMd } from "react-icons/fa";
import Avatar from "../../components/common/Avatar";
import axios from "axios";
import { API_BASE_URL } from '../../services/api';
import { getCurrentUserRole, isTokenExpired, checkTokenAndProceed } from '../../utils/auth';

import LoadingSpinner from '../../components/common/LoadingSpinner';

function DoctorManagementPage() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // API URLs
  const API_URL_GET = `${API_BASE_URL}/Doctor`;
  const API_URL_UPDATE = `${API_BASE_URL}/Doctor/edit`;
  const API_URL_DELETE = `${API_BASE_URL}/Doctor/delete`;

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL_GET);
      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      alert("Không thể tải danh sách bác sĩ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDoctor(null);

  };

  const handleShowModal = async (doctor) => {
    await checkTokenAndProceed(async () => {
      const role = getCurrentUserRole();
      if (role?.trim() !== "Admin") {
        alert("Chỉ Admin mới có quyền chỉnh sửa thông tin bác sĩ.");
        return;
      }
      setCurrentDoctor({
        id: doctor.id,
        userId: doctor.userId,
        fullName: doctor.fullName || "",
        username: doctor.username || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        dateOfBirth: doctor.dateOfBirth?.split("T")[0] || "",
        gender: doctor.gender || "Male",
        specialization: doctor.specialization || "",
        degree: doctor.degree || "",
        yearOfExperience: doctor.yearOfExperience || 0,
        status: doctor.status || "Active",
      });
      setShowModal(true);
    });
  };

  const handleSave = async () => {
    await checkTokenAndProceed(async () => {
      try {
        setIsLoading(true);
        const { password, ...doctorToUpdate } = currentDoctor;
        await axios.put(
          `${API_URL_UPDATE}/${doctorToUpdate.id}`,
          {
            ...doctorToUpdate,
            password: password || undefined,
          }
        );
        alert("Cập nhật thông tin bác sĩ thành công!");
        await fetchDoctors();
        handleCloseModal();
      } catch (error) {
        console.error("Save doctor failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Lưu thông tin bác sĩ thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleDelete = async (id) => {
    await checkTokenAndProceed(async () => {
      const role = getCurrentUserRole();
      if (role?.trim() !== "Admin") {
        alert("Chỉ Admin mới có quyền xóa bác sĩ.");
        return;
      }

      if (window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) {
        try {
          setIsLoading(true);
          await axios.delete(`${API_URL_DELETE}/${id}`);
          alert("Xóa bác sĩ thành công!");
          await fetchDoctors();
        } catch (error) {
          console.error("Delete failed:", error.response?.data || error.message);
          alert(error.response?.data?.message || "Xóa bác sĩ thất bại. Vui lòng thử lại.");
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = doctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge bg="success">Đang làm việc</Badge>;
      case "On Leave":
        return <Badge bg="warning">Nghỉ phép</Badge>;
      case "Inactive":
        return <Badge bg="danger">Ngưng làm việc</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaUserMd className="me-2" /> Quản Lý Danh Mục Bác Sĩ
          </h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Danh Sách Bác Sĩ</h5>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Table responsive striped bordered hover className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Họ và tên</th>
                    <th>Chuyên khoa</th>
                    <th>Bằng cấp</th>
                    <th>Kinh nghiệm</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((doctor, index) => (
                    <tr key={doctor.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Avatar 
                            src={doctor.avatarUrl} 
                            name={doctor.fullName} 
                            size={40}
                          />
                          <span className="ms-2">{doctor.fullName}</span>
                        </div>
                      </td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.degree}</td>
                      <td>{doctor.yearOfExperience} năm</td>
                      <td>{doctor.phone}</td>
                      <td>{doctor.email}</td>
                      <td>{getStatusBadge(doctor.status)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowModal(doctor)}
                          disabled={isLoading}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(doctor.id)}
                          disabled={isLoading}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                  <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                  <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Chỉnh sửa thông tin Bác Sĩ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <h5>Thông tin tài khoản</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={currentDoctor?.fullName || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={currentDoctor?.username || ""}
                    onChange={handleChange}
                    disabled
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentDoctor?.email || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={currentDoctor?.phone || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <h5>Thông tin chuyên môn</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Chuyên khoa</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={currentDoctor?.specialization || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bằng cấp</Form.Label>
                  <Form.Control
                    type="text"
                    name="degree"
                    value={currentDoctor?.degree || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số năm kinh nghiệm</Form.Label>
                  <Form.Control
                    type="number"
                    name="yearOfExperience"
                    value={currentDoctor?.yearOfExperience || 0}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={currentDoctor?.dateOfBirth || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Giới tính</Form.Label>
                  <Form.Select
                    name="gender"
                    value={currentDoctor?.gender || "Male"}
                    onChange={handleChange}
                    required
                  >
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                    <option value="Other">Khác</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
                    name="status"
                    value={currentDoctor?.status || "Active"}
                    onChange={handleChange}
                    required
                  >
                    <option value="Active">Đang làm việc</option>
                    <option value="On Leave">Nghỉ phép</option>
                    <option value="Inactive">Ngưng làm việc</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={isLoading}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Lưu thay đổi"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DoctorManagementPage;