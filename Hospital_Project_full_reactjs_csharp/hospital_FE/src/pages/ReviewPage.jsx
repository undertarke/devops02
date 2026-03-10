import React from 'react';
import { Link } from 'react-router-dom';

const ReviewPage = () => {
    return (
        <>
            <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
                <div className="container">
                    <div className="banner-content padding-large">
                        <h1 className="display-3 fw-bold text-dark">Reviews</h1>
                        <span className="item"><Link to="/" className="">Home</Link></span> &nbsp; <span className="">/</span> &nbsp; <span
                            className=" item">Reviews</span>
                    </div>
                </div>
            </section>

            <section id="review">
                <div className=" services-sub container my-5 ">
                    <div className="row">
                        <div className=" mt-5 col-md-6">
                            <div className="reviews-components p-5">
                                <svg className="quote quote-up primary-color-500 my-2" width="80" height="70">
                                    <use xlinkHref="#quote-up" />
                                </svg>
                                <blockquote className="fs-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem,
                                        Quos saepe suscipit, nemo dolore sapiente!</p>
                                    <div className="author-detail">
                                        <div className="name fs-3 fw-bold text-dark">Jenny Rose</div>
                                        <span className="text-cadet-blue text-uppercase">Customer</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className=" mt-5 col-md-6">
                            <div className="reviews-components p-5">
                                <svg className="quote quote-up primary-color-500 my-2" width="80" height="70">
                                    <use xlinkHref="#quote-up" />
                                </svg>
                                <blockquote className="fs-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem,
                                        Quos saepe suscipit, nemo dolore sapiente!</p>
                                    <div className="author-detail">
                                        <div className="name fs-3 fw-bold text-dark">Peter Mark</div>
                                        <span className="text-cadet-blue text-uppercase">Customer</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className=" mt-5 col-md-6">
                            <div className="reviews-components p-5">
                                <svg className="quote quote-up primary-color-500 my-2" width="80" height="70">
                                    <use xlinkHref="#quote-up" />
                                </svg>
                                <blockquote className="fs-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem,
                                        Quos saepe suscipit, nemo dolore sapiente!</p>
                                    <div className="author-detail">
                                        <div className="name fs-3 fw-bold text-dark">Harry James</div>
                                        <span className="text-cadet-blue text-uppercase">Customer</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className=" mt-5 col-md-6">
                            <div className="reviews-components p-5">
                                <svg className="quote quote-up primary-color-500 my-2" width="80" height="70">
                                    <use xlinkHref="#quote-up" />
                                </svg>
                                <blockquote className="fs-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem,
                                        Quos saepe suscipit, nemo dolore sapiente!</p>
                                    <div className="author-detail">
                                        <div className="name fs-3 fw-bold text-dark">Anna Ester</div>
                                        <span className="text-cadet-blue text-uppercase">Customer</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className=" mt-5 col-md-6">
                            <div className="reviews-components p-5">
                                <svg className="quote quote-up primary-color-500 my-2" width="80" height="70">
                                    <use xlinkHref="#quote-up" />
                                </svg>
                                <blockquote className="fs-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem,
                                        Quos saepe suscipit, nemo dolore sapiente!</p>
                                    <div className="author-detail">
                                        <div className="name fs-3 fw-bold text-dark">David Trainer</div>
                                        <span className="text-cadet-blue text-uppercase">Customer</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className=" mt-5 col-md-6">
                            <div className="reviews-components p-5">
                                <svg className="quote quote-up primary-color-500 my-2" width="80" height="70">
                                    <use xlinkHref="#quote-up" />
                                </svg>
                                <blockquote className="fs-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem,
                                        Quos saepe suscipit, nemo dolore sapiente!</p>
                                    <div className="author-detail">
                                        <div className="name fs-3 fw-bold text-dark">Ben Keven</div>
                                        <span className="text-cadet-blue text-uppercase">Customer</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="Page navigation" className="d-flex justify-content-center pt-2 pb-5 mt-5">
                        <ul className="pagination">
                            <li className="page-item">
                                <Link className="page-link" to="#" aria-label="Previous">
                                    <iconify-icon icon="solar:arrow-left-linear" className="pagination-arrow"></iconify-icon>
                                </Link>
                            </li>
                            <li className="page-item active" aria-current="page"><Link className="page-link" to="#">1</Link>
                            </li>
                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                            <li className="page-item">
                                <Link className="page-link" to="#" aria-label="Next">
                                    <iconify-icon icon="solar:arrow-right-linear" className="pagination-arrow"></iconify-icon> </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    );
};

export default ReviewPage; 