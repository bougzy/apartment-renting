
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import api from '../api';
import ProfileManagement from './ProfileManagement'; // Import the ProfileManagement component

const TenantDashboard = () => {
  const [user, setUser] = useState(null);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentAmount, setRentAmount] = useState(''); // State for rent amount
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State for success message
  const [rentError, setRentError] = useState(''); // State for rent validation error
  const [payingRent, setPayingRent] = useState(false); // State for rent payment processing
  const [sendingRequest, setSendingRequest] = useState(false); // State for maintenance request processing

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/profile');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePayRent = async () => {
    if (!rentAmount) {
      setRentError('Please enter a valid rent amount.'); // Set validation error message
      return;
    }
    
    setPayingRent(true); // Set rent payment process to true
    try {
      await api.post('/pay-rent', { amount: rentAmount });
      setUser((prevUser) => ({ ...prevUser, rentPaid: true }));
      setPaymentSuccess(true); // Display success message
      setRentAmount(''); // Clear the rent amount after payment
      setRentError(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error paying rent:', error);
    } finally {
      setPayingRent(false); // Set rent payment process to false
    }
  };

  const handleMaintenanceRequest = async () => {
    setSendingRequest(true); // Set maintenance request process to true
    try {
      await api.post('/maintenance', { message: maintenanceMessage });
      setMaintenanceMessage('');
    } catch (error) {
      console.error('Error sending maintenance request:', error);
    } finally {
      setSendingRequest(false); // Set maintenance request process to false
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h2 className="text-center">Welcome, {user.name}</h2>
            </Card.Header>
            <Card.Body>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Rent Status:</strong> {user.rentPaid ? (
                  <Alert variant="success">Paid</Alert>
                ) : (
                  <Alert variant="danger">Not Paid</Alert>
                )}
              </p>

              {!user.rentPaid && (
                <>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Rent Amount</Form.Label>
                      <Form.Control
                        type="number"
                        value={rentAmount}
                        onChange={(e) => setRentAmount(e.target.value)}
                        placeholder="Enter amount"
                        isInvalid={!!rentError} // Check if there's an error
                      />
                      <Form.Control.Feedback type="invalid">
                        {rentError} {/* Display error message */}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={handlePayRent}
                      className="w-100"
                      disabled={payingRent} // Disable button when processing
                    >
                      {payingRent ? (
                        <>
                          <Spinner animation="border" size="sm" /> Paying...
                        </>
                      ) : (
                        'Pay Rent'
                      )}
                    </Button>
                  </Form>
                  {paymentSuccess && (
                    <Alert variant="success" className="mt-3">
                      Rent payment was successful!
                    </Alert>
                  )}
                </>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h3 className="text-center">Maintenance Request</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={maintenanceMessage}
                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                    placeholder="Describe your maintenance issue..."
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  onClick={handleMaintenanceRequest}
                  className="w-100"
                  disabled={sendingRequest} // Disable button when processing
                >
                  {sendingRequest ? (
                    <>
                      <Spinner animation="border" size="sm" /> Sending...
                    </>
                  ) : (
                    'Submit Maintenance Request'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>


                    

          <Card>
            <Card.Header>
              <h3 className="text-center">Profile Management</h3>
            </Card.Header>
            <Card.Body>
              <ProfileManagement /> {/* Include the ProfileManagement component */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TenantDashboard;
