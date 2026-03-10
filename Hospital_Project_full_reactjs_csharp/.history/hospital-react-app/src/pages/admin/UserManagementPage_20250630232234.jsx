import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import Avatar from '../../components/common/Avatar';
import axios from 'axios';
import { useEffect } from 'react';


//call the API to create a new user
const API_URL = 'http://localhost:5247/api/User/create'; 
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

//call the API to get all users
const API_URL_GET= 'http://localhost:5247/api/User'; 

const fetchUsers = async () => {
  const response = await axios.get(API_URL_GET); 
  return response.data;
};

//call API get Roles
const [roles, setRoles] = useState([]);
const fetchRoles = async () => {
  try {
    const response = await axios.get('http://localhost:5247/api/Roles');
    setRoles(response.data);
  } catch (error) {
    console.error('Failed to fetch roles', error);
  }
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
    fetchRoles();
    if (user) {
      setCurrentUser({ ...user, password: '' });
      setIsEditing(true);
      setAvatarPreview(user.avatar);
    } else {
      setCurrentUser({
        username: '',
        fullname: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
        gender: 'Male', 
        role: 'Receptionist',
        status: 'Active',
        avatar: null
      });      setIsEditing(false);
      setAvatarPreview(null);
    }
    setShowModal(true);
  };

  // const handleSave = () => {
  //   if (isEditing) {
  //     setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
  //   } else {
  //     const newUser = { ...currentUser, id: Math.max(...users.map(u => u.id), 0) + 1 };
  //     setUsers([...users, newUser]);
  //   }
  //   handleCloseModal();
  // };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
  
    loadUsers();
  }, []);
  
  const handleSave = async () => {
    try {
      if (isEditing) {
        
        setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
      } else {
        const userToCreate = { 
          username: currentUser.username,
          fullname: currentUser.fullname,
          password: currentUser.password,
          email: currentUser.email,
          phone: currentUser.phone,
          dateOfBirth: currentUser.dateOfBirth,
          role: currentUser.role,
          gender: currentUser.gender,
          status: currentUser.status,
          avatar: currentUser.avatar 
        };
  
        const createdUser = await createUser(userToCreate);
        setUsers([...users, createdUser]);
      }
  
      handleCloseModal();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please check the input and try again.');
    }
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
                  <td>{user.roles?.join(', ')}</td>

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
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" name="username" value={currentUser?.username || ''} onChange={handleChange} placeholder="Enter user name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullname" value={currentUser?.fullname || ''} onChange={handleChange} placeholder="Enter full name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={currentUser?.email || ''} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phone" value={currentUser?.phone || ''} onChange={handleChange} placeholder="Enter phone number" />
            </Form.Group>
             <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={currentUser?.password || ''} onChange={handleChange} placeholder={isEditing ? 'Leave blank to keep current password' : 'Enter password'} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={currentUser?.dateOfBirth || ''}
                onChange={handleChange}
                placeholder="Select date of birth"
              />
            </Form.Group>

            <Row>
            <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={currentUser?.gender || 'Male'}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={currentUser?.role || ''} onChange={handleChange}>
                    <option value="">-- Select Role --</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.description}
                      </option>
                    ))}
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
