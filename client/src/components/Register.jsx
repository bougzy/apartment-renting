

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
// import api from '../api';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('https://apartment-renting.vercel.app/api/register', { name, email, password });
//       navigate('/login'); // Redirect to login page after successful registration
//     } catch (err) {
//       setError('Error registering user');
//     }
//   };

//   return (
//     <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <Row className="w-100 justify-content-center">
//         <Col md={6} lg={4}>
//           <Card className="p-4 shadow">
//             <Card.Body>
//               <h2 className="text-center mb-4">Register</h2>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleRegister}>
//                 <Form.Group controlId="formName" className="mb-3">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formEmail" className="mb-3">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formPassword" className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="w-100">
//                   Register
//                 </Button>
//               </Form>
//               <div className="mt-3 text-center">
//                 <p className="text-muted">Already have an account? <a href="/login">Login here</a></p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;















import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api'; // Update this path according to your project structure

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await api.post('https://apartment-renting.vercel.app/api/register', { name, email, password });
  //     navigate('/login'); // Redirect to login page after successful registration
  //   } catch (err) {
  //     setError('Error registering user');
  //   }
  // };


  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await api.post('https://apartment-renting.vercel.app/api/register', { name, email, password });
    navigate('/login'); // Redirect to login page after successful registration
  } catch (err) {
    setError('Error registering user');
  }
};


  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleRegister}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <p className="text-muted">Already have an account? <a href="/login">Login here</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

