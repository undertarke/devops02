import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import Avatar from '../../components/common/Avatar';
import axios from 'axios';
import { createUser } from '../../services/userService';


//call the API to create a new user
const API_URL = 'http://localhost:5247/api/User'; 
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Mock data for non-doctor users
const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@hospital.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Alice Johnson', email: 'alice.j@hospital.com', role: 'Receptionist', status: 'Active' },
  { id: 3, name: 'Bob Williams', email: 'bob.w@hospital.com', role: 'Accountant', status: 'Inactive' },
  { id: 4, name: 'Charlie Brown', email: 'charlie.b@hospital.com', role: 'Receptionist', status: 'Active' },
];

function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
    setIsEditing(false);
    setAvatarPreview(null);
  };

  const handleShowModal = (user = null) => {
    if (user) {
      setCurrentUser({ ...user, password: '' });
      setIsEditing(true);
      setAvatarPreview(user.avatar);
    } else {
      setCurrentUser({ name: '', email: '', password: '', role: 'Receptionist', status: 'Active', avatar: null });
      setIsEditing(false);
      setAvatarPreview(null);
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
    } else {
      const newUser = { ...currentUser, id: Math.max(...users.map(u => u.id), 0) + 1 };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

   const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarPreview(newAvatarUrl);
      setCurrentUser(prev => ({ ...prev, avatar: newAvatarUrl }));
    }
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <Badge bg="success">Active</Badge>;
      case 'Inactive': return <Badge bg="danger">Inactive</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaUsers className="me-2" /> User Management
          </h2>
          <p className="text-muted">
            Manage staff accounts (e.g., Admin, Receptionist). To manage doctors, please use the "Doctor Management" page.
          </p>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Staff List</span>
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-2" /> Add User
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar src={user.avatar} name={user.name} />
                      <span className='ms-2'>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowModal(user)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}>
                      <FaTrash />
                    </Button>
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
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Card.Footer>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 text-center">
                <Avatar src={avatarPreview} name={currentUser?.name} size={100} />
                <Form.Control type="file" name="avatar" onChange={handleAvatarChange} className="mt-3" accept="image/*" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={currentUser?.name || ''} onChange={handleChange} placeholder="Enter full name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={currentUser?.email || ''} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>
             <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={currentUser?.password || ''} onChange={handleChange} placeholder={isEditing ? 'Leave blank to keep current password' : 'Enter password'} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={currentUser?.role || ''} onChange={handleChange}>
                    <option value="Admin">Admin</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Accountant">Accountant</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                 <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={currentUser?.status || 'Active'} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? 'Save Changes' : 'Add User'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserManagementPage;
