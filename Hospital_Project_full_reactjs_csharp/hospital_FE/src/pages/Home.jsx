import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SubscribeSection from '../components/SubscribeSection';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const Home = () => {
    const [activeTab, setActiveTab] = useState('laboratory');
    return (
        <>
            <section id="intro" className="position-relative overflow-hidden">
                <div className="banner">
                    <img src="/images/banner-image.jpg" alt="banner" className="img-fluid" />
                    <div className="container">
                        <div className="banner-content position-absolute padding-large">
                            <span
                                className="sub-heading bg-light py-2 px-4 mb-4 border-radius-30 text-uppercase d-inline-block text-cadet-blue fw-medium">
                                <svg className="heart primary-color me-2" width="20" height="20">
                                    <use href="#heart" />
                                </svg>Live your life
                            </span>
                            <h1 className="display-3 fw-bold text-dark">We Care About Your Health</h1>
                            <p className="mt-3 mb-4">Vitae aliquam vestibulum elit adipiscing massa diam in dignissim. Risus tellus libero
                                elementum aliquam etiam. Lectus adipiscing est auctor mi quisque nunc non viverra est.</p>
                            <Link to="/contact" className="btn btn-medium btn-primary btn-pill text-uppercase">Contact us</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about-us" className="padding-large">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div
                                    className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">5120</h5>
                                </div>
                                <p className="counter-description">Happy Patients</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div
                                    className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="26" data-speed="8000">26</h5>
                                </div>
                                <p className="counter-description">Total Branches</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div
                                    className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="53" data-speed="8000">53</h5>
                                </div>
                                <p className="counter-description">Senior Doctors</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div
                                    className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="10" data-speed="8000">10</h5>
                                </div>
                                <p className="counter-description">Years Experience</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="our-services"
                style={{ backgroundImage: "url(/images/services-bg.jpg)", backgroundRepeat: 'no-repeat', backgroundPosition: 'center top' }}>
                <div className="container">
                    <div className="row">

                        <div className="display-header text-light d-flex flex-wrap justify-content-between padding-medium">
                            <div className="col-lg-5 col-md-6 col-sm-12">
                                <h2 className="text-light">Our Best Services For Your Solution</h2>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <p className="text-light">Vitae aliquam vestibulum elit adipiscing massa diam in dignissim. Risus tellus libero
                                    elementum aliquam etiam. Lectus adipiscing est auctor mi quisque nunc non viverra est.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="home-thermometer mt-3 primary-color-500" width="50" height="50">
                                        <use href="#home-thermometer" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">General Practitioners</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="pregnant-woman mt-3 primary-color-500" width="50" height="50">
                                        <use href="#pregnant-woman" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">Pregnancy Support</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="nutrition mt-3 primary-color-500" width="50" height="50">
                                        <use href="#nutrition" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">Nutritional Support</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="local-pharmacy mt-3 primary-color-500" width="50" height="50">
                                        <use href="#local-pharmacy" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">Pharmaceutical care</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="book-appointment" className="padding-large mb-0">
                <div className="container">
                    <div className="row">
                        <div className="display-header">
                            <h2 className="display-5 fw-bold text-dark">Book Appointment or call: <span className="text-primary-500">(+487) 384
                                9452</span></h2>
                        </div>
                        <form className="contact-form d-flex flex-wrap mt-5 gx-1">
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <select className="form-select focus-transparent border border-radius-10 ps-4" aria-invalid="false"
                                    name="choose">
                                    <option value="Select Your Department">Select Department </option>
                                    <option value="Department">Department of Physiotherapy</option>
                                    <option value="Department">Department of Dentistry</option>
                                    <option value="Department">ENT Department</option>
                                    <option value="Department">Department of Pharmacy</option>
                                    <option value="Department">Nursing Department</option>
                                </select>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <select className="form-select focus-transparent border ps-4 border-radius-10" aria-invalid="false"
                                    name="choose">
                                    <option value="Select Your Doctor">Select Doctor</option>
                                    <option value="Naidan Smith">William Davies</option>
                                    <option value="Danial Frankie">Charlotte Taylor</option>
                                    <option value="Jason Roy">William Jones</option>
                                </select>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <input type="text" name="name" placeholder="Full Name" className="border ps-4 border-radius-10" />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <input type="text" name="name" placeholder="Phone Number" className="border ps-4 border-radius-10" />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <div className="input-group date" id="datepicker">
                                    <input type="date" id="start" name="appointment"
                                        placeholder="Choose Date" className="bg-transparent ps-4 border border-radius-10 position-relative" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <div className="input-group time" id="timepicker">
                                    <input type="time" id="start" name="appointment"
                                        className="bg-transparent ps-4 border border-radius-10 position-relative" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Link to="/booking" className="btn btn-medium btn-primary btn-pill mt-3 text-uppercase">Book an appointment</Link>
                </div>
            </section>

            <section id="testimonial"
                style={{ backgroundImage: "url(/images/review-bg.jpg)", backgroundRepeat: 'no-repeat', backgroundPosition: 'right', height: '595px' }}>
                <div className="container">
                    <div className="row align-items-center padding-medium">
                        <div className="col-lg-5 col-md-4">
                            <div className="image-holder">
                                <img src="/images/review-image.png" alt="review" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-8">
                            <div className="review-content">
                                <Swiper
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="testimonial-swiper"
                                >
                                    <SwiperSlide>
                                        <div className="review-item">
                                            <svg className="quote quote-up primary-color-500 position-absolute" width="80" height="70">
                                                <use href="#quote-up" />
                                            </svg>
                                            <blockquote className="fs-4">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about
                                                    you. Lorem, Quos saepe suscipit, nemo dolore sapiente!</p>
                                                <div className="author-detail">
                                                    <div className="name fs-3 fw-bold text-dark">James Rodrigo</div>
                                                    <span className="text-cadet-blue text-uppercase">Customer</span>
                                                </div>
                                            </blockquote>
                                            <svg className="quote quote-down primary-color-500 position-absolute" width="80" height="70">
                                                <use href="#quote-down" />
                                            </svg>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="review-item">
                                            <svg className="quote quote-up primary-color-500 position-absolute" width="80" height="70">
                                                <use href="#quote-up" />
                                            </svg>
                                            <blockquote className="fs-4">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about
                                                    you. Lorem, Quos saepe suscipit, nemo dolore sapiente!</p>
                                                <div className="author-detail">
                                                    <div className="name fs-3 fw-bold text-dark">Jenny Rose</div>
                                                    <span className="text-cadet-blue text-uppercase">Customer</span>
                                                </div>
                                            </blockquote>
                                            <svg className="quote quote-down primary-color-500 position-absolute" width="80" height="70">
                                                <use href="#quote-down" />
                                            </svg>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="review-item">
                                            <svg className="quote quote-up primary-color-500 position-absolute" width="80" height="70">
                                                <use href="#quote-up" />
                                            </svg>
                                            <blockquote className="fs-4">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about
                                                    you. Lorem, Quos saepe suscipit, nemo dolore sapiente!</p>
                                                <div className="author-detail">
                                                    <div className="name fs-3 fw-bold text-dark">Wednesday Marigold</div>
                                                    <span className="text-cadet-blue text-uppercase">Customer</span>
                                                </div>
                                            </blockquote>
                                            <svg className="quote quote-down primary-color-500 position-absolute" width="80" height="70">
                                                <use href="#quote-down" />
                                            </svg>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SubscribeSection />

            <section id="our-team" className="padding-large">
                <div className="container">
                    <div className="row">
                        <div className="display-header mb-5">
                            <h2 className="display-5 fw-bold text-dark">Our Team</h2>
                        </div>
                        <div className="team-content">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="team-swiper"
                            >
                                <SwiperSlide>
                                    <div className="team-member d-flex align-items-center">
                                        <div className="col-md-6">
                                            <div className="image-holder me-4 mb-4">
                                                <img src="/images/team-item.jpg" alt="team member" className="border-radius-10 img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="member-info">
                                                <h3 className="fs-4 fw-bold text-dark">Dr. Leslie Taylor</h3>
                                                <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">Pediatrician</span>
                                                <p>Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac
                                                    penatibus et.</p>
                                                <ul className="social-links list-unstyled d-flex">
                                                    <li>
                                                        <a href="#">
                                                            <svg className="facebook text-primary-500 me-4" width="30" height="30">
                                                                <use href="#facebook" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="twitter text-primary-500 me-4" width="30" height="30">
                                                                <use href="#twitter" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="instagram text-primary-500 me-4" width="30" height="30">
                                                                <use href="#instagram" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="youtube text-primary-500" width="30" height="30">
                                                                <use href="#youtube" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="team-member d-flex align-items-center">
                                        <div className="col-md-6">
                                            <div className="image-holder me-4 mb-4">
                                                <img src="/images/team-item1.jpg" alt="team member" className="border-radius-10 img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="member-info">
                                                <h3 className="fs-4 fw-bold text-dark">Dr. Zachary Brown</h3>
                                                <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">Cardiologist</span>
                                                <p>Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac
                                                    penatibus et.</p>
                                                <ul className="social-links list-unstyled d-flex">
                                                    <li>
                                                        <a href="#">
                                                            <svg className="facebook text-primary-500 me-4" width="30" height="30">
                                                                <use href="#facebook" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="twitter text-primary-500 me-4" width="30" height="30">
                                                                <use href="#twitter" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="instagram text-primary-500 me-4" width="30" height="30">
                                                                <use href="#instagram" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="youtube text-primary-500" width="30" height="30">
                                                                <use href="#youtube" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="team-member d-flex align-items-center">
                                        <div className="col-md-6">
                                            <div className="image-holder me-4 mb-4">
                                                <img src="/images/team-item2.jpg" alt="team member" className="border-radius-10 img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="member-info">
                                                <h3 className="fs-4 fw-bold text-dark">Dr. Isabella Davies</h3>
                                                <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">Gynecologist</span>
                                                <p>Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac
                                                    penatibus et.</p>
                                                <ul className="social-links list-unstyled d-flex">
                                                    <li>
                                                        <a href="#">
                                                            <svg className="facebook text-primary-500 me-4" width="30" height="30">
                                                                <use href="#facebook" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="twitter text-primary-500 me-4" width="30" height="30">
                                                                <use href="#twitter" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="instagram text-primary-500 me-4" width="30" height="30">
                                                                <use href="#instagram" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg className="youtube text-primary-500" width="30" height="30">
                                                                <use href="#youtube" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faqs" className="padding-large pt-0">
                <div className="container">
                    <div className="row">
                        <div className="display-header mb-5">
                            <h2 className="display-5 fw-bold text-center text-dark">We've Got Answers</h2>
                        </div>
                        <div className="accordion" id="accordion">
                            <div className="accordion-item border-0 py-3">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button fs-4 fw-bold text-dark bg-transparent focus-transparent text-capitalize shadow-none"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                                        aria-controls="collapseOne">
                                        Why to believe with Insove medical healthcare ?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse border-0 collapse show" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>Diam orci gravida convallis at enim risus viverra. Hac mi tristique in aliquet tincidunt nam lectus
                                            nec. Placerat interdum auctor facilisi massa laoreet hendrerit posuere a. Tristique ultricies
                                            consectetu at.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border-0 py-3">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                                        aria-controls="collapseTwo">
                                        Will we get healthcare updates after surgery ?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>This is the second item's accordion body.It is hidden by default, until the collapse plugin adds the
                                            appropriate classes that we use to style each element. These classes control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
                                            overriding our default variables.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border-0 py-3">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        What is the cost for just check-up ?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>This is the third item's accordion body.It is hidden by default, until the collapse plugin adds the
                                            appropriate classes that we use to style each element. These classes control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
                                            overriding our default variables.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border-0 py-3">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
                                        aria-controls="collapseFour">
                                        Can i cancel my appointment ?
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordion">
                                    <div className="accordion-body">
                                        <p>This is the third item's accordion body.It is hidden by default, until the collapse plugin adds the
                                            appropriate classes that we use to style each element. These classes control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
                                            overriding our default variables.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="department" className="overflow-hidden">
                <div className="container-md">
                    <div className="row">
                        <div className="medical-department-tab bg-primary-200 d-flex align-items-start padding-large ps-5 border-radius-20">
                            <div className="nav nav-tabs border-0 col-lg-3 col-md-3 ps-4" id="medical-tab" role="tablist"
                                aria-orientation="vertical">
                                <button className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${activeTab === 'laboratory' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('laboratory')} type="button">Laboratory Analysis</button>
                                <button className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${activeTab === 'cardiology' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('cardiology')} type="button">Cardiology Clinic</button>
                                <button className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${activeTab === 'gynecology' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('gynecology')} type="button">Gynecology Clinic</button>
                                <button className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${activeTab === 'pathology' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('pathology')} type="button">Pathology Clinic</button>
                                <button className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent pb-4 ${activeTab === 'pediatrics' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('pediatrics')} type="button">Pediatrics Clinic</button>
                                <button className={`nav-link text-uppercase text-cadet-blue border-0 bg-transparent ${activeTab === 'neurology' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('neurology')} type="button">Neurology Clinic</button>
                            </div>
                            <div className="tab-content col-lg-8 col-md-8" id="tabContent">
                                <div className={`tab-pane fade position-relative ${activeTab === 'laboratory' ? 'show active' : ''}`}>
                                    <h2 className="display-5 fw-bold pb-3 text-dark">Laboratory Analysis</h2>
                                    <p>Laboratory analysis means a test performed by a labo- ratory on body fluid, tissue, or excretion for
                                        the purpose of determining the presence, absence, or concentration of various substances in the human
                                        body.</p>
                                    <p>Sampling is the process of collecting a portion of an environmental medium as representative of the
                                        locally remaining medium. The collected portion of the medium is then analyzed to determine the
                                        radionuclide concentration.</p>
                                    <p><a href="#" className="text-primary pe-3">Neurocritical Care</a><a href="#" className="text-primary pe-3">Neuro
                                        Oncology</a><a href="#" className="text-primary pe-3">Geriatric Neurology</a></p>
                                    <Link to="/departments" className="btn btn-medium btn-primary btn-pill mt-4">Learn More</Link>
                                </div>
                                <div className={`tab-pane fade position-relative ${activeTab === 'cardiology' ? 'show active' : ''}`}>
                                    <h2 className="display-5 fw-bold pb-3 text-dark">Cardiology Clinic</h2>
                                    <p>Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. Tempor
                                        egestas condimentum et ac rutrum dui, odio.Vel non viverra ligula odio ornare turpis mauris. Aliquam,
                                        tincidunt ut vitae elit risus.</p>
                                    <p> Tempor egestas condimentum et ac rutrum dui, odio. Non viverra ligula odio ornare turpis mauris. Dio a
                                        Vel non viverra ligula odio ornare turpis mauris.</p>
                                    <p><a href="#" className="text-primary pe-3">Neurocritical Care</a><a href="#" className="text-primary pe-3">Neuro
                                        Oncology</a><a href="#" className="text-primary pe-3">Geriatric Neurology</a></p>
                                    <Link to="/departments" className="btn btn-medium btn-primary btn-pill mt-4">Learn More</Link>
                                </div>
                                <div className={`tab-pane fade position-relative ${activeTab === 'gynecology' ? 'show active' : ''}`}>
                                    <h2 className="display-5 fw-bold pb-3 text-dark">Gynecology Clinic</h2>
                                    <p>Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. Tempor
                                        egestas condimentum et ac rutrum dui, odio.Vel non viverra ligula odio ornare turpis mauris. Aliquam,
                                        tincidunt ut vitae elit risus.</p>
                                    <p> Tempor egestas condimentum et ac rutrum dui, odio. Non viverra ligula odio ornare turpis mauris. Dio a
                                        Vel non viverra ligula odio ornare turpis mauris.</p>
                                    <p><a href="#" className="text-primary pe-3">Neurocritical Care</a><a href="#" className="text-primary pe-3">Neuro
                                        Oncology</a><a href="#" className="text-primary pe-3">Geriatric Neurology</a></p>
                                    <Link to="/departments" className="btn btn-medium btn-primary btn-pill mt-4">Learn More</Link>
                                </div>
                                <div className={`tab-pane fade position-relative ${activeTab === 'pathology' ? 'show active' : ''}`}>
                                    <h2 className="display-5 fw-bold pb-3 text-dark">Pathology Clinic</h2>
                                    <p>Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. Tempor
                                        egestas condimentum et ac rutrum dui, odio.Vel non viverra ligula odio ornare turpis mauris. Aliquam,
                                        tincidunt ut vitae elit risus.</p>
                                    <p> Tempor egestas condimentum et ac rutrum dui, odio. Non viverra ligula odio ornare turpis mauris. Dio a
                                        Vel non viverra ligula odio ornare turpis mauris.</p>
                                    <p><a href="#" className="text-primary pe-3">Neurocritical Care</a><a href="#" className="text-primary pe-3">Neuro
                                        Oncology</a><a href="#" className="text-primary pe-3">Geriatric Neurology</a></p>
                                    <Link to="/departments" className="btn btn-medium btn-primary btn-pill mt-4">Learn More</Link>
                                </div>
                                <div className={`tab-pane fade position-relative ${activeTab === 'pediatrics' ? 'show active' : ''}`}>
                                    <h2 className="display-5 fw-bold pb-3 text-dark">Pediatrics Clinic</h2>
                                    <p>Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. Tempor
                                        egestas condimentum et ac rutrum dui, odio.Vel non viverra ligula odio ornare turpis mauris. Aliquam,
                                        tincidunt ut vitae elit risus.</p>
                                    <p> Tempor egestas condimentum et ac rutrum dui, odio. Non viverra ligula odio ornare turpis mauris. Dio a
                                        Vel non viverra ligula odio ornare turpis mauris.</p>
                                    <p><a href="#" className="text-primary pe-3">Neurocritical Care</a><a href="#" className="text-primary pe-3">Neuro
                                        Oncology</a><a href="#" className="text-primary pe-3">Geriatric Neurology</a></p>
                                    <Link to="/departments" className="btn btn-medium btn-primary btn-pill mt-4">Learn More</Link>
                                </div>
                                <div className={`tab-pane fade position-relative ${activeTab === 'neurology' ? 'show active' : ''}`}>
                                    <h2 className="display-5 fw-bold pb-3 text-dark">Neurology Clinic</h2>
                                    <p>Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. Tempor
                                        egestas condimentum et ac rutrum dui, odio.Vel non viverra ligula odio ornare turpis mauris. Aliquam,
                                        tincidunt ut vitae elit risus.</p>
                                    <p> Tempor egestas condimentum et ac rutrum dui, odio. Non viverra ligula odio ornare turpis mauris. Dio a
                                        Vel non viverra ligula odio ornare turpis mauris.</p>
                                    <p><a href="#" className="text-primary pe-3">Neurocritical Care</a><a href="#" className="text-primary pe-3">Neuro
                                        Oncology</a><a href="#" className="text-primary pe-3">Geriatric Neurology</a></p>
                                    <Link to="/departments" className="btn btn-medium btn-primary btn-pill mt-4">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="latest-blog" className="padding-large">
                <div className="container">
                    <div className="row">
                        <div className="display-header">
                            <h2 className="display-5 fw-bold text-dark">Our Recent Posts</h2>
                        </div>
                        <div className="post-grid d-flex flex-wrap mt-4">
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                                <div className="card-item pe-3">
                                    <div className="card border-0 bg-transparent">
                                        <div className="card-image position-relative">
                                            <img src="/images/post-item1.jpg" alt="" className="post-image img-fluid border-radius-top-10" />
                                            <span
                                                className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">Medical</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-3 mt-2">
                                        <div className="meta-date">Jan 2, 2023</div>
                                        <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                                            <Link to="/blog/1">10 foods to avoid for your heart health</Link>
                                        </h3>
                                        <p>It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's
                                            certainly true... <Link to="/blog/1" className="text-decoration-underline"><em>Read more</em></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                                <div className="card-item pe-3">
                                    <div className="card border-0 bg-transparent">
                                        <div className="card-image position-relative">
                                            <img src="/images/post-item2.jpg" alt="" className="post-image img-fluid border-radius-top-10" />
                                            <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">Mental
                                                Health</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-3 mt-2">
                                        <div className="meta-date">Jan 3, 2023</div>
                                        <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                                            <Link to="/blog/2">How to be relax & calm in hard situations</Link>
                                        </h3>
                                        <p>It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's
                                            certainly true... <Link to="/blog/2" className="text-decoration-underline"><em>Read more</em></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                                <div className="card-item pe-2">
                                    <div className="card border-0 bg-transparent">
                                        <div className="card-image position-relative">
                                            <img src="/images/post-item3.jpg" alt="" className="post-image img-fluid border-radius-top-10" />
                                            <span className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize">Dental
                                                Health</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-3 mt-2">
                                        <div className="meta-date">Jan 4, 2023</div>
                                        <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                                            <Link to="/blog/3">Best ways to make your teeth strong</Link>
                                        </h3>
                                        <p>It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's
                                            certainly true... <Link to="/blog/3" className="text-decoration-underline"><em>Read more</em></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/blog" className="btn btn-medium btn-primary btn-pill text-uppercase text-center mx-auto">Read more
                        blogs</Link>
                </div>
            </section>

            <section id="brand-collection" className="pt-0 pb-5 overflow-hidden">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col pb-3">
                            <img src="/images/betael.png" alt="brand" className="top-image" />
                            <img src="/images/betael1.png" alt="brand" className="bottom-image" />
                        </div>
                        <div className="col pb-3">
                            <img src="/images/healer.png" alt="brand" className="top-image" />
                            <img src="/images/healer1.png" alt="brand" className="bottom-image" />
                        </div>
                        <div className="col pb-3">
                            <img src="/images/lifetrace.png" alt="brand" className="top-image" />
                            <img src="/images/lifetrace1.png" alt="brand" className="bottom-image" />
                        </div>
                        <div className="col pb-3">
                            <img src="/images/medcare.png" alt="brand" className="top-image" />
                            <img src="/images/medcare1.png" alt="brand" className="bottom-image" />
                        </div>
                        <div className="col">
                            <img src="/images/soven.png" alt="brand" className="top-image" />
                            <img src="/images/soven1.png" alt="brand" className="bottom-image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home; 