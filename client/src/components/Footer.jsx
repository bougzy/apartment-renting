import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          {/* Column for Quick Links */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/about" className="text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-white">Contact</Link></li>
              <li><Link to="/terms" className="text-white">Terms of Service</Link></li>
            </ul>
          </Col>

          {/* Column for Social Media */}
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">LinkedIn</a></li>
            </ul>
          </Col>

          {/* Column for Contact Info */}
          <Col md={4}>
            <h5>Contact Us</h5>
            <p className="mb-0">123 Main Street</p>
            <p className="mb-0">City, State, ZIP</p>
            <p className="mb-0">Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Apartment Rent App. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
