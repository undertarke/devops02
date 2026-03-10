import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingPage.css";
import { generateTimeSlots } from "../data/mockData";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ServicePackageSelector from "../components/common/ServicePackageSelector";
import InvoicePreview from "../components/common/InvoicePreview";
import api, { API_BASE_URL } from '../services/api';

const BookingPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [branchDetails, setBranchDetails] = useState(null);

  const [branchList, setBranchList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedService = searchParams.get("service");
  const servicePrice = searchParams.get("price");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const userId = authData?.userId;
        
        console.log("🔍 Debug - AuthData:", authData);
        console.log("🔍 Debug - UserID:", userId);

        if (!userId) {
          toast.warning("Vui lòng đăng nhập để đặt lịch khám.");
          navigate("/login", { state: { from: location.pathname } });
          return;
        } 

        console.log("🚀 Fetching patient data for user:", userId);
        
        // Thử fetch patient data trước
        try {
          const patientRes = await api.get(`/Patient/user/${userId}`);
          setPatientId(patientRes.data.id);
        } catch (patientError) {
          console.log("⚠️ Patient API error:", patientError.response?.status, patientError.response?.data);
          
          // Nếu không tìm thấy patient record, tạo mới hoặc handle khác
          if (patientError.response?.status === 404) {
            console.log("📝 Patient record not found, user might not be a patient");
            toast.warning("Tài khoản của bạn chưa được thiết lập làm bệnh nhân. Vui lòng liên hệ admin.");
            return;
          }
          
          // Chỉ redirect khi thực sự là auth error
          if (patientError.response?.status === 401 || patientError.response?.status === 403) {
            localStorage.removeItem("authData");
            localStorage.removeItem("authToken");
            toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            navigate("/login", { state: { from: location.pathname } });
            return;
          }
          
          throw patientError; // Re-throw để catch bên ngoài handle
        }
        
        // Fetch user info
        try {
          const userRes = await api.get(`/User/${userId}`);
          console.log("✅ User data:", userRes.data);
          setPatientInfo({
            fullName: userRes.data.fullName,
            email: userRes.data.email,
            phone: userRes.data.phone,
            username: userRes.data.username
          });
        } catch (userError) {
          console.log("⚠️ User API error:", userError.response?.status, userError.response?.data);
          
          // Auth error cho User API
          if (userError.response?.status === 401 || userError.response?.status === 403) {
            localStorage.removeItem("authData");
            localStorage.removeItem("authToken");
            toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            navigate("/login", { state: { from: location.pathname } });
            return;
          }
          
          // User không tồn tại hoặc lỗi khác
          console.warn("User data fetch failed:", userError.message);
        }
        
      } catch (error) {
        console.error("💥 General error in fetchPatientData:", error);
        
        // Chỉ handle những lỗi chưa được handle ở trên
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("authData");
          localStorage.removeItem("authToken");
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          navigate("/login", { state: { from: location.pathname } });
        } else {
          console.warn("Non-auth error:", error.message);
          toast.error("Có lỗi khi tải thông tin. Vui lòng thử lại.");
        }
      }
    };

    fetchPatientData();
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!selectedDoctor) return;

    api
      .get(`/DoctorSchedule/doctor/${selectedDoctor}`)
      .then((res) => setDoctorSchedules(res.data))
      .catch((err) => console.error("Failed to load schedule", err));
  }, [selectedDoctor]);

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get(`/Branch`);
        setBranchList(response.data);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (!selectedBranch) {
      setDoctorList([]);
      setBranchDetails(null);
      return;
    }

    const fetchBranchData = async () => {
      try {
        // Fetch doctors for the branch
        const doctorsResponse = await api.get(
          `/Doctor/branchId/${selectedBranch}`
        );
        setDoctorList(doctorsResponse.data);
        
        // Fetch branch details
        const branchResponse = await api.get(`/Branch/${selectedBranch}`);
        setBranchDetails(branchResponse.data);
      } catch (error) {
        console.error("Failed to fetch branch data:", error);
        setDoctorList([]);
        setBranchDetails(null);
      }
    };

    fetchBranchData();
  }, [selectedBranch]);

  useEffect(() => {
    if (!selectedDoctor || !selectedDate) {
      setAvailableSlots([]);
      return;
    }

    setLoading(true);

    const selectedDateString = selectedDate.toLocaleDateString("en-CA");
    const filtered = doctorSchedules.filter((s) => {
      const scheduleDate = s.date.split("T")[0];
      return scheduleDate === selectedDateString && s.status?.toLowerCase() === "available";
    });

    // Chuyển sang Date object để render giờ
    const slots = filtered.map((s) => {
      return {
        id: s.id,
        startTime: new Date(`${s.date.split("T")[0]}T${s.startTime}`),
        endTime: new Date(`${s.date.split("T")[0]}T${s.endTime}`),
      };
    });

    setAvailableSlots(slots);
    setLoading(false);
  }, [selectedDate, doctorSchedules]);

  // Set doctor details when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctorList.find((d) => d.id === parseInt(selectedDoctor));
      setDoctorDetails(doctor);
    } else {
      setDoctorDetails(null); 
    }
  }, [selectedDoctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation - không cần check auth ở đây vì đã check ở useEffect
    if (!patientId) {
      toast.warning("Vui lòng đăng nhập để đặt lịch khám.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    
    if (!selectedDoctor || !selectedDate || !selectedSlot || !selectedBranch || !selectedPackage) {
      toast.warning("Vui lòng điền đầy đủ thông tin bao gồm gói dịch vụ");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        doctorId: parseInt(selectedDoctor),
        branchId: parseInt(selectedBranch),
        patientId: patientId,
        appointmentDate: selectedDate.toISOString().split("T")[0],
        startTime: selectedSlot.startTime.toTimeString().substring(0, 5), // "HH:mm"
        endTime: selectedSlot.endTime.toTimeString().substring(0, 5),
        note: note || "",
        servicePackage: selectedPackage?.name || "",
        packagePrice: selectedPackage?.price || 0
      };

      const appointmentRes = await api.post("/Appointment", payload);
      const appointmentId = appointmentRes.data?.id;

    if (!appointmentId) throw new Error("Không thể lấy appointmentId");
    const invoiceDetails = selectedPackage.items.map((item) => ({
          itemType: item.itemType,
          itemId: item.itemId,
          description: item.itemName,
          quantity: 1,
          unitPrice: item.itemPrice,
          totalPrice: item.itemPrice * 1,
        }));

   
    console.log("Payload gửi đi:", selectedPackage);

    const totalAmount = invoiceDetails.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    await api.post("/Invoices/createdetails", {
      appointmentId,
      patientId,
      totalAmount,
      status: "Unpaid",
      note: `Hóa đơn cho lịch khám ngày ${payload.appointmentDate}`,
      invoiceDetails,
    });


      // console.log("Payload gửi đi:", payload);
      // await api.post(`/Appointment`, payload);

      toast.success("Đặt lịch khám thành công!");
      setTimeout(() => {
        navigate("/appointments");
      }, 2000);
    } catch (err) {
      console.error("Booking error:", err);
      
      // Handle authentication errors một cách cẩn thận
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("authData");
        localStorage.removeItem("authToken");
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        navigate("/login", { state: { from: location.pathname } });
      } else {
        // Hiển thị lỗi cụ thể hơn nếu có
        const errorMessage = err.response?.data?.message || err.message || "Đặt lịch thất bại. Vui lòng thử lại.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Đặt lịch khám</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className="item">Đặt lịch khám</span>
          </div>
        </div>
      </section>

      <Container className="py-5 booking-page">
        <Row className="justify-content-center">
          <Col xs={12} lg={11} xl={12}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {selectedService && (
                    <Card className="mb-4">
                      <Card.Body>
                        <h5 className="mb-3">Gói dịch vụ đã chọn từ trang giá</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="text-capitalize mb-2">
                              Gói {selectedService}
                            </h6>
                            <p className="text-muted mb-0">
                              Giá gói: {servicePrice} VNĐ
                            </p>
                          </div>
                          <Link
                            to="/pricing"
                            className="btn btn-outline-primary"
                          >
                            Thay đổi gói
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  )}

                  <div className="booking-section">
                    <Row>
                      <Col md={6} className="mb-4">
                        <Card className="h-100">
                          <Card.Body>
                            <h5 className="mb-3">Chọn chi nhánh & Bác sĩ</h5>
                          <Form.Group className="mb-3">
                            <Form.Label>Chi nhánh</Form.Label>
                            <Form.Select
                              value={selectedBranch}
                              onChange={(e) =>
                                setSelectedBranch(e.target.value)
                              }
                              disabled={loading}
                            >
                              <option value="">Chọn chi nhánh</option>
                              {branchList.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                  {branch.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Bác sĩ</Form.Label>
                            <Form.Select
                              value={selectedDoctor}
                              onChange={(e) =>
                                setSelectedDoctor(e.target.value)
                              }
                              disabled={!selectedBranch || loading}
                            >
                              <option value="">Chọn bác sĩ</option>
                              {doctorList.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                  Dr. {doctor.fullName} - {doctor.specialization}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>

                          {doctorDetails && (
                            <div className="doctor-info mt-3 p-3 bg-light rounded">
                              <h6>Thông tin bác sĩ</h6>
                              <p className="mb-1">
                                <strong>Chuyên khoa:</strong> {doctorDetails.specialization}
                              </p>
                              <p className="mb-1">
                                <strong>Kinh nghiệm:</strong> {doctorDetails.experience || 'N/A'} năm
                              </p>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Card className="h-100">
                        <Card.Body>
                          <h5 className="mb-3">Chọn ngày & Giờ khám</h5>

                          <div className="calendar-container mb-4">
                            <Calendar
                              onChange={setSelectedDate}
                              value={selectedDate}
                              minDate={new Date()}
                              className="w-100"
                              tileDisabled={({ date }) =>
                                date < new Date().setHours(0, 0, 0, 0)
                              }
                            />
                          </div>

                          <Form.Group>
                            <Form.Label>Khung giờ có sẵn</Form.Label>
                            <div className="time-slots-grid">
                              {loading ? (
                                <div className="text-center py-4">
                                  <LoadingSpinner />
                                </div>
                              ) : availableSlots.length > 0 ? (
                                <div className="d-grid gap-2">
                                  {availableSlots.map((slot, index) => (
                                    <Button
                                      key={index}
                                      variant={
                                        selectedSlot === slot ? "primary" : "outline-primary"
                                      }
                                      onClick={() => setSelectedSlot(slot)}
                                      className="text-start"
                                    >
                                      {slot.startTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false, 
                                      })}{" "}
                                      -{" "}
                                      {slot.endTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false, 
                                      })}
                                    </Button>
                                  ))}
                                </div>
                              ) : (
                                <Alert variant="info">
                                  Không có khung giờ trống cho ngày đã chọn.
                                </Alert>
                              )}
                            </div>
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  </div>

                  {/* Service Package Selection */}
                  <div className="booking-section">
                    <ServicePackageSelector
                      selectedPackage={selectedPackage}
                      onSelectPackage={setSelectedPackage}
                      disabled={loading}
                    />
                  </div>




                  {/* Invoice Preview - only show when all main info is selected */}
                  {selectedPackage && selectedDoctor && selectedDate && selectedSlot && (
                    
                    <div className="booking-section">
                      
                      <InvoicePreview
                        selectedPackage={selectedPackage}
                        doctorDetails={doctorDetails}
                        branchDetails={branchDetails}
                        selectedDate={selectedDate}
                        selectedSlot={selectedSlot}
                        patientInfo={patientInfo}
                      />
                    </div>
                  )}

                  <div className="booking-section">
                    <Card className="mb-4">
                      <Card.Body>
                        <h5 className="mb-3">Thông tin bổ sung</h5>
                        <Form.Group>
                          <Form.Label>Ghi chú cho bác sĩ (Tùy chọn)</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Mô tả triệu chứng hoặc mối quan tâm cụ thể..."
                            disabled={loading}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={
                        loading ||
                        !selectedDoctor ||
                        !selectedDate ||
                        !selectedSlot ||
                        !selectedBranch ||
                        !selectedPackage
                      }
                    >
                      {loading ? "Đang đặt lịch..." : "Đặt lịch khám"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingPage;
