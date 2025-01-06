import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4" style={{ position: 'relative', bottom: '0', width: '100%' }}>
            <div className="container-fluid">
                {/* Footer Content */}
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 mx-auto">
                        <p>&copy; 2025 Estate Finder. All Rights Reserved.</p>
                        <p>Email: contact@estatefinder.com </p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Address: 123 , Orpingtion, UK</p>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="row justify-content-center my-3">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="social-links">
                            <a href="https://facebook.com" className="text-white mx-2" style={{ textDecoration: 'none' }}>
                                <i className="fab fa-facebook"></i> Facebook
                            </a>
                            <a href="https://twitter.com" className="text-white mx-2" style={{ textDecoration: 'none' }}>
                                <i className="fab fa-twitter"></i> Twitter
                            </a>
                            <a href="https://instagram.com" className="text-white mx-2" style={{ textDecoration: 'none' }}>
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-4" style={{ borderTop: '1px solid #ddd' }} />
                
                <p style={{ fontSize: '16px' }} className="d-block">
                    Stay connected with us for more updates and news!
                </p>
            </div>
        </footer>
    );
};

export default Footer;
