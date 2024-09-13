// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(express.json());
// app.use(cors());

// const JWT_SECRET = 'o1qzmQE89p';

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://hoz:hoz@hoz.aebl5jo.mongodb.net/hoz', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('MongoDB connected successfully');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });


// // Schemas and Models
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: 'tenant' },
//   rentPaid: { type: Boolean, default: false },
//   maintenanceRequests: [{ message: String, status: { type: String, default: 'pending' } }],
// });

// const rentSchema = new mongoose.Schema({
//   rentAmount: Number,
// });

// const User = mongoose.model('User', userSchema);
// const Rent = mongoose.model('Rent', rentSchema);

// // Middleware for user authentication
// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).send('Access denied');
  
//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(401).send('Invalid token');
//     req.user = user;
//     next();
//   });
// };

// // Hardcoded admin credentials
// const adminEmail = 'admin@apartment.com';
// const adminPassword = 'admin123'; // You can hash this password for security if needed

// // Register Tenant
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, password: hashedPassword });
  
//   try {
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(400).send('Error registering user');
//   }
// });

// // Login Tenant/Admin
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   if (email === adminEmail && password === adminPassword) {
//     const token = jwt.sign({ role: 'admin' }, JWT_SECRET);
//     return res.status(200).json({ token, role: 'admin' });
//   }

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).send('User not found');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).send('Invalid credentials');

//   const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
//   res.status(200).json({ token, role: user.role });
// });

// // View Profile
// app.get('/api/profile', authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id);
//   res.json(user);
// });

// // Update Profile
// app.put('/api/profile', authMiddleware, async (req, res) => {
//   const { name, email } = req.body;
//   const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
//   res.json(user);
// });

// // Make Dummy Rent Payment
// app.post('/api/pay-rent', authMiddleware, async (req, res) => {
//   await User.findByIdAndUpdate(req.user.id, { rentPaid: true });
//   res.send('Rent paid successfully');
// });

// // Send Maintenance Request
// app.post('/api/maintenance', authMiddleware, async (req, res) => {
//   const { message } = req.body;
//   const user = await User.findById(req.user.id);
//   user.maintenanceRequests.push({ message });
//   await user.save();
//   res.send('Maintenance request sent');
// });

// // Admin Dashboard
// // View All Tenants
// app.get('/api/admin/tenants', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const tenants = await User.find({ role: 'tenant' });
//   res.json(tenants);
// });

// // Create/Update/Delete Rent Amount
// app.post('/api/admin/rent', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const { rentAmount } = req.body;
//   const rent = await Rent.findOne();
//   if (rent) {
//     rent.rentAmount = rentAmount;
//     await rent.save();
//     res.send('Rent updated');
//   } else {
//     const newRent = new Rent({ rentAmount });
//     await newRent.save();
//     res.send('Rent created');
//   }
// });

// // View Maintenance Requests
// app.get('/api/admin/maintenance', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const tenants = await User.find({ role: 'tenant' });
//   const requests = tenants.map((tenant) => ({
//     tenantName: tenant.name,
//     requests: tenant.maintenanceRequests,
//   }));
//   res.json(requests);
// });

// // Mark Maintenance Request as Done
// app.put('/api/admin/maintenance/:userId/:requestId', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const { userId, requestId } = req.params;
//   const user = await User.findById(userId);
//   const request = user.maintenanceRequests.id(requestId);
//   request.status = 'done';
//   await user.save();
//   res.send('Maintenance request marked as done');
// });

// // Serve frontend from the same domain
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(express.json());

// // Configure CORS to allow requests from your frontend domain
// const corsOptions = {
//   origin: 'https://www.yourdomain.com', // Replace with your frontend domain
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
// };
// app.use(cors(corsOptions));

// const JWT_SECRET = 'o1qzmQE89p';

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://hoz:hoz@hoz.aebl5jo.mongodb.net/hoz', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('MongoDB connected successfully');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// // Schemas and Models
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: 'tenant' },
//   rentPaid: { type: Boolean, default: false },
//   maintenanceRequests: [{ message: String, status: { type: String, default: 'pending' } }],
// });

// const rentSchema = new mongoose.Schema({
//   rentAmount: Number,
// });

// const User = mongoose.model('User', userSchema);
// const Rent = mongoose.model('Rent', rentSchema);

// // Middleware for user authentication
// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).send('Access denied');
  
//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(401).send('Invalid token');
//     req.user = user;
//     next();
//   });
// };

// // Hardcoded admin credentials
// const adminEmail = 'admin@apartment.com';
// const adminPassword = 'admin123'; // You can hash this password for security if needed

// // Register Tenant
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, password: hashedPassword });
  
//   try {
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(400).send('Error registering user');
//   }
// });

// // Login Tenant/Admin
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   if (email === adminEmail && password === adminPassword) {
//     const token = jwt.sign({ role: 'admin' }, JWT_SECRET);
//     return res.status(200).json({ token, role: 'admin' });
//   }

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).send('User not found');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).send('Invalid credentials');

//   const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
//   res.status(200).json({ token, role: user.role });
// });

// // View Profile
// app.get('/api/profile', authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id);
//   res.json(user);
// });

// // Update Profile
// app.put('/api/profile', authMiddleware, async (req, res) => {
//   const { name, email } = req.body;
//   const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
//   res.json(user);
// });

// // Make Dummy Rent Payment
// app.post('/api/pay-rent', authMiddleware, async (req, res) => {
//   await User.findByIdAndUpdate(req.user.id, { rentPaid: true });
//   res.send('Rent paid successfully');
// });

// // Send Maintenance Request
// app.post('/api/maintenance', authMiddleware, async (req, res) => {
//   const { message } = req.body;
//   const user = await User.findById(req.user.id);
//   user.maintenanceRequests.push({ message });
//   await user.save();
//   res.send('Maintenance request sent');
// });

// // Admin Dashboard
// // View All Tenants
// app.get('/api/admin/tenants', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const tenants = await User.find({ role: 'tenant' });
//   res.json(tenants);
// });

// // Create/Update/Delete Rent Amount
// app.post('/api/admin/rent', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const { rentAmount } = req.body;
//   const rent = await Rent.findOne();
//   if (rent) {
//     rent.rentAmount = rentAmount;
//     await rent.save();
//     res.send('Rent updated');
//   } else {
//     const newRent = new Rent({ rentAmount });
//     await newRent.save();
//     res.send('Rent created');
//   }
// });

// // View Maintenance Requests
// app.get('/api/admin/maintenance', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const tenants = await User.find({ role: 'tenant' });
//   const requests = tenants.map((tenant) => ({
//     tenantName: tenant.name,
//     requests: tenant.maintenanceRequests,
//   }));
//   res.json(requests);
// });

// // Mark Maintenance Request as Done
// app.put('/api/admin/maintenance/:userId/:requestId', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');
//   const { userId, requestId } = req.params;
//   const user = await User.findById(userId);
//   const request = user.maintenanceRequests.id(requestId);
//   request.status = 'done';
//   await user.save();
//   res.send('Maintenance request marked as done');
// });

// // Serve frontend from the same domain
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
