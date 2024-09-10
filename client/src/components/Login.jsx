



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
// import api from '../api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post('https://apartment-renting.vercel.app/api/login', { email, password });
//       localStorage.setItem('token', data.token);
//       if (data.role === 'admin') {
//         navigate('/admin-dashboard');
//       } else {
//         navigate('/tenant-dashboard');
//       }
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <Row className="w-100 justify-content-center">
//         <Col md={6} lg={4}>
//           <Card className="p-4 shadow">
//             <Card.Body>
//               <h2 className="text-center mb-4">Login</h2>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleLogin}>
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
//                   Login
//                 </Button>
//               </Form>
//               <div className="mt-3 text-center">
//                 <p className="text-muted">Don't have an account? <a href="/register">Sign up</a></p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../api'; // Update this path according to your project structure

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('https://apartment-renting.vercel.app/api/login', { email, password });
      localStorage.setItem('token', data.token);
      if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/tenant-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
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
                  Login
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <p className="text-muted">Don't have an account? <a href="/register">Sign up</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
