import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialSlider = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = new Swiper(swiperRef.current, {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });

            return () => {
                swiper.destroy(true, true);
            };
        }
    }, []);

    return (
        <div className="swiper testimonial-swiper" ref={swiperRef}>
            <div className="swiper-wrapper position-relative">
                <div className="swiper-slide">
                    <div className="review-item">
                        <svg className="quote quote-up primary-color-500 position-absolute" width="80" height="70">
                            <use xlinkHref="#quote-up" />
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
                            <use xlinkHref="#quote-down" />
                        </svg>
                    </div>
                </div>
                <div className="swiper-slide">
                    <div className="review-item">
                        <svg className="quote quote-up primary-color-500 position-absolute" width="80" height="70">
                            <use xlinkHref="#quote-up" />
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
                            <use xlinkHref="#quote-down" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="swiper-pagination"></div>
        </div>
    );
};

export default TestimonialSlider; 