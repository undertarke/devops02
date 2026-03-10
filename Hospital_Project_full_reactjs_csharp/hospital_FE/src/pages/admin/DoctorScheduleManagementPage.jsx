

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function DoctorScheduleManagementPage() {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const h = hour.toString().padStart(2, '0');
        const m = min.toString().padStart(2, '0');
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };


  const timeOptions = generateTimeOptions();

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/Doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data.map(d => ({ id: d.id, name: d.fullName })));
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Room`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };


  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/DoctorSchedule`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSchedules(response.data);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([fetchDoctors(), fetchRooms(), fetchSchedules()]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSchedule(null);
    setIsEditing(false);
  };

  const handleShowModal = (schedule = null) => {
    if (schedule) {
      const formattedSchedule = {

        ...schedule,
        date: formatDate(schedule.date),
        startTime: formatTime(schedule.startTime),
        endTime: formatTime(schedule.endTime),
      };
      setCurrentSchedule(formattedSchedule);
      setIsEditing(true);
    } else {
      setCurrentSchedule({ doctorId: '', date: '', startTime: '', endTime: '', status: 'Available' });
      setIsEditing(false);
    }
    setShowModal(true);
  };


  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const doctor = doctors.find(d => d.id === parseInt(currentSchedule.doctorId));
    const room = rooms.find(r => r.id === parseInt(currentSchedule.roomId));


    const payload = {
      doctorId: parseInt(currentSchedule.doctorId),
      roomId: parseInt(currentSchedule.roomId),
      date: currentSchedule.date,
      startTime: currentSchedule.startTime,
      endTime: currentSchedule.endTime,
      status: currentSchedule.status
    };

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/DoctorSchedule/${currentSchedule.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/DoctorSchedule`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await loadData();
      handleCloseModal();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Error saving schedule. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa lịch khám này?')) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`${API_BASE_URL}/DoctorSchedule/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await loadData();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Error deleting schedule. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSchedule(prev => ({ ...prev, [name]: value }));
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = schedules.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(schedules.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':

        return <Badge bg="success">Còn trống</Badge>;
      case 'Booked':
        return <Badge bg="warning">Đã đặt</Badge>;
      case 'Unavailable':
        return <Badge bg="danger">Không khả dụng</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">

            <FaCalendarAlt className="me-2" /> Quản Lý Lịch Khám
          </h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-2" /> Thêm Lịch Khám
          </Button>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">

          <h5 className="mb-0">Danh Sách Lịch Khám</h5>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bác Sĩ</th>
                    <th>Ngày</th>
                    <th>Giờ Bắt Đầu</th>
                    <th>Giờ Kết Thúc</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((schedule, index) => (
                    <tr key={schedule.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{schedule.doctorName}</td>
                      <td>{formatDate(schedule.date)}</td>
                      <td>{formatTime(schedule.startTime)}</td>
                      <td>{formatTime(schedule.endTime)}</td>
                      <td>{getStatusBadge(schedule.status)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowModal(schedule)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(schedule.id)}
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Chỉnh Sửa Lịch Khám' : 'Thêm Lịch Khám Mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">

              <Form.Label>Bác Sĩ</Form.Label>
              <Form.Select name="doctorId" value={currentSchedule?.doctorId || ''} onChange={handleChange}>
                <option value="">Chọn Bác Sĩ</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">

              <Form.Label>Phòng</Form.Label>
              <Form.Select name="roomId" value={currentSchedule?.roomId || ''} onChange={handleChange}>
                <option value="">Chọn Phòng</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={currentSchedule?.date || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giờ Bắt Đầu</Form.Label>
              <Form.Select name="startTime" value={currentSchedule?.startTime || ''} onChange={handleChange}>
                <option value="">Chọn Giờ</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giờ Kết Thúc</Form.Label>
              <Form.Select name="endTime" value={currentSchedule?.endTime || ''} onChange={handleChange}>
                <option value="">Chọn Giờ</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Select name="status" value={currentSchedule?.status || 'Available'} onChange={handleChange}>
                <option value="Available">Còn trống</option>
                <option value="Booked">Đã đặt</option>
                <option value="Unavailable">Không khả dụng</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleCloseModal}>Hủy</Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? 'Cập Nhật' : 'Thêm Mới'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DoctorScheduleManagementPage; 