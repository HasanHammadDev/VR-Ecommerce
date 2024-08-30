import Home from './components/Pages/Home';
import Products from './components/Pages/Products';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext';
import Cart from './components/Pages/Cart';
import ProductDetails from './components/Pages/ProductDetails';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import { AuthProvider } from './components/context/AuthContext';
import Profile from './components/Pages/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AboutUs from './components/Pages/AbousUs';
import Reviews from './components/Pages/Reviews';
import ProtectedRoute from './components/ProtectedRoute';
import Payment from './components/Pages/Payment';

const App: React.FC = () => {
  const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID as string;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/reviews/:productId" element={<Reviews />} />
              <Route path="/payment/:cartId" element={<Payment />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App
