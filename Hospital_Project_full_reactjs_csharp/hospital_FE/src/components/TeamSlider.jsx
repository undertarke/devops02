import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const TeamSlider = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = new Swiper(swiperRef.current, {
                slidesPerView: 2,
                spaceBetween: 20,
                pagination: {
                  el: "#our-team .swiper-pagination",
                  clickable: true,
                },
                breakpoints: {
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                },
              });

            return () => {
                swiper.destroy(true, true);
            };
        }
    }, []);

    return (
        <div className="swiper team-swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
                {/* NOTE: These items would typically come from an array.map() */}
                <div className="swiper-slide">
                    <div className="team-member d-flex align-items-lg-center">
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
                                    <li><Link to="#"><svg className="facebook text-primary-500 me-4" width="30" height="30"><use xlinkHref="#facebook" /></svg></Link></li>
                                    <li><Link to="#"><svg className="twitter text-primary-500 me-4" width="30" height="30"><use xlinkHref="#twitter" /></svg></Link></li>
                                    <li><Link to="#"><svg className="instagram text-primary-500 me-4" width="30" height="30"><use xlinkHref="#instagram" /></svg></Link></li>
                                    <li><Link to="#"><svg className="youtube text-primary-500" width="30" height="30"><use xlinkHref="#youtube" /></svg></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="swiper-slide">
                    <div className="team-member d-flex align-items-lg-center">
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
                                    <li><Link to="#"><svg className="facebook text-primary-500 me-4" width="30" height="30"><use xlinkHref="#facebook" /></svg></Link></li>
                                    <li><Link to="#"><svg className="twitter text-primary-500 me-4" width="30" height="30"><use xlinkHref="#twitter" /></svg></Link></li>
                                    <li><Link to="#"><svg className="instagram text-primary-500 me-4" width="30" height="30"><use xlinkHref="#instagram" /></svg></Link></li>
                                    <li><Link to="#"><svg className="youtube text-primary-500" width="30" height="30"><use xlinkHref="#youtube" /></svg></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="swiper-slide">
                    <div className="team-member d-flex align-items-lg-center">
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
                                    <li><Link to="#"><svg className="facebook text-primary-500 me-4" width="30" height="30"><use xlinkHref="#facebook" /></svg></Link></li>
                                    <li><Link to="#"><svg className="twitter text-primary-500 me-4" width="30" height="30"><use xlinkHref="#twitter" /></svg></Link></li>
                                    <li><Link to="#"><svg className="instagram text-primary-500 me-4" width="30" height="30"><use xlinkHref="#instagram" /></svg></Link></li>
                                    <li><Link to="#"><svg className="youtube text-primary-500" width="30" height="30"><use xlinkHref="#youtube" /></svg></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="swiper-pagination"></div>
        </div>
    );
};

export default TeamSlider; 