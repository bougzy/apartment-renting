



// import React, { useState, useEffect } from 'react';
// import { Button, Card, Container, Form, Row, Col, Table } from 'react-bootstrap';
// import api from '../api';

// const AdminDashboard = () => {
//   const [tenants, setTenants] = useState([]);
//   const [rentAmount, setRentAmount] = useState('');
//   const [maintenanceRequests, setMaintenanceRequests] = useState([]);
//   const [selectedTenant, setSelectedTenant] = useState('');
//   const [apartmentDetails, setApartmentDetails] = useState({ number: '', details: '' });
//   const [apartments, setApartments] = useState([]);
//   const [selectedApartment, setSelectedApartment] = useState('');

//   const fetchData = async () => {
//     try {
//       const tenantsResponse = await api.get('/admin/tenants');
//       setTenants(tenantsResponse.data);
      
//       const maintenanceResponse = await api.get('/admin/maintenance');
//       setMaintenanceRequests(maintenanceResponse.data);
      
//       const apartmentsResponse = await api.get('/admin/apartments');
//       setApartments(apartmentsResponse.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSetRent = async () => {
//     try {
//       await api.post('/admin/rent', { rentAmount });
//       setRentAmount('');
//       fetchData(); // Optionally re-fetch tenants if rent amount affects tenant data
//     } catch (error) {
//       console.error('Error setting rent amount:', error);
//     }
//   };

//   const handleMarkRequestAsDone = async (tenantId, requestId) => {
//     try {
//       await api.put(`/admin/maintenance/${tenantId}/${requestId}`, { status: 'done' });
//       fetchData(); // Re-fetch maintenance requests
//     } catch (error) {
//       console.error('Error marking request as done:', error);
//     }
//   };

//   const handleApproveRentPayment = async (tenantId, currentStatus) => {
//     const newStatus = currentStatus === 'approved' ? 'unapproved' : 'approved';
//     try {
//       await api.put(`/admin/manage-rent/${tenantId}`, { status: newStatus });
//       fetchData(); // Re-fetch tenants to update rent status
//     } catch (error) {
//       console.error('Error approving rent payment:', error);
//     }
//   };

//   const handleApartmentChange = (e) => {
//     const { name, value } = e.target;
//     setApartmentDetails(prevDetails => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleAddApartment = async () => {
//     try {
//       await api.post('/admin/apartment', apartmentDetails);
//       setApartmentDetails({ number: '', details: '' });
//       fetchData(); // Re-fetch apartments
//     } catch (error) {
//       console.error('Error adding apartment:', error);
//     }
//   };

//   const handleUpdateApartment = async (id) => {
//     try {
//       await api.put(`/admin/apartment/${id}`, apartmentDetails);
//       setApartmentDetails({ number: '', details: '' });
//       fetchData(); // Re-fetch apartments
//     } catch (error) {
//       console.error('Error updating apartment:', error);
//     }
//   };

//   const handleDeleteApartment = async (id) => {
//     try {
//       await api.delete(`/admin/apartment/${id}`);
//       fetchData(); // Re-fetch apartments
//     } catch (error) {
//       console.error('Error deleting apartment:', error);
//     }
//   };

//   const handleAssignApartment = async () => {
//     try {
//       await api.put(`/admin/assign-apartment/${selectedTenant}`, { apartmentId: selectedApartment });
//       setSelectedTenant('');
//       setSelectedApartment('');
//       fetchData(); // Re-fetch tenants and apartments
//     } catch (error) {
//       console.error('Error assigning apartment:', error);
//     }
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
//               {Array.isArray(tenants) && tenants.map((tenant) => (
//                 <tr key={tenant._id}>
//                   <td>{tenant.name}</td>
//                   <td>{tenant.rentPaid ? 'Yes' : 'No'}</td>
//                   <td>
//                     <Button
//                       variant={tenant.rentPaid ? 'warning' : 'success'}
//                       onClick={() => handleApproveRentPayment(tenant._id, tenant.rentPaid ? 'approved' : 'unapproved')}
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
//           {Array.isArray(maintenanceRequests) && maintenanceRequests.map((tenant) => (
//             <div key={tenant._id}>
//               <h6>{tenant.name}</h6>
//               {Array.isArray(tenant.maintenanceRequests) && tenant.maintenanceRequests.map((request) => (
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
//             </div>
//           ))}
//         </Card.Body>
//       </Card>

//       <Card className="mb-4">
//         <Card.Header as="h5">Add/Update Apartments</Card.Header>
//         <Card.Body>
//           <Form>
//             <Row>
//               <Col md={4}>
//                 <Form.Group controlId="apartmentNumber">
//                   <Form.Label>Apartment Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="number"
//                     value={apartmentDetails.number}
//                     onChange={handleApartmentChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group controlId="apartmentDetails">
//                   <Form.Label>Details</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="details"
//                     value={apartmentDetails.details}
//                     onChange={handleApartmentChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4} className="d-flex align-items-end">
//                 <Button variant="primary" onClick={handleAddApartment}>
//                   Add Apartment
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//           <Table striped bordered hover responsive className="mt-3">
//             <thead>
//               <tr>
//                 <th>Number</th>
//                 <th>Details</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(apartments) && apartments.map((apartment) => (
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

//       <Card>
//         <Card.Header as="h5">Assign Apartment to Tenant</Card.Header>
//         <Card.Body>
//           <Form>
//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="tenantSelect">
//                   <Form.Label>Select Tenant</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={selectedTenant}
//                     onChange={(e) => setSelectedTenant(e.target.value)}
//                   >
//                     <option value="">Select Tenant</option>
//                     {Array.isArray(tenants) && tenants.map(tenant => (
//                       <option key={tenant._id} value={tenant._id}>{tenant.name}</option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="apartmentSelect">
//                   <Form.Label>Select Apartment</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={selectedApartment}
//                     onChange={(e) => setSelectedApartment(e.target.value)}
//                   >
//                     <option value="">Select Apartment</option>
//                     {Array.isArray(apartments) && apartments.map(apartment => (
//                       <option key={apartment._id} value={apartment._id}>{apartment.number}</option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//               <Col md={12} className="mt-3">
//                 <Button variant="primary" onClick={handleAssignApartment}>
//                   Assign Apartment
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
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
  const [selectedTenant, setSelectedTenant] = useState('');
  const [apartmentDetails, setApartmentDetails] = useState({ number: '', details: '' });
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState('');

  const fetchData = async () => {
    try {
      const tenantsResponse = await api.get('/admin/tenants');
      setTenants(tenantsResponse.data);

      const maintenanceResponse = await api.get('/admin/maintenance');
      setMaintenanceRequests(maintenanceResponse.data);

      const apartmentsResponse = await api.get('/admin/apartments');
      setApartments(apartmentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSetRent = async () => {
    try {
      await api.post('/admin/rent', { rentAmount });
      setRentAmount('');
      fetchData(); // Optionally re-fetch tenants if rent amount affects tenant data
    } catch (error) {
      console.error('Error setting rent amount:', error);
    }
  };

  const handleMarkRequestAsDone = async (tenantId, requestId) => {
    try {
      await api.put(`/admin/maintenance/${tenantId}/${requestId}`, { status: 'done' });
      fetchData(); // Re-fetch maintenance requests
    } catch (error) {
      console.error('Error marking request as done:', error);
    }
  };

  const handleApproveRentPayment = async (tenantId, currentStatus) => {
    const newStatus = currentStatus === 'approved' ? 'unapproved' : 'approved';
    try {
      await api.put(`/admin/manage-rent/${tenantId}`, { status: newStatus });
      fetchData(); // Re-fetch tenants to update rent status
    } catch (error) {
      console.error('Error approving rent payment:', error);
    }
  };

  const handleApartmentChange = (e) => {
    const { name, value } = e.target;
    setApartmentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddApartment = async () => {
    try {
      await api.post('/admin/apartment', apartmentDetails);
      setApartmentDetails({ number: '', details: '' });
      fetchData(); // Re-fetch apartments
    } catch (error) {
      console.error('Error adding apartment:', error);
    }
  };

  const handleUpdateApartment = async (id) => {
    try {
      await api.put(`/admin/apartment/${id}`, apartmentDetails);
      setApartmentDetails({ number: '', details: '' });
      fetchData(); // Re-fetch apartments
    } catch (error) {
      console.error('Error updating apartment:', error);
    }
  };

  const handleDeleteApartment = async (id) => {
    try {
      await api.delete(`/admin/apartment/${id}`);
      fetchData(); // Re-fetch apartments
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  const handleAssignApartment = async () => {
    try {
      await api.put(`/admin/assign-apartment/${selectedTenant}`, { apartmentId: selectedApartment });
      setSelectedTenant('');
      setSelectedApartment('');
      fetchData(); // Re-fetch tenants and apartments
    } catch (error) {
      console.error('Error assigning apartment:', error);
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
              {Array.isArray(tenants) && tenants.map((tenant) => (
                <tr key={tenant._id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.rentPaid ? 'Yes' : 'No'}</td>
                  <td>
                    <Button
                      variant={tenant.rentPaid ? 'warning' : 'success'}
                      onClick={() => handleApproveRentPayment(tenant._id, tenant.rentPaid ? 'approved' : 'unapproved')}
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
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Tenant Name</th>
          <th>Request Message</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(maintenanceRequests) && maintenanceRequests.length > 0 ? (
          maintenanceRequests.map((tenant) =>
            Array.isArray(tenant.maintenanceRequests) && tenant.maintenanceRequests.length > 0 ? (
              tenant.maintenanceRequests.map((request) => (
                <tr key={request._id}>
                  <td>{tenant.name}</td>
                  <td>{request.message}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === 'pending' && (
                      <Button
                        variant="success"
                        onClick={() => handleMarkRequestAsDone(tenant._id, request._id)}
                      >
                        Mark as Done
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No maintenance requests
                </td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No maintenance requests available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </Card.Body>
</Card>


      <Card className="mb-4">
        <Card.Header as="h5">Add/Update Apartments</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="apartmentNumber">
                  <Form.Label>Apartment Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={apartmentDetails.number}
                    onChange={handleApartmentChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="apartmentDetails">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="details"
                    value={apartmentDetails.details}
                    onChange={handleApartmentChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <Button variant="primary" onClick={handleAddApartment}>
                  Add Apartment
                </Button>
              </Col>
            </Row>
          </Form>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Number</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(apartments) && apartments.map((apartment) => (
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

      <Card>
        <Card.Header as="h5">Assign Apartment</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="selectTenant">
                  <Form.Label>Select Tenant</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedTenant}
                    onChange={(e) => setSelectedTenant(e.target.value)}
                  >
                    <option value="">Select Tenant</option>
                    {Array.isArray(tenants) && tenants.map((tenant) => (
                      <option key={tenant._id} value={tenant._id}>
                        {tenant.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="selectApartment">
                  <Form.Label>Select Apartment</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedApartment}
                    onChange={(e) => setSelectedApartment(e.target.value)}
                  >
                    <option value="">Select Apartment</option>
                    {Array.isArray(apartments) && apartments.map((apartment) => (
                      <option key={apartment._id} value={apartment._id}>
                        {apartment.number}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Button variant="primary" onClick={handleAssignApartment}>
                  Assign Apartment
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;







