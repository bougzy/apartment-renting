
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
// import api from '../api';
// import ProfileManagement from './ProfileManagement'; // Import the ProfileManagement component

// const TenantDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [maintenanceMessage, setMaintenanceMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rentAmount, setRentAmount] = useState(''); // State for rent amount
//   const [paymentSuccess, setPaymentSuccess] = useState(false); // State for success message
//   const [rentError, setRentError] = useState(''); // State for rent validation error
//   const [payingRent, setPayingRent] = useState(false); // State for rent payment processing
//   const [sendingRequest, setSendingRequest] = useState(false); // State for maintenance request processing

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await api.get('/profile');
//         setUser(data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setError('Failed to load user data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handlePayRent = async () => {
//     if (!rentAmount || rentAmount <= 0) {
//       setRentError('Please enter a valid rent amount.'); // Set validation error message
//       return;
//     }
    
//     setPayingRent(true); // Set rent payment process to true
//     try {
//       await api.post('/pay-rent', { rentAmount }); // Adjusted field name to rentAmount
//       setUser((prevUser) => ({ ...prevUser, rentPaid: true }));
//       setPaymentSuccess(true); // Display success message
//       setRentAmount(''); // Clear the rent amount after payment
//       setRentError(''); // Clear any previous error messages
//     } catch (error) {
//       console.error('Error paying rent:', error);
//     } finally {
//       setPayingRent(false); // Set rent payment process to false
//     }
//   };

//   const handleMaintenanceRequest = async () => {
//     setSendingRequest(true); // Set maintenance request process to true
//     try {
//       await api.post('/maintenance', { message: maintenanceMessage });
//       setMaintenanceMessage('');
//     } catch (error) {
//       console.error('Error sending maintenance request:', error);
//     } finally {
//       setSendingRequest(false); // Set maintenance request process to false
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center">
//         <Spinner animation="border" role="status">
//           <span className="sr-only">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   if (!user) {
//     return <p>No user data available.</p>;
//   }

//   return (
//     <Container className="mt-5 mb-5">
//       <Row className="justify-content-center">
//         <Col md={8}>
//           <Card className="mb-4">
//             <Card.Header>
//               <h2 className="text-center">Welcome, {user.name}</h2>
//             </Card.Header>
//             <Card.Body>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p>
//                 <strong>Rent Status:</strong> {user.rentPaid ? (
//                   <Alert variant="success">Paid</Alert>
//                 ) : (
//                   <Alert variant="danger">Not Paid</Alert>
//                 )}
//               </p>

//               {!user.rentPaid && (
//                 <>
//                   <Form>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Rent Amount</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={rentAmount}
//                         onChange={(e) => setRentAmount(e.target.value)}
//                         placeholder="Enter amount"
//                         isInvalid={!!rentError} // Check if there's an error
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {rentError} {/* Display error message */}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                     <Button
//                       variant="primary"
//                       onClick={handlePayRent}
//                       className="w-100"
//                       disabled={payingRent} // Disable button when processing
//                     >
//                       {payingRent ? (
//                         <>
//                           <Spinner animation="border" size="sm" /> Paying...
//                         </>
//                       ) : (
//                         'Pay Rent'
//                       )}
//                     </Button>
//                   </Form>
//                   {paymentSuccess && (
//                     <Alert variant="success" className="mt-3">
//                       Rent payment was successful!
//                     </Alert>
//                   )}
//                 </>
//               )}
//             </Card.Body>
//           </Card>

//           <Card className="mb-4">
//             <Card.Header>
//               <h3 className="text-center">Maintenance Request</h3>
//             </Card.Header>
//             <Card.Body>
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     value={maintenanceMessage}
//                     onChange={(e) => setMaintenanceMessage(e.target.value)}
//                     placeholder="Describe your maintenance issue..."
//                   />
//                 </Form.Group>
//                 <Button
//                   variant="warning"
//                   onClick={handleMaintenanceRequest}
//                   className="w-100"
//                   disabled={sendingRequest} // Disable button when processing
//                 >
//                   {sendingRequest ? (
//                     <>
//                       <Spinner animation="border" size="sm" /> Sending...
//                     </>
//                   ) : (
//                     'Submit Maintenance Request'
//                   )}
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>

//           <Card>
//             <Card.Header>
//               <h3 className="text-center">Profile Management</h3>
//             </Card.Header>
//             <Card.Body>
//               <ProfileManagement /> {/* Include the ProfileManagement component */}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default TenantDashboard;



// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
// import api from '../api';
// import ProfileManagement from './ProfileManagement';

// const TenantDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [maintenanceMessage, setMaintenanceMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rentAmount, setRentAmount] = useState('');
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [rentError, setRentError] = useState('');
//   const [payingRent, setPayingRent] = useState(false);
//   const [sendingRequest, setSendingRequest] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await api.get('/profile');
//         setUser(data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setError('Failed to load user data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handlePayRent = async () => {
//     if (!rentAmount || rentAmount <= 0) {
//       setRentError('Please enter a valid rent amount.');
//       return;
//     }
    
//     setPayingRent(true);
//     try {
//       await api.post('/pay-rent', { rentAmount });
//       setUser((prevUser) => ({ ...prevUser, rentPaid: true }));
//       setPaymentSuccess(true);
//       setRentAmount('');
//       setRentError('');
//     } catch (error) {
//       console.error('Error paying rent:', error);
//     } finally {
//       setPayingRent(false);
//     }
//   };

//   const handleMaintenanceRequest = async () => {
//     setSendingRequest(true);
//     try {
//       await api.post('/maintenance', { message: maintenanceMessage });
//       setMaintenanceMessage('');
//     } catch (error) {
//       console.error('Error sending maintenance request:', error);
//     } finally {
//       setSendingRequest(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center">
//         <Spinner animation="border" role="status">
//           <span className="sr-only">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   if (!user) {
//     return <p>No user data available.</p>;
//   }

//   return (
//     <Container className="mt-5 mb-5">
//       <Row className="justify-content-center">
//         <Col md={8}>
//           <Card className="mb-4">
//             <Card.Header>
//               <h2 className="text-center">Welcome, {user.name}</h2>
//             </Card.Header>
//             <Card.Body>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p>
//                 <strong>Rent Status:</strong> {user.rentPaid ? (
//                   <Alert variant="success">Paid</Alert>
//                 ) : (
//                   <Alert variant="danger">Not Paid</Alert>
//                 )}
//               </p>
//               <p>
//                 <strong>Apartment:</strong> {user.apartmentId ? (
//                   <span>Apartment {user.apartmentId.number} - {user.apartmentId.details}</span>
//                 ) : (
//                   <span>No apartment assigned</span>
//                 )}
//               </p>

//               {!user.rentPaid && (
//                 <>
//                   <Form>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Rent Amount</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={rentAmount}
//                         onChange={(e) => setRentAmount(e.target.value)}
//                         placeholder="Enter amount"
//                         isInvalid={!!rentError}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {rentError}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                     <Button
//                       variant="primary"
//                       onClick={handlePayRent}
//                       className="w-100"
//                       disabled={payingRent}
//                     >
//                       {payingRent ? (
//                         <>
//                           <Spinner animation="border" size="sm" /> Paying...
//                         </>
//                       ) : (
//                         'Pay Rent'
//                       )}
//                     </Button>
//                   </Form>
//                   {paymentSuccess && (
//                     <Alert variant="success" className="mt-3">
//                       Rent payment was successful!
//                     </Alert>
//                   )}
//                 </>
//               )}
//             </Card.Body>
//           </Card>

//           <Card className="mb-4">
//             <Card.Header>
//               <h3 className="text-center">Maintenance Request</h3>
//             </Card.Header>
//             <Card.Body>
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     value={maintenanceMessage}
//                     onChange={(e) => setMaintenanceMessage(e.target.value)}
//                     placeholder="Describe your maintenance issue..."
//                   />
//                 </Form.Group>
//                 <Button
//                   variant="warning"
//                   onClick={handleMaintenanceRequest}
//                   className="w-100"
//                   disabled={sendingRequest}
//                 >
//                   {sendingRequest ? (
//                     <>
//                       <Spinner animation="border" size="sm" /> Sending...
//                     </>
//                   ) : (
//                     'Submit Maintenance Request'
//                   )}
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>

//           <Card>
//             <Card.Header>
//               <h3 className="text-center">Profile Management</h3>
//             </Card.Header>
//             <Card.Body>
//               <ProfileManagement />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default TenantDashboard;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, Modal } from 'react-bootstrap';
import api from '../api';
import ProfileManagement from './ProfileManagement';

const TenantDashboard = () => {
  const [user, setUser] = useState(null);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentAmount, setRentAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [rentError, setRentError] = useState('');
  const [payingRent, setPayingRent] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const [amount, setAmount] = useState('');

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
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentOption('');
    setAmount('');
  };

  const handlePaymentOptionChange = (e) => setPaymentOption(e.target.value);

  const handleConfirmPayment = async () => {
    if (!amount || amount <= 0 || !paymentOption) {
      setRentError('Please provide a valid amount and select a payment option.');
      return;
    }

    setPayingRent(true);
    try {
      await api.post('/pay-rent', { rentAmount: amount, paymentOption });
      setUser((prevUser) => ({ ...prevUser, rentPaid: true }));
      setPaymentSuccess(true);
      setAmount('');
      setRentError('');
      handleClosePaymentModal();
    } catch (error) {
      console.error('Error paying rent:', error);
      setRentError('Error processing payment. Please try again.');
    } finally {
      setPayingRent(false);
    }
  };

  const handleMaintenanceRequest = async () => {
    setSendingRequest(true);
    try {
      await api.post('/maintenance', { message: maintenanceMessage });
      setMaintenanceMessage('');
    } catch (error) {
      console.error('Error sending maintenance request:', error);
    } finally {
      setSendingRequest(false);
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
              <p>
                <strong>Apartment:</strong> {user.apartmentId ? (
                  <span>Apartment {user.apartmentId.number} - {user.apartmentId.details}</span>
                ) : (
                  <span>No apartment assigned</span>
                )}
              </p>

              {!user.rentPaid && (
                <>
                  <Button
                    variant="primary"
                    onClick={handlePayRent}
                    className="w-100"
                  >
                    {payingRent ? (
                      <>
                        <Spinner animation="border" size="sm" /> Paying...
                      </>
                    ) : (
                      'Pay Rent'
                    )}
                  </Button>
                  {paymentSuccess && (
                    <Alert variant="success" className="mt-3">
                      Rent payment was successful!
                    </Alert>
                  )}
                  {rentError && (
                    <Alert variant="danger" className="mt-3">
                      {rentError}
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
                  disabled={sendingRequest}
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
              <ProfileManagement />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Rent Payment Modal */}
      <Modal show={showPaymentModal} onHide={handleClosePaymentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Rent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Payment Option</Form.Label>
              <Form.Control
                as="select"
                value={paymentOption}
                onChange={handlePaymentOptionChange}
              >
                <option value="">Select an option</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </Form.Group>
            {rentError && (
              <Alert variant="danger">
                {rentError}
              </Alert>
            )}
            <Button
              variant="primary"
              onClick={handleConfirmPayment}
              disabled={payingRent}
            >
              {payingRent ? (
                <>
                  <Spinner animation="border" size="sm" /> Processing...
                </>
              ) : (
                'Confirm Payment'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TenantDashboard;
