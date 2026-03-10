import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import axios from "axios";
import { API_BASE_URL } from '../services/api';
import { setTokenExpiration } from '../utils/auth';

import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const { showNotification } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/Auth/login`, formData);
      
      // Lưu thông tin auth vào localStorage
      const authData = {
        token: response.data.token.token,
        userId: response.data.token.userId,
        username: response.data.token.username,
        roles: response.data.token.roles,
        avatar: response.data.token.avatar || ""
      };
      
      localStorage.setItem('authData', JSON.stringify(authData));
      localStorage.setItem('authToken', authData.token); // Giữ lại cho các API calls
      
      // Lưu thời gian hết hạn token (3 tiếng)
      setTokenExpiration();

      showNotification('Đăng nhập thành công');

      // Redirect về trang trước đó hoặc trang chủ
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      showNotification(
        err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
        'danger'
      );
    } finally {

      setIsLoading(false);
    }
  };

  return (
    <>

      {isLoading && <div className="loading-spinner-overlay"><LoadingSpinner /></div>}
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Đăng nhập</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;
            <span className="item">Đăng nhập</span>
          </div>
        </div>
      </section>

      <section className="contact-us-wrap py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="page-content">
                <div className="contact-form">
                  <form
                    name="login-form"
                    action="#"
                    method="post"
                    className="form-group"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="text"
                          name="username"

                          placeholder="Tên đăng nhập *"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="password"
                          name="password"

                          placeholder="Mật khẩu *"
                          value={formData.password}
                          className="form-control"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-pill btn-lg mt-3"
                        type="submit"
                      >

                        Đăng nhập
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <p>

                      Chưa có tài khoản?{" "}
                      <Link to="/register">Đăng ký tại đây</Link>
                    </p>
                    <p>
                      <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
