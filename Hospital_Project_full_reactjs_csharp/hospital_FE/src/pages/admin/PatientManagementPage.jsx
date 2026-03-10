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
  Nav,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserInjured,
  FaMoneyBillWave,
} from "react-icons/fa";
import Avatar from "../../components/common/Avatar";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import axios from "axios";
import { API_BASE_URL } from '../../services/api';

// Mock data reflecting the joined User + Patient model
const initialPatients = [
  {
    id: 1,
    userId: 201,
    fullName: "Peter Jones",
    username: "peterjones",
    email: "peter.jones@email.com",
    phone: "555-0101",
    gender: "Male",
    dateOfBirth: "1990-06-15",
    address: "123 Main St, Anytown, USA",
    insuranceCode: "ABC123456789",
    emergencyContact: "Jane Jones - 555-0102",
    status: "Active",
    invoices: [
      {
        id: 1,
        type: "Service Package",
        description: "Deluxe Package",
        amount: 103.4,
        date: "2024-03-15",
        status: "Pending",
      },
      {
        id: 2,
        type: "Lab Test",
        description: "Complete Blood Count",
        amount: 75.0,
        date: "2024-03-16",
        status: "Paid",
        details: [
          { name: "Complete Blood Count", quantity: 1, unitPrice: 35.0 },
          { name: "Blood Sugar Test", quantity: 1, unitPrice: 25.0 },
          { name: "Cholesterol Test", quantity: 1, unitPrice: 15.0 },
        ],
      },
      {
        id: 3,
        type: "Prescription",
        description: "Medication - March 2024",
        amount: 45.5,
        date: "2024-03-17",
        status: "Pending",
        details: [
          { name: "Amoxicillin 500mg", quantity: 20, unitPrice: 1.25 },
          { name: "Paracetamol 500mg", quantity: 10, unitPrice: 0.8 },
          { name: "Vitamin C 1000mg", quantity: 30, unitPrice: 0.5 },
        ],
      },
    ],
  },
  {
    id: 2,
    userId: 202,
    fullName: "Mary White",
    username: "marywhite",
    email: "mary.white@email.com",
    phone: "555-0103",
    gender: "Female",
    dateOfBirth: "1985-03-22",
    address: "456 Oak Ave, Anytown, USA",
    insuranceCode: "XYZ987654321",
    emergencyContact: "John White - 555-0104",
    status: "Active",
    invoices: [
      {
        id: 4,
        type: "Service Package",
        description: "Standard Package",
        amount: 56.95,
        date: "2024-03-18",
        status: "Paid",
      },
      {
        id: 5,
        type: "Lab Test",
        description: "X-Ray and Blood Tests",
        amount: 120.0,
        date: "2024-03-19",
        status: "Pending",
        details: [
          { name: "Chest X-Ray", quantity: 1, unitPrice: 80.0 },
          { name: "Blood Type Test", quantity: 1, unitPrice: 25.0 },
          { name: "Urine Test", quantity: 1, unitPrice: 15.0 },
        ],
      },
    ],
  },
];

function PatientManagementPage() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //call the API to get all users
  const API_URL_GET = `${API_BASE_URL}/Patient`;
  const fetchUsers = async () => {
    const response = await axios.get(API_URL_GET);
    return response.data;
  };

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers();
      setPatients(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPatient(null);
    setIsEditing(false);
  };

  const handleShowModal = (patient = null) => {
    if (patient) {
      setCurrentPatient({
        ...patient,
        password: "",
        dateOfBirth: patient.dateOfBirth?.split("T")[0] || "",
        invoices: patient.invoices || [],
      });
      setIsEditing(true);
    } else {
      setCurrentPatient({
        fullName: "",
        username: "",
        password: "",
        email: "",
        address: "",
        phone: "",
        gender: "Male",
        dateOfBirth: "",
        insuranceCode: "",
        emergencyContact: "",
        status: "Active",
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleShowInvoiceModal = (patient) => {
    setCurrentPatient(patient);
    setSelectedInvoiceType("all");
    setShowInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    setCurrentPatient(null);
    setSelectedInvoiceType("all");
    setPaymentMethod("");
  };

  const API_URL_UPDATE = `${API_BASE_URL}/Patient`;

  // const handleSave = async () => {
  //   try {
  //     if (isEditing) {
  //       // PUT update patient
  //       await axios.put(
  //         `${API_URL_UPDATE}/${currentPatient.id}`,
  //         currentPatient
  //       );

  //       // Cập nhật state local
  //       setPatients((prev) =>
  //         prev.map((p) => (p.id === currentPatient.id ? currentPatient : p))
  //       );
  //     } else {
  //       // POST create new patient
  //       const response = await axios.post(API_URL_UPDATE, currentPatient);
  //       const newPatient = response.data;

  //       // Thêm vào state local
  //       setPatients((prev) => [...prev, newPatient]);
  //     }

  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Save patient failed:", error);
  //     alert("Có lỗi xảy ra khi lưu bệnh nhân");
  //   }
  // };

  // const handleSave = () => {
  //   if (isEditing) {
  //     setPatients(
  //       patients.map((p) => (p.id === currentPatient.id ? currentPatient : p))
  //     );
  //   } else {
  //     const newPatient = {
  //       ...currentPatient,
  //       id: Math.max(...patients.map((p) => p.id), 0) + 1,
  //       userId: Math.max(...patients.map((p) => p.userId), 0) + 1,
  //       invoices: [],
  //     };
  //     setPatients([...patients, newPatient]);
  //   }
  //   handleCloseModal();
  // };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (isEditing) {
        // ✅ CASE: EDITING

        // Chỉ update patient hiện tại
        const patientRes = await axios.get(
          `${API_BASE_URL}/Patient/user/${currentPatient.userId}`,
          config
        );
        const patientId = patientRes.data.id;

        const res = await axios.put(
          `${API_URL_UPDATE}/${patientId}`,
          {
            userId: currentPatient.userId,
            address: currentPatient.address,
            insuranceCode: currentPatient.insuranceCode,
            emergencyContact: currentPatient.emergencyContact,
            fullName: currentPatient.fullName,
            email: currentPatient.email,
            phone: currentPatient.phone,
            gender: currentPatient.gender,
            avatarUrl: currentPatient.avatarUrl || null,
            status: currentPatient.status || null,
            dateOfBirth: currentPatient.dateOfBirth,
          },
          config
        );

        const updatedPatient = res.data;
        setPatients((prev) =>
          prev.map((p) => (p.id === patientId ? { ...updatedPatient } : p))
        );
      } else {
        // 1. Tạo User mới trước
        const userRes = await axios.post(
          `${API_BASE_URL}/User/create`,
          {
            username: currentPatient.username,
            password: currentPatient.password,
            fullName: currentPatient.fullName,
            email: currentPatient.email,
            address: currentPatient.address,
            phone: currentPatient.phone,
            roleId: 2,
            gender: currentPatient.gender,
            dateOfBirth: currentPatient.dateOfBirth,
            status: currentPatient.status,
          },
          config
        );

        const newUserId = userRes.data.id;

        if (newUserId) {
          const patientRes = await axios.get(
            `${API_BASE_URL}/Patient/user/${newUserId}`,
            config
          );

          console.log("✅ Patient found:", patientRes.data);

          const patientId = patientRes.data.id;
          // 2. Update Patient hiện tại, gán userId mới
          const res = await axios.put(
            `${API_URL_UPDATE}/${patientId}`,
            {
              userId: newUserId,
              address: currentPatient.address,
              insuranceCode: currentPatient.insuranceCode,
              emergencyContact: currentPatient.emergencyContact,

              fullName: currentPatient.fullName,
              email: currentPatient.email,
              phone: currentPatient.phone,
              gender: currentPatient.gender,
              avatarUrl: currentPatient.avatarUrl || null,
              status: currentPatient.status || null,
              dateOfBirth: currentPatient.dateOfBirth,
            },
            config
          );

          const updatedPatient = res.data;

          // Update local state
          setPatients((prev) =>
            prev.map((p) =>
              p.id === patientId ? { ...updatedPatient, user: userRes.data } : p
            )
          );
        } else {
          // 3. Tạo mới Patient (nếu không phải edit)
          const patientRes = await axios.post(
            `${API_BASE_URL}/Patient`,
            {
              userId: newUserId,
              address: currentPatient.address,
              insuranceCode: currentPatient.insuranceCode,
              emergencyContact: currentPatient.emergencyContact,
            },
            config
          );

          const newPatient = patientRes.data;
          setPatients((prev) => [...prev, newPatient]);
        }
      }

      handleCloseModal();
      loadUsers();
      alert("Lưu bệnh nhân thành công!");
    } catch (error) {
      console.error(
        "Save patient failed:",
        error.response?.data || error.message
      );
      alert("Có lỗi xảy ra khi lưu bệnh nhân");
    }
  };

  const API_URL_GET_USER_ROLE = `${API_BASE_URL}/UserRole/user`;
  const getRoleIdByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API_URL_GET_USER_ROLE}/${userId}`);
      const roles = response.data;

      if (Array.isArray(roles) && roles.length > 0) {
        return roles[0].id; // chính là roleId
      }

      return null;
    } catch (error) {
      console.error("Lỗi khi lấy roleId:", error);
      return null;
    }
  };

  const API_URL_DEL = `${API_BASE_URL}/Patient`;
  const API_URL_DEL_USER = `${API_BASE_URL}/User/delete`;
  const API_URL_DEL_USER_ROLE = `${API_BASE_URL}/UserRole`;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const handleDelete = async (id, userId) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa bệnh nhân này? Tài khoản người dùng của họ cũng sẽ bị xóa."
      )
    ) {
      try {
        const roleId = await getRoleIdByUserId(userId);
        if (!roleId) {
          alert("Không tìm thấy role của người dùng.");
          return;
        }

        await axios.delete(
          `${API_URL_DEL_USER_ROLE}/${userId}/${roleId}`,
          config
        );
        await axios.delete(`${API_URL_DEL}/${id}`, config);
        await axios.delete(`${API_URL_DEL_USER}/${userId}`, config);

        // Cập nhật lại danh sách local
        setPatients((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Xóa bệnh nhân thất bại.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleProcessPayment = (invoiceId) => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setPatients(
      patients.map((p) => {
        if (p.id === currentPatient.id) {
          return {
            ...p,
            invoices: p.invoices.map((inv) => {
              if (inv.id === invoiceId) {
                return {
                  ...inv,
                  status: "Paid",
                  paymentMethod: paymentMethod,
                };
              }
              return inv;
            }),
          };
        }
        return p;
      })
    );

    setPaymentMethod("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge bg="success">Active</Badge>;
      case "Inactive":
        return <Badge bg="danger">Inactive</Badge>;
      case "Paid":
        return <Badge bg="success">Paid</Badge>;
      case "Pending":
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const filteredInvoices =
    currentPatient && Array.isArray(currentPatient.invoices)
      ? currentPatient.invoices.filter(
          (invoice) =>
            selectedInvoiceType === "all" ||
            invoice.type === selectedInvoiceType
        )
      : [];

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaUserInjured className="me-2" /> Quản Lý Danh Mục Bệnh Nhân
          </h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">

          <h5 className="mb-0">Danh Sách Bệnh Nhân</h5>
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-2" /> Thêm thông tin bệnh nhân
          </Button>
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
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Mã Bảo Hiểm</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((patient, index) => (
                    <tr key={patient.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Avatar name={patient.fullName} />
                          <span className="ms-2">{patient.fullName}</span>
                        </div>
                      </td>
                      <td>{patient.phone}</td>
                      <td>{patient.email}</td>
                      <td>{patient.insuranceCode}</td>
                      <td>{getStatusBadge(patient.status)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowModal(patient)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2"
                          onClick={() => handleDelete(patient.id, patient.userId)}
                        >
                          <FaTrash />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleShowInvoiceModal(patient)}
                        >
                          <FaMoneyBillWave />
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
                  {[...Array(Math.ceil(patients.length / itemsPerPage))].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === Math.ceil(patients.length / itemsPerPage)} 
                  />
                  <Pagination.Last 
                    onClick={() => paginate(Math.ceil(patients.length / itemsPerPage))} 
                    disabled={currentPage === Math.ceil(patients.length / itemsPerPage)} 
                  />
                </Pagination>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Patient Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Patient" : "Add New Patient"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <h5>User Account Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={currentPatient?.fullName || ""}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={currentPatient?.username || ""}
                    onChange={handleChange}
                    placeholder="Enter username"
                    disabled={isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={currentPatient?.password || ""}
                    onChange={handleChange}
                    placeholder={
                      isEditing
                        ? "Leave blank to keep current password"
                        : "Enter password"
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentPatient?.email || ""}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={currentPatient?.phone || ""}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={currentPatient?.dateOfBirth || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={currentPatient?.gender || "Male"}
                        onChange={handleChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h5>Additional Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={currentPatient?.address || ""}
                    onChange={handleChange}
                    placeholder="Enter full address"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Insurance Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="insuranceCode"
                    value={currentPatient?.insuranceCode || ""}
                    onChange={handleChange}
                    placeholder="Enter insurance code"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Emergency Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContact"
                    value={currentPatient?.emergencyContact || ""}
                    onChange={handleChange}
                    placeholder="Name - Phone Number"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={currentPatient?.status || "Active"}
                    onChange={handleChange}
                  >
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
            {isEditing ? "Save Changes" : "Add Patient"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Invoice Modal */}
      <Modal show={showInvoiceModal} onHide={handleCloseInvoiceModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaMoneyBillWave className="me-2" />
            Patient Invoices - {currentPatient?.fullName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link
                active={selectedInvoiceType === "all"}
                onClick={() => setSelectedInvoiceType("all")}
              >
                All Invoices
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedInvoiceType === "Service Package"}
                onClick={() => setSelectedInvoiceType("Service Package")}
              >
                Service Packages
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedInvoiceType === "Lab Test"}
                onClick={() => setSelectedInvoiceType("Lab Test")}
              >
                Lab Tests
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedInvoiceType === "Prescription"}
                onClick={() => setSelectedInvoiceType("Prescription")}
              >
                Prescriptions
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <React.Fragment key={invoice.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{invoice.type}</td>
                    <td>{invoice.description}</td>
                    <td>{invoice.date}</td>
                    <td>${invoice.amount.toFixed(2)}</td>
                    <td>{getStatusBadge(invoice.status)}</td>
                    <td>
                      {invoice.status === "Pending" && (
                        <div className="d-flex align-items-center">
                          <Form.Select
                            size="sm"
                            className="me-2"
                            style={{ width: "120px" }}
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="transfer">Transfer</option>
                          </Form.Select>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleProcessPayment(invoice.id)}
                          >
                            Pay
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                  {/* Chi tiết hóa đơn cho Lab Tests và Prescriptions */}
                  {(invoice.type === "Lab Test" ||
                    invoice.type === "Prescription") &&
                    invoice.details && (
                      <tr>
                        <td colSpan="7" className="p-0">
                          <div className="bg-light p-3">
                            <h6 className="mb-3">
                              Chi tiết{" "}
                              {invoice.type === "Lab Test"
                                ? "xét nghiệm"
                                : "đơn thuốc"}
                              :
                            </h6>
                            <Table size="sm" className="mb-0">
                              <thead>
                                <tr>
                                  <th>Tên</th>
                                  <th>Số lượng</th>
                                  <th>Đơn giá</th>
                                  <th>Thành tiền</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoice.details.map((detail, idx) => (
                                  <tr key={idx}>
                                    <td>{detail.name}</td>
                                    <td>{detail.quantity}</td>
                                    <td>${detail.unitPrice.toFixed(2)}</td>
                                    <td>
                                      $
                                      {(
                                        detail.quantity * detail.unitPrice
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                                <tr className="fw-bold">
                                  <td colSpan="3" className="text-end">
                                    Tổng cộng:
                                  </td>
                                  <td>${invoice.amount.toFixed(2)}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInvoiceModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PatientManagementPage;
