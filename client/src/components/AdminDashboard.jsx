



// import React, { useState, useEffect } from 'react';
// import { Button, Card, Container, Form, Row, Col, Table } from 'react-bootstrap';
// import api from '../api';

// const AdminDashboard = () => {
//   const [tenants, setTenants] = useState([]);
//   const [rentAmount, setRentAmount] = useState('');
//   const [maintenanceRequests, setMaintenanceRequests] = useState([]);
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [apartmentDetails, setApartmentDetails] = useState({ number: '', details: '' });
//   const [apartments, setApartments] = useState([]);

//   useEffect(() => {
//     const fetchTenants = async () => {
//       const { data } = await api.get('/admin/tenants');
//       setTenants(data);
//     };

//     const fetchMaintenanceRequests = async () => {
//       const { data } = await api.get('/admin/maintenance');
//       setMaintenanceRequests(data);
//     };

//     const fetchApartments = async () => {
//       const { data } = await api.get('/admin/apartments');
//       setApartments(data);
//     };

//     fetchTenants();
//     fetchMaintenanceRequests();
//     fetchApartments();
//   }, []);

//   const handleSetRent = async () => {
//     await api.post('/admin/rent', { rentAmount });
//   };

//   const handleMarkRequestAsDone = async (tenantId, requestId) => {
//     await api.put(`/admin/maintenance/${tenantId}/${requestId}`);
//     setMaintenanceRequests((prevRequests) =>
//       prevRequests.map((tenant) => {
//         if (tenant._id === tenantId) {
//           tenant.requests = tenant.requests.map((request) =>
//             request._id === requestId ? { ...request, status: 'done' } : request
//           );
//         }
//         return tenant;
//       })
//     );
//   };

//   const handleApproveRentPayment = async (tenantId, approved) => {
//     await api.put(`/admin/rent-payment/${tenantId}`, { approved });
//     setTenants((prevTenants) =>
//       prevTenants.map((tenant) =>
//         tenant._id === tenantId ? { ...tenant, rentPaid: approved } : tenant
//       )
//     );
//   };

//   const handleApartmentChange = (e) => {
//     const { name, value } = e.target;
//     setApartmentDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleAddApartment = async () => {
//     await api.post('/admin/apartment', apartmentDetails);
//   };

//   const handleUpdateApartment = async (id) => {
//     await api.put(`/admin/apartment/${id}`, apartmentDetails);
//   };

//   const handleDeleteApartment = async (id) => {
//     await api.delete(`/admin/apartment/${id}`);
//   };

//   return (
//     <Container className="mt-5">
//       <h2 className="mb-4 text-center">Admin Dashboard</h2>

//       <Card className="mb-4">
//         <Card.Header as="h5">Set Rent Amount</Card.Header>
//         <Card.Body>
//           <Form>
//             <Row>
//               <Col md={8}>
//                 <Form.Group controlId="rentAmount">
//                   <Form.Label>Rent Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={rentAmount}
//                     onChange={(e) => setRentAmount(e.target.value)}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4} className="d-flex align-items-end">
//                 <Button variant="primary" onClick={handleSetRent}>
//                   Set Rent
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>

//       <Card className="mb-4">
//         <Card.Header as="h5">All Tenants</Card.Header>
//         <Card.Body>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Rent Paid</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tenants.map((tenant) => (
//                 <tr key={tenant._id}>
//                   <td>{tenant.name}</td>
//                   <td>{tenant.rentPaid ? 'Yes' : 'No'}</td>
//                   <td>
//                     <Button
//                       variant={tenant.rentPaid ? 'warning' : 'success'}
//                       onClick={() => handleApproveRentPayment(tenant._id, !tenant.rentPaid)}
//                       className="me-2"
//                     >
//                       {tenant.rentPaid ? 'Unapprove Rent' : 'Approve Rent'}
//                     </Button>
//                     <Button
//                       variant="info"
//                       onClick={() => setSelectedTenant(tenant._id)}
//                     >
//                       View Details
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       <Card className="mb-4">
//         <Card.Header as="h5">Maintenance Requests</Card.Header>
//         <Card.Body>
//           {maintenanceRequests.map((tenant) => (
//             <div key={tenant.tenantName}>
//               <h6>{tenant.tenantName}</h6>
//               {tenant.requests.map((request) => (
//                 <div key={request._id}>
//                   <p>{request.message} - Status: {request.status}</p>
//                   {request.status === 'pending' && (
//                     <Button
//                       variant="success"
//                       onClick={() => handleMarkRequestAsDone(tenant._id, request._id)}
//                     >
//                       Mark as Done
//                     </Button>
//                   )}
//                 </div>
//               ))}
//               <hr />
//             </div>
//           ))}
//         </Card.Body>
//       </Card>

//       <Card className="mb-4">
//         <Card.Header as="h5">Apartment Details</Card.Header>
//         <Card.Body>
//           <Form>
//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="apartmentNumber">
//                   <Form.Label>Apartment Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="number"
//                     value={apartmentDetails.number}
//                     onChange={handleApartmentChange}
//                     placeholder="Enter Apartment Number"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="apartmentDetails">
//                   <Form.Label>Apartment Details</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="details"
//                     value={apartmentDetails.details}
//                     onChange={handleApartmentChange}
//                     placeholder="Enter Apartment Details"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row className="mt-3">
//               <Col md={12}>
//                 <Button variant="primary" onClick={handleAddApartment}>
//                   Add Apartment
//                 </Button>
//               </Col>
//             </Row>
//           </Form>

//           <Table striped bordered hover className="mt-4">
//             <thead>
//               <tr>
//                 <th>Number</th>
//                 <th>Details</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {apartments.map((apartment) => (
//                 <tr key={apartment._id}>
//                   <td>{apartment.number}</td>
//                   <td>{apartment.details}</td>
//                   <td>
//                     <Button
//                       variant="warning"
//                       onClick={() => handleUpdateApartment(apartment._id)}
//                       className="me-2"
//                     >
//                       Update
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDeleteApartment(apartment._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AdminDashboard;







import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Form, Row, Col, Table } from 'react-bootstrap';
import api from '../api';

const AdminDashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [rentAmount, setRentAmount] = useState('');
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [apartmentDetails, setApartmentDetails] = useState({ number: '', details: '' });
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const { data } = await api.get('/admin/tenants');
        setTenants(data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    const fetchMaintenanceRequests = async () => {
      try {
        const { data } = await api.get('/admin/maintenance');
        setMaintenanceRequests(data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      }
    };

    const fetchApartments = async () => {
      try {
        const { data } = await api.get('/admin/apartments');
        setApartments(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchTenants();
    fetchMaintenanceRequests();
    fetchApartments();
  }, []);

  const handleSetRent = async () => {
    try {
      await api.post('/admin/rent', { rentAmount });
      setRentAmount(''); // Clear the input field after successful update
    } catch (error) {
      console.error('Error setting rent amount:', error);
    }
  };

  const handleMarkRequestAsDone = async (tenantId, requestId) => {
    try {
      await api.put(`/admin/maintenance/${tenantId}/${requestId}`, { status: 'done' });
      setMaintenanceRequests((prevRequests) =>
        prevRequests.map((tenant) =>
          tenant._id === tenantId
            ? {
                ...tenant,
                requests: tenant.requests.map((request) =>
                  request._id === requestId ? { ...request, status: 'done' } : request
                ),
              }
            : tenant
        )
      );
    } catch (error) {
      console.error('Error marking request as done:', error);
    }
  };

  const handleApproveRentPayment = async (rentId, status) => {
    try {
      await api.put(`/admin/manage-rent/${rentId}`, { status });
      setTenants((prevTenants) =>
        prevTenants.map((tenant) =>
          tenant._id === rentId ? { ...tenant, rentPaid: status === 'approved' } : tenant
        )
      );
    } catch (error) {
      console.error('Error approving rent payment:', error);
    }
  };

  const handleApartmentChange = (e) => {
    const { name, value } = e.target;
    setApartmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddApartment = async () => {
    try {
      await api.post('/admin/apartment', apartmentDetails);
      setApartmentDetails({ number: '', details: '' }); // Clear the input fields after successful addition
    } catch (error) {
      console.error('Error adding apartment:', error);
    }
  };

  const handleUpdateApartment = async (id) => {
    try {
      await api.put(`/admin/apartment/${id}`, apartmentDetails);
      setApartmentDetails({ number: '', details: '' }); // Clear the input fields after successful update
    } catch (error) {
      console.error('Error updating apartment:', error);
    }
  };

  const handleDeleteApartment = async (id) => {
    try {
      await api.delete(`/admin/apartment/${id}`);
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      <Card className="mb-4">
        <Card.Header as="h5">Set Rent Amount</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group controlId="rentAmount">
                  <Form.Label>Rent Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <Button variant="primary" onClick={handleSetRent}>
                  Set Rent
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header as="h5">All Tenants</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rent Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant._id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.rentPaid ? 'Yes' : 'No'}</td>
                  <td>
                    <Button
                      variant={tenant.rentPaid ? 'warning' : 'success'}
                      onClick={() => handleApproveRentPayment(tenant._id, tenant.rentPaid ? 'unapproved' : 'approved')}
                      className="me-2"
                    >
                      {tenant.rentPaid ? 'Unapprove Rent' : 'Approve Rent'}
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => setSelectedTenant(tenant._id)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header as="h5">Maintenance Requests</Card.Header>
        <Card.Body>
          {maintenanceRequests.map((tenant) => (
            <div key={tenant._id}>
              <h6>{tenant.name}</h6>
              {tenant.maintenanceRequests.map((request) => (
                <div key={request._id}>
                  <p>{request.message} - Status: {request.status}</p>
                  {request.status === 'pending' && (
                    <Button
                      variant="success"
                      onClick={() => handleMarkRequestAsDone(tenant._id, request._id)}
                    >
                      Mark as Done
                    </Button>
                  )}
                </div>
              ))}
              <hr />
            </div>
          ))}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header as="h5">Apartment Details</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="apartmentNumber">
                  <Form.Label>Apartment Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={apartmentDetails.number}
                    onChange={handleApartmentChange}
                    placeholder="Enter Apartment Number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="apartmentDetails">
                  <Form.Label>Apartment Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="details"
                    value={apartmentDetails.details}
                    onChange={handleApartmentChange}
                    placeholder="Enter Apartment Details"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}>
                <Button variant="primary" onClick={handleAddApartment}>
                  Add Apartment
                </Button>
              </Col>
            </Row>
          </Form>

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Number</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
                <tr key={apartment._id}>
                  <td>{apartment.number}</td>
                  <td>{apartment.details}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateApartment(apartment._id)}
                      className="me-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteApartment(apartment._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;

