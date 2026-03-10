import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from '../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    email: "",
    phone: "",
    gender: "Other",
    dateOfBirth: "",
    status: "Active",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const dataToSend = {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address || "",
        status: formData.status || "Active",
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
      };

      await axios.post(`${API_BASE_URL}/Auth/register`, dataToSend);

      toast.success("Registration successful! Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration error:", err);
    }
  };

  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Register</h1>
            <span className="item">
              <Link to="/" className="">
                Home
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;
            <span className="item">Register</span>
          </div>
        </div>
      </section>

      <section className="contact-us-wrap py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="page-content">
                <div className="contact-form">
                  <form
                    name="register-form"
                    onSubmit={handleSubmit}
                    className="form-group"
                  >
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          name="username"
                          placeholder="Username *"
                          className="form-control"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name *"
                          className="form-control"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email *"
                          className="form-control"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number *"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="password"
                          name="password"
                          placeholder="Your Password *"
                          className="form-control"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password *"
                          className="form-control"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="dateOfBirth" className="form-label">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className="form-control"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="gender" className="form-label">
                          Gender *
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          className="form-select"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">-- Select Gender --</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-pill btn-lg mt-3"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login">Login here</Link>
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

export default RegisterPage;
