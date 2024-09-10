

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(express.json());




// // Define multiple allowed origins
// const allowedOrigins = [
//   'https://rentingapartment.vercel.app',
//   'https://apartment-renting.vercel.app/api/register',
//   'https://rentingapartment.vercel.app/api/login'
// ];

// // Configure CORS options
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       // Allow requests with no origin (like mobile apps or curl requests) or requests from allowed origins
//       callback(null, true);
//     } else {
//       // Disallow requests from other origins
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
// };

// // Use CORS middleware with options
// app.use(cors(corsOptions));




// const JWT_SECRET = 'o1qzmQE89p';

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://apartment-listing:apartment-listing@apartment-listing.rgcrw.mongodb.net/apartment-listing', {
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
//   apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' } // Add this line
// });

// const rentSchema = new mongoose.Schema({
//   rentAmount: Number,
// });

// const apartmentSchema = new mongoose.Schema({
//     number: String,
//     details: String,
//   });
  
// const Apartment = mongoose.model('Apartment', apartmentSchema);
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
//     const { name, email, password } = req.body;
    
//     console.log('Register request body:', req.body); // Log the request body
  
//     if (!name || !email || !password) {
//       return res.status(400).send('Missing required fields');
//     }
  
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
  
//     try {
//       await user.save();
//       res.status(201).send('User registered successfully');
//     } catch (error) {
//       console.error('Error registering user:', error); // Log the error
//       res.status(400).send('Error registering user');
//     }
//   });
  

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

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Apartment Renting API');
// });

// // Serve frontend from the same domain
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// // Create Apartment
// app.post('/api/admin/apartment', authMiddleware, async (req, res) => {
//     if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    
//     const { number, details } = req.body;
//     const apartment = new Apartment({ number, details });
//     try {
//       await apartment.save();
//       res.send('Apartment created successfully');
//     } catch (error) {
//       res.status(400).send('Error creating apartment');
//     }
//   });
  
//   // Update Apartment
//   app.put('/api/admin/apartment/:id', authMiddleware, async (req, res) => {
//     if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    
//     const { id } = req.params;
//     const { number, details } = req.body;
//     try {
//       const apartment = await Apartment.findByIdAndUpdate(id, { number, details }, { new: true });
//       if (!apartment) return res.status(404).send('Apartment not found');
//       res.json(apartment);
//     } catch (error) {
//       res.status(400).send('Error updating apartment');
//     }
//   });
  
//   // Delete Apartment
//   app.delete('/api/admin/apartment/:id', authMiddleware, async (req, res) => {
//     if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    
//     const { id } = req.params;
//     try {
//       await Apartment.findByIdAndDelete(id);
//       res.send('Apartment deleted successfully');
//     } catch (error) {
//       res.status(400).send('Error deleting apartment');
//     }
//   });
  
//   // View Tenant Details
// app.get('/api/admin/tenant/:id', authMiddleware, async (req, res) => {
//     if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    
//     const { id } = req.params;
//     try {
//       const tenant = await User.findById(id);
//       if (!tenant) return res.status(404).send('Tenant not found');
//       res.json(tenant);
//     } catch (error) {
//       res.status(400).send('Error fetching tenant details');
//     }
//   });
  
//   // Approve/Unapprove Rent Payment
// app.put('/api/admin/rent-payment/:userId', authMiddleware, async (req, res) => {
//     if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    
//     const { userId } = req.params;
//     const { approved } = req.body; // 'approved' should be a boolean value
  
//     try {
//       await User.findByIdAndUpdate(userId, { rentPaid: approved });
//       res.send(`Rent payment ${approved ? 'approved' : 'unapproved'} successfully`);
//     } catch (error) {
//       res.status(400).send('Error updating rent payment status');
//     }
//   });
  
//   // Update User Profile
// app.put('/api/user/profile', authMiddleware, async (req, res) => {
//     const { name, email, password } = req.body;
//     const updates = { name, email };
  
//     if (password) {
//       updates.password = await bcrypt.hash(password, 10);
//     }
  
//     try {
//       const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
//       res.json(user);
//     } catch (error) {
//       res.status(400).send('Error updating profile');
//     }
//   });
  
//   // Delete User Profile
//   app.delete('/api/user/profile', authMiddleware, async (req, res) => {
//     try {
//       await User.findByIdAndDelete(req.user.id);
//       res.send('Profile deleted successfully');
//     } catch (error) {
//       res.status(400).send('Error deleting profile');
//     }
//   });

//   app.get('/api/tenant/apartment', authMiddleware, async (req, res) => {
//     const tenant = await User.findById(req.user.id).populate('apartment');
//     if (!tenant) return res.status(404).send('Tenant not found');
//     res.json(tenant.apartment);
//   });
  
//   app.get('/api/admin/tenant/:id', authMiddleware, async (req, res) => {
//     if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  
//     const { id } = req.params;
//     try {
//       const tenant = await User.findById(id).populate('apartment');
//       if (!tenant) return res.status(404).send('Tenant not found');
//       res.json(tenant);
//     } catch (error) {
//       res.status(400).send('Error fetching tenant details');
//     }
//   });
  
//   // Assign Apartment to Tenant
// app.put('/api/admin/assign-apartment/:tenantId', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Access denied');

//   const { tenantId } = req.params;
//   const { apartmentId } = req.body;

//   try {
//     const tenant = await User.findById(tenantId);
//     if (!tenant) return res.status(404).send('Tenant not found');

//     tenant.apartment = apartmentId;
//     await tenant.save();

//     const apartment = await Apartment.findById(apartmentId);
//     if (!apartment) return res.status(404).send('Apartment not found');

//     res.json({ tenant, apartment });
//   } catch (error) {
//     res.status(400).send('Error assigning apartment');
//   }
// });





// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));















const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());

// Define multiple allowed origins
const allowedOrigins = [
   'https://rentingapartment.vercel.app',
   'http://localhost:5173',
  'https://rentingapartment.vercel.app/register',
  'https://rentingapartment.vercel.app/login'
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

// Use CORS middleware with options
app.use(cors(corsOptions));

const JWT_SECRET = 'o1qzmQE89p';

// Connect to MongoDB
mongoose.connect('mongodb+srv://apartment-listing:apartment-listing@apartment-listing.rgcrw.mongodb.net/apartment-listing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Schemas and Models
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'tenant' },
  rentPaid: { type: Boolean, default: false },
  maintenanceRequests: [{ message: String, status: { type: String, default: 'pending' } }],
  apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' } // Reference to the apartment
});

const rentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' },
  rentAmount: Number,
  status: { type: String, enum: ['pending', 'approved', 'unapproved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const apartmentSchema = new mongoose.Schema({
  number: String,
  details: String,
});

const Apartment = mongoose.model('Apartment', apartmentSchema);
const User = mongoose.model('User', userSchema);
const Rent = mongoose.model('Rent', rentSchema);

// Middleware for user authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = user;
    next();
  });
};

// Hardcoded admin credentials
const adminEmail = 'admin@apartment.com';
const adminPassword = 'admin123'; // You can hash this password for security if needed

// Register Tenant
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Missing required fields');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Login Tenant/Admin
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET);
    return res.status(200).json({ token, role: 'admin' });
  }

  const user = await User.findOne({ email }).populate('apartmentId');
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.status(200).json({ token, role: user.role, apartmentId: user.apartmentId });
});

// View Profile
app.get('/api/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).populate('apartmentId');
  res.json(user);
});

// Update Profile
app.put('/api/profile', authMiddleware, async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
  res.json(user);
});

// Tenant submits rent payment
app.post('/api/pay-rent', authMiddleware, async (req, res) => {
  const { rentAmount } = req.body;

  if (!rentAmount || rentAmount <= 0) {
    return res.status(400).send('Invalid rent amount');
  }

  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).send('User not found');

  const rentPayment = new Rent({
    tenantId: user._id,
    apartmentId: user.apartmentId,
    rentAmount: rentAmount,
  });

  await rentPayment.save();
  res.send('Rent payment submitted successfully and is pending approval');
});

// Send Maintenance Request
app.post('/api/maintenance', authMiddleware, async (req, res) => {
  const { message } = req.body;
  const user = await User.findById(req.user.id);
  user.maintenanceRequests.push({ message });
  await user.save();
  res.send('Maintenance request sent');
});

// Admin Routes
app.get('/api/admin/tenants', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  const tenants = await User.find({ role: 'tenant' });
  res.json(tenants);
});

// Admin approves or unapproves rent payment
app.put('/api/admin/manage-rent/:rentId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');

  const { rentId } = req.params;
  const { status } = req.body;

  if (!['approved', 'unapproved'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  const rent = await Rent.findById(rentId);
  if (!rent) return res.status(404).send('Rent payment not found');

  rent.status = status;
  await rent.save();

  res.send(`Rent payment has been ${status}`);
});

// // Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Apartment Renting API');
});

// Admin views all rent payments
app.get('/api/admin/rent-payments', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');

  const { status } = req.query; // Optional query parameter to filter by status
  const filter = status ? { status } : {};

  const rentPayments = await Rent.find(filter).populate('tenantId apartmentId');
  res.json(rentPayments);
});

// Admin deletes rent payment
app.delete('/api/admin/delete-rent/:rentId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');

  const { rentId } = req.params;
  
  try {
    const rent = await Rent.findByIdAndDelete(rentId);
    if (!rent) return res.status(404).send('Rent payment not found');
    
    res.send('Rent payment deleted successfully');
  } catch (error) {
    res.status(400).send('Error deleting rent payment');
  }
});

// Create/Update/Delete Rent Amount
app.post('/api/admin/rent', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  const { rentAmount } = req.body;
  const rent = await Rent.findOne();
  if (rent) {
    rent.rentAmount = rentAmount;
    await rent.save();
    res.send('Rent updated');
  } else {
    const newRent = new Rent({ rentAmount });
    await newRent.save();
    res.send('Rent created');
  }
});

// Create Apartment
app.post('/api/admin/apartment', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');

  const { number, details } = req.body;
  const apartment = new Apartment({ number, details });
  try {
    await apartment.save();
    res.send('Apartment created successfully');
  } catch (error) {
    res.status(400).send('Error creating apartment');
  }
});

// View Apartments
app.get('/api/admin/apartments', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');

  const apartments = await Apartment.find();
  res.json(apartments);
});

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

