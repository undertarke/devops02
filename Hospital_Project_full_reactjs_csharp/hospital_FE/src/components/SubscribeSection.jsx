import React from 'react';

const SubscribeSection = () => {
    return (
        <section id="subscribe" className="d-flex align-items-center"
            style={{ backgroundImage: "url(/images/subscribe-bg.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '444px' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="subscribe-content">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="subscribe-header content-light mb-5">
                                    <span className="text-light text-uppercase">Our newsletter</span>
                                    <h3 className="display-3 fw-semibold text-light mt-3">Subscribe Us To Get More Updates</h3>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <form id="form" className="d-flex flex-wrap position-relative">
                                    <input type="text" name="email" placeholder="Your Email Addresss"
                                        className="border-radius-35 text-light ps-4 outline-transparent" />
                                    <button
                                        className="btn btn-light btn-subscribe btn-pill position-absolute fw-medium text-uppercase">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscribeSection; 