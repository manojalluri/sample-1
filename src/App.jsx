import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';
import AdminErrorBoundary from './components/admin/AdminErrorBoundary';
import AdminLoading from './components/admin/AdminLoading';
import OwnerProtectedRoute from './components/OwnerProtectedRoute';
import { ShopProvider } from './context/ShopContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const MyOrders = lazy(() => import('./pages/MyOrders'));

// Admin pages - with error handling
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Products = lazy(() => import('./pages/admin/Products'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Customers = lazy(() => import('./pages/admin/Customers'));
const Inventory = lazy(() => import('./pages/admin/Inventory'));
const Discounts = lazy(() => import('./pages/admin/Discounts'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Settings = lazy(() => import('./pages/admin/Settings'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? 'pt-0' : ''}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

// Owner-Only Route Wrapper with Error Boundary
const AdminRoute = ({ children }) => {
  return (
    <AdminErrorBoundary>
      <Suspense fallback={<AdminLoading message="Loading admin panel..." />}>
        <OwnerProtectedRoute>
          <AdminLayout>
            {children}
          </AdminLayout>
        </OwnerProtectedRoute>
      </Suspense>
    </AdminErrorBoundary>
  );
};

// Public Route Wrapper with Loading
const PublicRoute = ({ children }) => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
};

const App = () => {
  return (
    <Router>
      <ShopProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/menu" element={<PublicRoute><Menu /></PublicRoute>} />
            <Route path="/product/:id" element={<PublicRoute><ProductDetails /></PublicRoute>} />
            <Route path="/cart" element={<PublicRoute><Cart /></PublicRoute>} />
            <Route path="/checkout" element={<PublicRoute><Checkout /></PublicRoute>} />
            <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/orders" element={<PublicRoute><MyOrders /></PublicRoute>} />

            {/* Admin Login - No Layout */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<AdminLoading message="Loading login..." />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            {/* Admin Routes - With Layout & Error Boundary */}
            <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><Orders /></AdminRoute>} />
            <Route path="/admin/customers" element={<AdminRoute><Customers /></AdminRoute>} />
            <Route path="/admin/inventory" element={<AdminRoute><Inventory /></AdminRoute>} />
            <Route path="/admin/discounts" element={<AdminRoute><Discounts /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />

            {/* Fallback Routes */}
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ShopProvider>
    </Router>
  );
};

export default App;
