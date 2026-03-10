import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  FaClock,
  FaCalendarAlt,
  FaDoorOpen,
  FaUserMd,
  FaStickyNote,
} from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from '../../services/api';
const DoctorScheduleModal = ({ show, onHide, onSave, schedule }) => {
  const [formData, setFormData] = useState({
    doctorId: "",
    roomId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    note: "",
  });

  // Mock data for doctors and rooms (replace with API data later)
  // const doctors = [
  //   { id: 1, name: "Dr. John Smith", specialization: "Cardiology" },
  //   { id: 2, name: "Dr. Sarah Johnson", specialization: "Pediatrics" },
  //   { id: 3, name: "Dr. Michael Chen", specialization: "Neurology" },
  //   { id: 4, name: "Dr. Emily Brown", specialization: "Dermatology" },
  //   { id: 5, name: "Dr. Robert Wilson", specialization: "Orthopedics" },
  // ];

  // const rooms = [
  //   { id: 101, name: "Room 101", floor: "1st Floor" },
  //   { id: 102, name: "Room 102", floor: "1st Floor" },
  //   { id: 201, name: "Room 201", floor: "2nd Floor" },
  //   { id: 202, name: "Room 202", floor: "2nd Floor" },
  //   { id: 301, name: "Room 301", floor: "3rd Floor" },
  // ];
  const generateTimeOptions = (start = "08:00", end = "17:30", step = 30) => {
    const options = [];
    let [hour, minute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      const hh = hour.toString().padStart(2, "0");
      const mm = minute.toString().padStart(2, "0");
      options.push(`${hh}:${mm}`);
      minute += step;
      if (minute >= 60) {
        hour += 1;
        minute -= 60;
      }
    }

    return options;
  };

  const [rooms, setRooms] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (schedule) {
      setFormData({
        doctorId: schedule.doctorId,
        roomId: schedule.roomId,
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        note: schedule.note || "",
      });
    } else {
      setFormData({
        doctorId: "",
        roomId: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        note: "",
      });
    }
  }, [schedule]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Room`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Doctor`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (show) {
      fetchRooms();
      fetchDoctors();
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      doctorId: parseInt(formData.doctorId),
      roomId: parseInt(formData.roomId),
      dayOfWeek: parseInt(formData.dayOfWeek),
      startTime: formData.startTime,
      endTime: formData.endTime,
      note: formData.note,
    };

    try {
      if (onSave) {
        // Là edit → gọi callback xử lý PUT
        await onSave(payload);
      } else {
        // Là create → Modal tự xử lý POST
        await axios.post(
          `${API_BASE_URL}/DoctorSchedule`,
          payload,
          config
        );

        alert("🟢 Tạo lịch khám thành công!");
        onHide();
        window.location.reload();
      }
    } catch (err) {
      console.error(
        "❌ Lỗi khi lưu lịch khám:",
        err.response?.data || err.message
      );
      alert("❌ Có lỗi xảy ra khi lưu lịch khám!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="doctor-schedule-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {schedule ? "Edit Doctor Schedule" : "Create New Doctor Schedule"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  <FaUserMd className="me-2" />
                  Doctor
                </Form.Label>
                <Form.Select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.fullName} - {doctor.specialization}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  <FaDoorOpen className="me-2" />
                  Room
                </Form.Label>
                <Form.Select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FaCalendarAlt className="me-2" />
                  Day of Week
                </Form.Label>
                <Form.Select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Day</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                  <option value="0">Sunday</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FaClock className="me-2" />
                  Start Time
                </Form.Label>
                <Form.Select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Start Time</option>
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FaClock className="me-2" />
                  End Time
                </Form.Label>
                <Form.Select
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select End Time</option>
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaStickyNote className="me-2" />
              Notes
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add any additional notes here..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {schedule ? "Update Schedule" : "Create Schedule"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorScheduleModal;
