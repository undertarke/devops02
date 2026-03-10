import React from 'react';
import { Link } from 'react-router-dom';

const FrequentlyAskedQuestions = () => {
    return (
        <>
            <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
                <div className="container">
                    <div className="banner-content padding-large">
                        <h1 className="display-3 fw-bold text-dark">FAQs</h1>
                        <span className="item"><Link to="/" className="">Home</Link></span> &nbsp; <span className="">/</span> &nbsp; <span
                            className=" item">FAQs</span>
                    </div>
                </div>
            </section>

            <section className="faqs-wrap padding-large pt-5">
                <div className="container">
                    <div className="row g-md-5 my-4">
                        <main className="col-md-8">
                            <h2 className="display-5 fw-bold text-dark mb-4">Frequently asked questions</h2>

                            <p>Malesuada nunc vel risus commodo viverra. Viverra accumsan in nisl nisi. Pretium nibh ipsum
                                consequat
                                nisl
                                vel pretium. Tortor dignissim convallis aenean et tortor at risus viverra adipiscing.</p>
                            <div className="page-content my-5">

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
                                                <p>Diam orci gravida convallis at enim risus viverra. Hac mi tristique in aliquet tincidunt nam
                                                    lectus nec. Placerat interdum auctor facilisi massa laoreet hendrerit posuere a. Tristique
                                                    ultricies consectetu at.</p>
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
                                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>This is the second item's accordion body.It is hidden by default, until the collapse
                                                    plugin adds
                                                    the appropriate classes that we use to style each element. These classes control the
                                                    overall
                                                    appearance, as well as the showing and hiding via CSS transitions. You can modify any
                                                    of this with
                                                    custom CSS or overriding our default variables.</p>
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
                                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>This is the third item's accordion body.It is hidden by default, until the collapse
                                                    plugin adds
                                                    the appropriate classes that we use to style each element. These classes control the
                                                    overall
                                                    appearance, as well as the showing and hiding via CSS transitions. You can modify any
                                                    of this with
                                                    custom CSS or overriding our default variables.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 py-3">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
                                                aria-controls="collapseFour">
                                                What time will it take to finish one appointment ?
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>This is the third item's accordion body.It is hidden by default, until the collapse
                                                    plugin adds
                                                    the appropriate classes that we use to style each element. These classes control the
                                                    overall
                                                    appearance, as well as the showing and hiding via CSS transitions. You can modify any
                                                    of this with
                                                    custom CSS or overriding our default variables.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item border-0 py-3">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false"
                                                aria-controls="collapseFive">
                                                Do i need to open an account compulsory?
                                            </button>
                                        </h2>
                                        <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>This is the second item's accordion body.It is hidden by default, until the collapse
                                                    plugin adds
                                                    the appropriate classes that we use to style each element. These classes control the
                                                    overall
                                                    appearance, as well as the showing and hiding via CSS transitions. You can modify any
                                                    of this with
                                                    custom CSS or overriding our default variables.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 py-3">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false"
                                                aria-controls="collapseSix">
                                                Can i cancel my appointment ?
                                            </button>
                                        </h2>
                                        <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>This is the second item's accordion body.It is hidden by default, until the collapse
                                                    plugin adds
                                                    the appropriate classes that we use to style each element. These classes control the
                                                    overall
                                                    appearance, as well as the showing and hiding via CSS transitions. You can modify any
                                                    of this with
                                                    custom CSS or overriding our default variables.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 py-3">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false"
                                                aria-controls="collapseSeven">
                                                How do i book specific doctor ?
                                            </button>
                                        </h2>
                                        <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>This is the third item's accordion body.It is hidden by default, until the collapse
                                                    plugin adds
                                                    the appropriate classes that we use to style each element. These classes control the
                                                    overall
                                                    appearance, as well as the showing and hiding via CSS transitions. You can modify any
                                                    of this with
                                                    custom CSS or overriding our default variables.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 py-3">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button fs-4 fw-bold text-dark bg-transparent collapsed focus-transparent text-capitalize shadow-none"
                                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
                                                aria-controls="collapseFour">
                                                How is the charge determine ?
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>This is the third item's accordion body.It is hidden by default, until the collapse
                                                    plugin adds
                                                    the appropriate classes that we use to style each element. These classes control the
                                                    overall
                                                    appearance, as well as the showing and hiding via CSS transitions. You can modify any
                                                    of this with
                                                    custom CSS or overriding our default variables.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </main>
                        <div className="inquiry-item col-md-4">
                            <h3 className="section-title mb-3">Ask us anything</h3>
                            <p>Call Us +123 987 456 or just drop us your message at <a
                                href="mailto:contact@yourcompany.com">contact@yourcompany.com</a>. You can directly message
                                us. </p>
                            <form id="form" className="form-group flex-wrap">
                                <div className="form-input col-lg-12 d-flex mb-3">
                                    <input type="text" name="email" placeholder="Write Your Name Here" className="form-control ps-3 me-3" />
                                    <input type="text" name="email" placeholder="Write Your Email Here" className="form-control ps-3"
                                    />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <input type="text" name="email" placeholder="Phone Number" className="form-control ps-3" />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <input type="text" name="email" placeholder="Write Your Subject Here" className="form-control ps-3" />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <textarea placeholder="Write Your Message Here" className="form-control ps-3" rows="8"></textarea>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-arrow btn-primary btn-lg btn-pill btn-dark fs-6">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FrequentlyAskedQuestions;
