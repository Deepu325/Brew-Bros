import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Customer pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ThankYou from './pages/ThankYou';
import BookTable from './pages/BookTable';
import { CartProvider } from './context/CartContext';

// Admin pages
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import MenuManagement from './admin/MenuManagement';
import OrderManagement from './admin/OrderManagement';
import KitchenView from './admin/KitchenView';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/admin/login" replace />;
}

function CustomerLayout() {
  return (
    <CartProvider>
      <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/book-table" element={<BookTable />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/menu" element={<ProtectedRoute><MenuManagement /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><OrderManagement /></ProtectedRoute>} />
          <Route path="/admin/kitchen" element={<ProtectedRoute><KitchenView /></ProtectedRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

          {/* Customer routes */}
          <Route path="/*" element={<CustomerLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
