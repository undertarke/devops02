import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SvgSprite from "./SvgSprite";

const Layout = ({ children }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("authUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <>
      <SvgSprite />
      <header id="header">
        <nav className="header-top pt-4 pb-5">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-5 col-md-4 col-sm-6">
                <Link className="navbar-brand" to="/">
                  <img
                    src="/images/main-logo.png"
                    className="logo"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="col-lg-4 col-md-4 d-md-block d-sm-none">
                <ul className="contact-list d-flex justify-content-lg-end flex-wrap list-unstyled m-0">
                  <li className="pe-5 pe-lg-0 pe-xxl-5 pb-3 pb-lg-0">
                    <svg
                      className="location primary-color"
                      width="24"
                      height="24"
                    >
                      <use href="#location"></use>
                    </svg>
                    123 Arling, Miola, NY
                  </li>
                  <li className="ps-xl-3">
                    <svg className="phone primary-color" width="24" height="24">
                      <use href="#phone"></use>
                    </svg>
                    (+487) 384 9452
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="btn-book text-end">
                  <Link
                    to="/booking"
                    className="btn btn-medium btn-outline-primary btn-pill text-uppercase"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <nav
          id="primary-header"
          className="navbar navbar-expand-lg shadow-none"
          aria-label="navbar"
        >
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-primary"
              aria-controls="navbar-primary"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                className="navbar-icon mt-3 primary-color-500 bg-light"
                width="50"
                height="50"
              >
                <use href="#navbar-icon"></use>
              </svg>
            </button>
            <div
              className="header-bottom collapse navbar-collapse bg-light border-radius-10 py-2"
              id="navbar-primary"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ps-4 pe-4 border-right">
                  <Link
                    className="nav-link text-dark active p-0 mt-3 mt-lg-0"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item ps-4 pe-4 border-right">
                  <Link className="nav-link text-dark p-0" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item ps-4 pe-4 border-right">
                  <Link className="nav-link text-dark p-0" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item ps-4 pe-4 border-right">
                  <Link className="nav-link text-dark p-0" to="/booking">
                    Booking
                  </Link>
                </li>
                <li className="nav-item ps-4 pe-4 border-right">
                  <Link className="nav-link text-dark p-0" to="/team">
                    Team
                  </Link>
                </li>
                <li className="nav-item ps-4 pe-4 border-right">
                  <Link className="nav-link text-dark p-0" to="/faq">
                    Faqs
                  </Link>
                </li>
                <li className="nav-item ps-4 pe-4 border-right">
                  <Link className="nav-link text-dark p-0" to="/departments">
                    Department
                  </Link>
                </li>
                <li className="nav-item ps-4 pe-3 dropdown border-right">
                  <a
                    className="nav-link text-dark p-0 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <ul className="dropdown-menu">
                    <li className="py-1">
                      <Link
                        to="/about"
                        className="dropdown-item text-uppercase"
                      >
                        About
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link to="/blog" className="dropdown-item text-uppercase">
                        Blog
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/booking"
                        className="dropdown-item text-uppercase"
                      >
                        Booking
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/services"
                        className="dropdown-item text-uppercase"
                      >
                        Services
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/departments"
                        className="dropdown-item text-uppercase"
                      >
                        Departments
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/review"
                        className="dropdown-item text-uppercase"
                      >
                        Review
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/gallery"
                        className="dropdown-item text-uppercase"
                      >
                        Gallery
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/contact"
                        className="dropdown-item text-uppercase"
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/login"
                        className="dropdown-item text-uppercase"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/register"
                        className="dropdown-item text-uppercase"
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* <li className="nav-item ps-4 pe-4 ">
                  <Link
                    className="nav-link get-pro text-dark fw-bold p-0"
                    to="/login"
                  >
                    Login
                  </Link>
                </li> */}
                <li className="nav-item ps-4 pe-4">
                  {localStorage.getItem("authUsername") ? (
                    <div className="dropdown">
                      <a
                        className="nav-link text-dark fw-bold p-0 dropdown-toggle"
                        href="#"
                        id="userMenu"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: "pointer", minWidth: "120px" }}
                      >
                        Hi, {localStorage.getItem("authUsername")}
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="userMenu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              localStorage.removeItem("authUsername");
                              localStorage.removeItem("authToken");
                              window.location.reload();
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      className="nav-link get-pro text-dark fw-bold p-0"
                      to="/login"
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
              <form className="search-form mb-3 mb-lg-0" role="search">
                <svg
                  className="search primary-color position-absolute"
                  width="18"
                  height="18"
                >
                  <use href="#search"></use>
                </svg>
                <input
                  className="form-control border-0 ps-4 position-relative"
                  type="search"
                  placeholder="Search.."
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer id="footer" className="overflow-hidden padding-large pb-0">
        <div className="container">
          <div className="row d-flex flex-wrap justify-content-between">
            <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
              <div className="footer-menu">
                <img src="/images/main-logo.png" alt="logo" className="pb-3" />
                <p>
                  Elit adipi massa diam in dignissim. Sagittis pulvinar ut dis
                  venenatis nunc nunc.
                </p>
                <div className="contact-item">
                  <p>
                    <svg
                      className="location primary-color"
                      width="25"
                      height="25"
                    >
                      <use href="#location"></use>
                    </svg>
                    <span>123 Arling, Miola, NY</span>
                  </p>
                  <p>
                    <svg className="email primary-color" width="25" height="25">
                      <use href="#email"></use>
                    </svg>
                    <a href="mailto:">Info@yourinfo.com</a>
                  </p>
                  <p>
                    <svg className="phone primary-color" width="25" height="25">
                      <use href="#phone"></use>
                    </svg>
                    <span>(+487) 384 9452</span>
                  </p>
                  <ul className="social-links list-unstyled d-flex mt-3">
                    <li>
                      <a href="#">
                        <svg
                          className="facebook text-primary-500 me-3"
                          width="25"
                          height="25"
                        >
                          <use href="#facebook"></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="twitter text-primary-500 me-3"
                          width="25"
                          height="25"
                        >
                          <use href="#twitter"></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="instagram text-primary-500 me-3"
                          width="25"
                          height="25"
                        >
                          <use href="#instagram"></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="youtube text-primary-500 me-3"
                          width="25"
                          height="25"
                        >
                          <use href="#youtube"></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="linkedin text-primary-500"
                          width="25"
                          height="25"
                        >
                          <use href="#linkedin"></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
              <div className="footer-menu">
                <h5 className="widget-title pb-2 fw-semibold">Quick Links</h5>
                <ul className="menu-list list-unstyled">
                  <li className="pb-2">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/services">Services</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/booking">Booking</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/our-team">Our Team</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/faq">Faqs</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/departments">Department</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/review">Review</Link>
                  </li>
                  <li className="pb-2">
                    <Link to="/gallery">Gallery</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
              <div className="footer-menu">
                <h5 className="widget-title fw-semibold">Opening Hours</h5>
                <table className="schedule">
                  <tbody>
                    <tr className="d-flex justify-content-between border-bottom py-2">
                      <td>Monday - Thursday</td>
                      <td className="text-primary">8:00 am - 6:00 pm</td>
                    </tr>
                    <tr className="d-flex justify-content-between border-bottom py-2">
                      <td>Friday - Saturday</td>
                      <td className="text-primary">10:00 am - 4:00 pm</td>
                    </tr>
                    <tr className="d-flex justify-content-between border-bottom py-2">
                      <td>Sunday</td>
                      <td className="text-primary">Emergency only</td>
                    </tr>
                    <tr className="d-flex justify-content-between border-bottom py-2">
                      <td>Personal</td>
                      <td className="text-primary">7:00 pm - 9:00 pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="d-md-flex text-center justify-content-between border-top mt-5 py-4">
            <p>© 2023 Insove - All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
