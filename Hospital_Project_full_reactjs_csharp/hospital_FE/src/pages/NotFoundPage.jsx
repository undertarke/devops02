import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Oops!</span> Trang không tồn tại.
        </p>
        <p className="lead">
          Trang bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền truy cập.
        </p>
        <Link to="/" className="btn btn-primary">Về trang chủ</Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 