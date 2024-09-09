import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const TenantProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/profile', { headers: { Authorization: token } });
        setProfileData(res.data);
      } catch (err) {
        setMessage('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/profile', profileData, { headers: { Authorization: token } });
      setMessage('Profile updated');
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  const handleRentPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/pay-rent', {}, { headers: { Authorization: token } });
      setMessage('Rent paid successfully');
    } catch (err) {
      setMessage('Error processing rent payment');
    }
  };

  const handleMaintenanceRequest = async () => {
    const request = prompt('Enter maintenance request:');
    if (!request) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/maintenance', { message: request }, { headers: { Authorization: token } });
      setMessage('Maintenance request sent');
    } catch (err) {
      setMessage('Error sending maintenance request');
    }
  };

  return (
    <Container>
      <h2>Profile</h2>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
        </Form.Group>
        <Button onClick={handleUpdate}>Update Profile</Button>
      </Form>
      <Button onClick={handleRentPayment} className="mt-3">Pay Rent</Button>
      <Button onClick={handleMaintenanceRequest} className="mt-3">Send Maintenance Request</Button>
      {message && <p>{message}</p>}
    </Container>
  );
};

export default TenantProfile;
