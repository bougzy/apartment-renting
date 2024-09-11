



// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
// import api from '../api';

// const ProfileManagement = () => {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data } = await api.get('/profile');
//       setUser(data);
//       setName(data.name);
//       setEmail(data.email);
//       setLoading(false);
//     };
//     fetchUser();
//   }, []);

//   const handleUpdate = async () => {
//     await api.put('/user/profile', { name, email, password });
//     setUser((prevUser) => ({ ...prevUser, name, email }));
//     setPassword(''); // Clear password field
//     setSuccessMessage('Profile updated successfully!');
//     setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete your profile?')) {
//       await api.delete('/user/profile');
//       // Optionally, redirect user to login page or show a success message
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

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card>
//             <Card.Header>
//               <h2 className="text-center">Manage Profile</h2>
//             </Card.Header>
//             <Card.Body>
//               {successMessage && <Alert variant="success">{successMessage}</Alert>}
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter your name"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>New Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter a new password"
//                   />
//                 </Form.Group>
//                 <div className="d-grid gap-2">
//                   <Button variant="primary" onClick={handleUpdate}>
//                     Update Profile
//                   </Button>
//                 </div>
//               </Form>
//               <div className="d-grid gap-2 mt-3">
//                 <Button variant="danger" onClick={handleDelete}>
//                   Delete Profile
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ProfileManagement;











import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import api from '../api';

const ProfileManagement = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/profile');
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put('/profile', { name, email, password }); // Adjusted endpoint
      setUser((prevUser) => ({ ...prevUser, name, email }));
      setPassword(''); // Clear password field
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        await api.delete('/profile'); // Adjusted endpoint
        // Optionally, redirect user to login page or show a success message
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
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

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h2 className="text-center">Profile Management</h2>
            </Card.Header>
            <Card.Body>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleUpdate}
                  className="w-100"
                >
                  Update Profile
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="w-100 mt-3"
                >
                  Delete Account
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileManagement;
