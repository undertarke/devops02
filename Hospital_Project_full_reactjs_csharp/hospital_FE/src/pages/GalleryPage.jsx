import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Isotope from 'isotope-layout';

const GalleryPage = () => {
    const isotopeContainerRef = useRef(null);
    const isotopeInstance = useRef(null);

    useEffect(() => {
        if (isotopeContainerRef.current) {
            isotopeInstance.current = new Isotope(isotopeContainerRef.current, {
                itemSelector: '.item',
                layoutMode: 'masonry'
            });
        }

        return () => {
            if (isotopeInstance.current) {
                isotopeInstance.current.destroy();
            }
        };
    }, []);

    const handleFilter = (filter) => {
        if (isotopeInstance.current) {
            isotopeInstance.current.arrange({ filter });
        }
    };
    
    // a little helper for button active state
    const handleActiveButton = (e) => {
        const buttons = document.querySelectorAll('.filter-button');
        buttons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');
    };

    const handleFilterClick = (e, filter) => {
        handleFilter(filter);
        handleActiveButton(e);
    }

    return (
        <>
            <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
                <div className="container">
                    <div className="banner-content padding-large">
                        <h1 className="display-3 fw-bold text-dark">Gallery</h1>
                        <span className="item"><Link to="/" className="">Home</Link></span> &nbsp; <span className="">/</span> &nbsp; <span
                            className=" item">Gallery</span>
                    </div>
                </div>
            </section>

            <section id="gallery">
                <div className="container my-5 py-5">
                    <h2 className=" fw-bold display-4 mb-5">Gallery</h2>
                    <div className="py-4 my-4 ">
                        <div className="mb-4">
                            <p className="">
                                <button className="filter-button gallery-btn px-4 py-1 me-2 mb-2 active" onClick={(e) => handleFilterClick(e, '*')}>All</button>
                                <button className="filter-button gallery-btn px-4 py-1 me-2 mb-2" onClick={(e) => handleFilterClick(e, '.pharma')}>Pharmaceutical</button>
                                <button className="filter-button gallery-btn px-4 py-1 me-2 mb-2" onClick={(e) => handleFilterClick(e, '.neuro')}>Neurology</button>
                                <button className="filter-button gallery-btn px-4 py-1 me-2 mb-2" onClick={(e) => handleFilterClick(e, '.ortho')}>Orthopedic</button>
                                <button className="filter-button gallery-btn px-4 py-1 me-2 mb-2" onClick={(e) => handleFilterClick(e, '.psycho')}>Psychology</button>
                                <button className="filter-button gallery-btn px-4 py-1 me-2 mb-2" onClick={(e) => handleFilterClick(e, '.audio')}>Audiology</button>
                            </p>
                        </div>
                        <div className="isotope-container" ref={isotopeContainerRef}>
                            <div className="item ortho col-md-4">
                                <a href="/images/post-item1.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/post-item1.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item neuro col-md-4">
                                <a href="/images/team-item2.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/team-item2.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item audio col-md-4">
                                <a href="/images/post-item2.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/post-item2.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item ortho col-md-4">
                                <a href="/images/team-item.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/team-item.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item psycho col-md-4">
                                <a href="/images/team-item1.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/team-item1.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item neuro col-md-4">
                                <a href="/images/post-item3.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/post-item3.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item pharma col-md-4">
                                <a href="/images/post-item3.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/post-item3.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item pharma col-md-4">
                                <a href="/images/post-item2.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/post-item2.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item psycho col-md-4">
                                <a href="/images/post-item1.jpg" title="Medical" className="image-link">
                                    <img className="portfolio-img img-fluid ps-0 pb-0 p-3" src="/images/post-item1.jpg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GalleryPage; 