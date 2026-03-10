import React, { useState, useEffect } from "react";

import { Table, Button, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import DoctorScheduleModal from "../../components/admin/DoctorScheduleModal";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BASE_URL } from '../../services/api';

const DoctorSchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const getDayName = (dayOfWeek) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayOfWeek];
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  const handleAdd = () => {
    setSelectedSchedule(null);
    setShowModal(true);
  };

  const handleEdit = (schedule) => {
    const formatTimeForInput = (time) => {
      if (!time) return "";
      const [hour, minute] = time.split(":");
      return `${hour}:${minute}`;
    };

    const updatedSchedule = {
      ...schedule,
      startTime: formatTimeForInput(schedule.startTime),
      endTime: formatTimeForInput(schedule.endTime),
    };

    setSelectedSchedule(updatedSchedule);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        // Gọi API delete theo ID
        await axios.delete(`${API_BASE_URL}/DoctorSchedule/${id}`);

        // Gọi lại danh sách sau khi xoá
        const res = await axios.get(`${API_BASE_URL}/DoctorSchedule`);
        setSchedules(res.data);

        Swal.fire("Deleted!", "The schedule has been deleted.", "success");
      } catch (error) {
        console.error(
          "❌ Delete failed:",
          error.response?.data || error.message
        );
        Swal.fire("Error", "Failed to delete schedule", "error");
      }
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/DoctorSchedule`);
        setSchedules(res.data);
      } catch (error) {
        console.error("❌ Error loading schedules:", error);
      }
    };

    fetchSchedules();
  }, []);
  const handleUpdate = async (formData) => {
    try {
      await axios.put(
        `${API_BASE_URL}/DoctorSchedule/${selectedSchedule.id}`,
        formData
      );
      Swal.fire("Success", "Schedule updated successfully!", "success");
      const res = await axios.get(`${API_BASE_URL}/DoctorSchedule`);
      setSchedules(res.data);
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error updating schedule:", error);
      Swal.fire("Error", "Failed to update schedule", "error");
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Doctor Schedules</h2>
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" />
          Add New Schedule
        </Button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>Doctor</th>
                  <th>Room</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        {/* <img
                          src={schedule.doctor.imageUrl}
                          alt={schedule.doctor.name}
                          className="rounded-circle me-2"
                          width="40"
                          height="40"
                          style={{ objectFit: "cover" }}
                        /> */}
                        <div>
                          <div className="fw-bold">{schedule.doctorName}</div>
                          {/* <div className="text-muted small">
                            {schedule.doctor.specialization}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold">{schedule.roomName}</div>
                    </td>
                    <td>
                      <Badge bg="info" className="rounded-pill">
                        {getDayName(schedule.dayOfWeek)}
                      </Badge>
                    </td>
                    <td>
                      <div className="text-nowrap">
                        {formatTime(schedule.startTime)} -{" "}
                        {formatTime(schedule.endTime)}
                      </div>
                    </td>
                    <td>
                      <div className="text-muted small">{schedule.note}</div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(schedule)}
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <DoctorScheduleModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={selectedSchedule ? handleUpdate : null}
        schedule={selectedSchedule}
      />
    </div>
  );
};

export default DoctorSchedulesPage;
