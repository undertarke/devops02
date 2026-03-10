import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  // Sample data for cards
  const summaryData = {
    patients: 1234,
    appointments: 56,
    doctors: 12,
    revenue: 54500000,
  };

  // Sample data for Line chart
  const appointmentChartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Lịch hẹn',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Sample data for Doughnut chart
  const patientChartData = {
    labels: ['Bệnh nhân mới', 'Bệnh nhân tái khám', 'Bệnh nhân nội trú'],
    datasets: [
      {
        label: 'Phân loại bệnh nhân',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Bảng điều khiển</h1>
      </div>

      <div className="row">
        <div className="col-md-3">
            <div className="admin-card summary-card bg-primary text-white">
                <h3>Bệnh nhân</h3>
                <p>{summaryData.patients.toLocaleString()}</p>
            </div>
        </div>
        <div className="col-md-3">
            <div className="admin-card summary-card bg-info text-white">
                <h3>Lịch hẹn</h3>
                <p>{summaryData.appointments}</p>
            </div>
        </div>
        <div className="col-md-3">
            <div className="admin-card summary-card bg-success text-white">
                <h3>Bác sĩ</h3>
                <p>{summaryData.doctors}</p>
            </div>
        </div>
        <div className="col-md-3">
            <div className="admin-card summary-card bg-warning text-dark">
                <h3>Doanh thu (VND)</h3>
                <p>{summaryData.revenue.toLocaleString()}</p>
            </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="admin-card">
            <h3>Thống kê lịch hẹn (6 tháng gần nhất)</h3>
            <Line data={appointmentChartData} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="admin-card">
            <h3>Phân loại bệnh nhân</h3>
            <Doughnut data={patientChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
