import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaUserMd } from 'react-icons/fa';
import Avatar from '../../components/common/Avatar';
import { useEffect } from "react";
import axios from 'axios';





// Mock data reflecting the joined User + Doctor model
const initialDoctors = [
  { 
    id: 1, 
    userId: 101,
    fullName: 'Dr. John Doe', 
    username: 'johndoe',
    email: 'john.doe@hospital.com', 
    phone: '123-456-7890', 
    gender: 'Male',
    dateOfBirth: '1980-05-20',
    specialty: 'Cardiology', 
    degree: 'MD, PhD',
    yearOfExperience: 15,
    status: 'Active' 
  },
  { 
    id: 2, 
    userId: 102,
    fullName: 'Dr. Jane Smith', 
    username: 'janesmith',
    email: 'jane.smith@hospital.com', 
    phone: '234-567-8901',
    gender: 'Female',
    dateOfBirth: '1985-11-10',
    specialty: 'Neurology', 
    degree: 'MD',
    yearOfExperience: 10,
    status: 'Active' 
  },
    { 
    id: 3, 
    userId: 103,
    fullName: 'Dr. Emily White', 
    username: 'emilywhite',
    email: 'emily.white@hospital.com', 
    phone: '345-678-9012',
    gender: 'Female',
    dateOfBirth: '1988-02-25',
    specialty: 'Pediatrics', 
    degree: 'MD',
    yearOfExperience: 8,
    status: 'On Leave' 
  },
];


function DoctorManagementPage() {
  const [doctors, setDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


//call the API to get all users
const API_URL_GET = "https://api.demoproject.software/api/Doctor";

const fetchUsers = async () => {
  const response = await axios.get(API_URL_GET);
  return response.data;
};

const loadUsers = async () => {
  try {
    const data = await fetchUsers();
    setDoctors(data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
useEffect(() => {
  
  loadUsers();
}, []);



  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDoctor(null);
    setIsEditing(false);
  };

  const handleShowModal = (doctor = null) => {
    if (doctor) {
      setCurrentDoctor({ ...doctor, password: '' ,dateOfBirth: doctor.dateOfBirth?.split('T')[0] || ''}); // Don't show password on edit

      setIsEditing(true);
    } else {
      // Initialize a new doctor object with all required fields
      setCurrentDoctor({ 
        fullName: '', username: '', password: '', email: '', phone: '', gender: 'Male', dateOfBirth: '',
        specialization: '', degree: '', yearOfExperience: 0, status: 'Active' 
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        const { password, ...doctorToUpdate } = currentDoctor;
  
        const payload = {
          ...doctorToUpdate,
          password: password || null, // Nếu password rỗng thì gửi null
        };
  
        await axios.put(`https://api.demoproject.software/api/edit/${doctorToUpdate.id}`, payload);
      } else {
        await axios.post(`https://api.demoproject.software/api/Doctor`, currentDoctor);
      }
  
      await loadUsers(); // reload danh sách
      handleCloseModal();
    } catch (error) {
      console.error('Save doctor failed:', error.response?.data || error.message);
      alert('Lưu bác sĩ thất bại. Xem console để biết chi tiết.');
    }
  };
  
  
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá bác sĩ này?')) {
      try {
        await axios.delete(`https://api.demoproject.software/api/Doctor/delete/${id}`);
        await loadUsers(); // reload danh sách sau khi xoá
      } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message);
        alert("Xoá bác sĩ thất bại. Xem console để biết chi tiết.");
      }
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoctor(prev => ({ ...prev, [name]: value }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = doctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <Badge bg="success">Active</Badge>;
      case 'On Leave': return <Badge bg="warning">On Leave</Badge>;
      case 'Inactive': return <Badge bg="danger">Inactive</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title"><FaUserMd className="me-2" /> Quản Lý Danh Mục Bác Sĩ</h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Danh sách Bác Sĩ</span>
          {/* <Button variant="primary" onClick={() => handleShowModal()}><FaPlus className="me-2" /> Add Doctor</Button> */}
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="admin-table">
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
                       <Avatar name={doctor.fullName} />
                       <span className='ms-2'>{doctor.fullName}</span>
                    </div>
                  </td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.degree}</td>
                  <td>{doctor.yearOfExperience}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.email}</td>
                  <td>{getStatusBadge(doctor.status)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowModal(doctor)}><FaEdit /></Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(doctor.id)}><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        {totalPages > 1 && (
            <Card.Footer>
                <Pagination className="justify-content-center mb-0">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>{i + 1}</Pagination.Item>
                    ))}
                </Pagination>
            </Card.Footer>
        )}
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Doctor' : 'Add New Doctor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <h5>User Account Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="fullName" value={currentDoctor?.fullName || ''} onChange={handleChange} placeholder="Enter full name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" value={currentDoctor?.username || ''} onChange={handleChange} placeholder="Enter username" disabled={isEditing} />
                </Form.Group>
                 <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={currentDoctor?.password || ''} onChange={handleChange} placeholder={isEditing ? 'Leave blank to keep current password' : 'Enter password'} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={currentDoctor?.email || ''} onChange={handleChange} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="phone" value={currentDoctor?.phone || ''} onChange={handleChange} placeholder="Enter phone number" />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control type="date" name="dateOfBirth" value={currentDoctor?.dateOfBirth || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select name="gender" value={currentDoctor?.gender || 'Male'} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h5>Doctor Specific Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Specialty</Form.Label>
                  <Form.Control type="text" name="specialization" value={currentDoctor?.specialization || ''} onChange={handleChange} placeholder="e.g., Cardiology" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control type="text" name="degree" value={currentDoctor?.degree || ''} onChange={handleChange} placeholder="e.g., MD, PhD" />
                </Form.Group>
                 <Form.Group className="mb-3">
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control type="number" name="yearOfExperience" value={currentDoctor?.yearOfExperience || 0} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Account Status</Form.Label>
                  <Form.Select name="status" value={currentDoctor?.status || 'Active'} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add Doctor'}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DoctorManagementPage; 