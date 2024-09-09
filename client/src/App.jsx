import { Routes, Route} from "react-router-dom"
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TenantDashboard from './components/TenantDashboard';
import Register from './components/Register';
import NavigationBar from './components/Navbar';
import Home from './components/Home';
import Footer from "./components/Footer"

function App() {
  return (
    <>
     <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
