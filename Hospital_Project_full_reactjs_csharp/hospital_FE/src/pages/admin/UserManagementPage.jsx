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
import { FaPlus, FaEdit, FaTrash, FaUsers, FaKey } from "react-icons/fa";
import Avatar from "../../components/common/Avatar";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import axios from "axios";
import { API_BASE_URL } from '../../services/api';
import { getCurrentUserRole, isTokenExpired, checkTokenAndProceed } from '../../utils/auth';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sửa các URL constants
const API_URL = `${API_BASE_URL}/User/create`;
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

//call the API to get all users
const API_URL_GET = `${API_BASE_URL}/User`;

const fetchUsers = async () => {
  const response = await axios.get(API_URL_GET);
  return response.data;
};

const API_URL_UPDATE = `${API_BASE_URL}/User/edit`;
export const updateUser = async (id, userData) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.put(`${API_URL_UPDATE}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteUser = async (id) => {
  const token = localStorage.getItem("authToken");
  return await axios.delete(
    `${API_BASE_URL}/User/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Mock data for non-doctor users


const modalStyles = `
  .user-edit-modal .modal-content {
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .user-edit-modal .modal-header {
    background-color: #f8f9fa;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 1.5rem;
  }

  .user-edit-modal .modal-title {
    font-weight: 600;
    color: #2c3e50;
  }

  .user-edit-modal .modal-body {
    background-color: white;
  }

  .user-edit-modal .form-label {
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .user-edit-modal .form-control,
  .user-edit-modal .form-select {
    border-radius: 8px;
    border: 1px solid #dee2e6;
    padding: 0.625rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .user-edit-modal .form-control:focus,
  .user-edit-modal .form-select:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
  }

  .user-edit-modal .modal-footer {
    background-color: #f8f9fa;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 1.5rem;
  }

  .user-edit-modal .btn {
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    font-weight: 500;
  }

  .user-edit-modal .btn-primary {
    background-color: #3498db;
    border-color: #3498db;
  }

  .user-edit-modal .btn-primary:hover {
    background-color: #2980b9;
    border-color: #2980b9;
  }

  .user-edit-modal .btn-secondary {
    background-color: #95a5a6;
    border-color: #95a5a6;
  }

  .user-edit-modal .btn-secondary:hover {
    background-color: #7f8c8d;
    border-color: #7f8c8d;
  }
`;

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [roles, setRoles] = useState([]);
  const [newRoleId, setNewRoleId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [permissionUser, setPermissionUser] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const getRoleIdByName = (roleName) => {
    const found = roles.find((r) => r.name === roleName);
    return found ? found.id : null;
  };

  const handleShowPermissionModal = (user) => {
    setPermissionUser(user);
    setShowPermissionModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
    setIsEditing(false);
    setAvatarPreview(null);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // format: yyyy-MM-dd
  };

  // Add a function to handle token expiration
  const handleTokenExpiration = () => {
    localStorage.clear(); // Clear all localStorage data
    window.location.href = "/login"; // Redirect to login page
  };

  // Update checkTokenAndProceed to use the new handler
  const checkTokenAndProceedWithRedirect = async (callback) => {
    if (isTokenExpired()) {
      handleTokenExpiration();
      return;
    }
    try {
      await callback();
    } catch (error) {
      if (error.response?.status === 401) {
        handleTokenExpiration();
      } else {
        console.error('Error:', error);
      }
    }
  };

  const handleShowModal = async (user = null) => {
    await checkTokenAndProceedWithRedirect(async () => {
      const role = getCurrentUserRole();
      console.log("Current role from token:", role);
      if (user) {
        if (role?.trim() !== "Admin") {
          alert("Only Admins can edit users.");
          return;
        }

        // Log user data for debugging
        console.log("User data being set:", user);

        setCurrentUser({
          id: user.id,
          username: user.username || "",
          fullName: user.fullName || user.name || "",
          email: user.email || "",
          address: user.address || "",
          phone: user.phone || "",
          dateOfBirth: formatDate(user.dateOfBirth) || "",
          gender: user.gender || "Male",
          status: user.status || "Active",
          role: getRoleIdByName(user.roles?.[0]) || roles[0]?.id || "",
          avatar: user.avatar || null
        });
        setIsEditing(true);
        setAvatarPreview(user.avatar);
      } else {
        setCurrentUser({
          username: "",
          fullName: "",
          email: "",
          address:"",
          password: "",
          phone: "",
          dateOfBirth: "",
          gender: "Male",
          role: roles[0]?.id || "",
          status: "Active",
          avatar: null,
        });
        setIsEditing(false);
        setAvatarPreview(null);
      }

      // Log state for debugging
      console.log("Setting showModal to true");
      setShowModal(true);
    });
  };

  // Add useEffect to log when modal state changes
  useEffect(() => {
    console.log("Modal state changed:", showModal);
  }, [showModal]);

  // Add useEffect to log when currentUser changes
  useEffect(() => {
    console.log("Current user changed:", currentUser);
  }, [currentUser]);

  // const handleSave = () => {
  //   if (isEditing) {
  //     setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
  //   } else {
  //     const newUser = { ...currentUser, id: Math.max(...users.map(u => u.id), 0) + 1 };
  //     setUsers([...users, newUser]);
  //   }
  //   handleCloseModal();
  // };
  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //call API get Roles
    const fetchRoles = async () => {
      try {
        const response = await axios.get(

          `${API_BASE_URL}/Roles`
        );
        // Lọc bỏ role Doctor và Patient
        const filteredRoles = response.data.filter(
          (role) =>
            // role.name !== "Doctor" &&
            // role.name !== "Patient" &&
            role.name !== "Admin" 
        );
        setRoles(filteredRoles);
      } catch (error) {
        console.error("Failed to fetch roles", error);
      }
    };

    loadUsers();
    fetchRoles();
  }, []);

  const handleSavePermissionChange = async () => {
    if (!newRoleId || !permissionUser) return;

    try {
      const token = localStorage.getItem("authToken");

      // Payload phải rõ ràng
      const payload = {
        userId: permissionUser.id,
        roleIds: [parseInt(newRoleId)],
      };

      await axios.post(

        `${API_BASE_URL}/UserRole/assign`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Cập nhật quyền thành công!");
      setShowPermissionModal(false);
      await new Promise((r) => setTimeout(r, 300));
      loadUsers(); // reload danh sách
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Cập nhật quyền thất bại.");
    }
  };

  const handleSave = async () => {
    await checkTokenAndProceedWithRedirect(async () => {
      try {
        if (isEditing) {
          const userToUpdate = {
            username: currentUser.username,
            fullname: currentUser.fullName,
            email: currentUser.email,
            address: currentUser.address,
            phone: currentUser.phone,
            dateOfBirth: currentUser.dateOfBirth,
            roleId: currentUser.role,
            gender: currentUser.gender,
            status: currentUser.status,
            avatar: currentUser.avatar,
            password: currentUser.password || null, // nếu không đổi pass thì null
          };

          const updated = await updateUser(currentUser.id, userToUpdate);
          setUsers(users.map((u) => (u.id === currentUser.id ? updated : u)));
          loadUsers();
          toast.success("Sửa thông tin người dùng thành công.");

        } else {
          const userToCreate = {
            username: currentUser.username,
            fullname: currentUser.fullName,
            password: currentUser.password,
            email: currentUser.email,
            address: currentUser.address,
            phone: currentUser.phone,
            dateOfBirth: currentUser.dateOfBirth,
            roleId: currentUser.role,
            gender: currentUser.gender,
            status: currentUser.status,
            avatar: currentUser.avatar,
          };

          const createdUser = await createUser(userToCreate);
          setUsers([...users, createdUser]);
          loadUsers();
          toast.success("Đăng ký người dùng thành công.");
        }

        handleCloseModal();
      } catch (error) {
        console.error("Error saving user:", error);
         toast.success("Lưu thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    });
  };

 const handleDelete = async (id) => {
  await checkTokenAndProceedWithRedirect(async () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      await loadUsers();
      toast.success("Xóa tài khoản thành công.");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Xóa tài khoản thất bại. Vui lòng kiểm tra lại.");
    }
  });
};


  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarPreview(newAvatarUrl);
      setCurrentUser((prev) => ({ ...prev, avatar: newAvatarUrl }));
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
      case "Active":
        return <Badge bg="success">Active</Badge>;
      case "Inactive":
        return <Badge bg="danger">Inactive</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  useEffect(() => {
    // Add styles to document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = modalStyles;
    document.head.appendChild(styleElement);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaUsers className="me-2" /> User Management
          </h2>
          <p className="text-muted">
            Manage staff accounts (e.g., Admin, Receptionist). To manage
            doctors, please use the "Doctor Management" page.
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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Table responsive hover className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
                <th>Phân quyền</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar src={user.avatar} name={user.username} />
                      <span className="ms-2">{user.name}</span>
                    </div>
                  </td>
                  <td>{user.fullName ? user.fullName : "N/A"}</td>

                  <td>{user.email}</td>
                  <td>{user.roles?.join(", ")}</td>

                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(user)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowPermissionModal(user)}
                    >
                      <FaKey />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          )}
        </Card.Body>
        {totalPages > 1 && (
          <Card.Footer>
            <Pagination className="justify-content-center mb-0">
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Card.Footer>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered
        backdrop="static"
        size="lg"
        className="user-edit-modal"
      >
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title>{isEditing ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            {/* Avatar Section */}
            <div className="text-center mb-4">
              <Avatar 
                src={avatarPreview} 
                name={currentUser?.fullName || currentUser?.username} 
                size={100} 
              />
              <Form.Control
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="mt-3 mx-auto"
                style={{ maxWidth: '300px' }}
              />
            </div>

            {/* Form Fields in Grid Layout */}
            <Row>
              {/* Left Column */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={currentUser?.username || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={currentUser?.fullName || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentUser?.email || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={currentUser?.phone || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Right Column */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={currentUser?.dateOfBirth || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={currentUser?.gender || "Male"}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={currentUser?.role || ""}
                    onChange={handleChange}
                    disabled={isEditing}
                  >
                     <option value="">-- Select Role --</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={currentUser?.address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {!isEditing && (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={currentUser?.password || ""}
                      onChange={handleChange}
                      required={!isEditing}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={currentUser?.confirmPassword || ""}
                      onChange={handleChange}
                      required={!isEditing}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPermissionModal}
        onHide={() => setShowPermissionModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Phân quyền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {permissionUser && (
            <>
              <p>
                <strong>Tên đăng nhập:</strong> {permissionUser.username}
              </p>
              <p>
                <strong>Họ tên:</strong>{" "}
                {permissionUser.fullName || permissionUser.name}
              </p>
              <p>
                <strong>Chức vụ:</strong>{" "}
                {permissionUser.roles?.join(", ") || "N/A"}
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Vai trò</Form.Label>
                <Form.Select
                  value={newRoleId}
                  onChange={(e) => setNewRoleId(parseInt(e.target.value))}
                >
                  {roles
                    .filter(
                      (role) =>
                        !["Admin", "Doctor", "Patient"].includes(role.name)
                    )
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPermissionModal(false)}
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSavePermissionChange}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserManagementPage;
