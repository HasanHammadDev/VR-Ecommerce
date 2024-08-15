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

const App: React.FC = () => {
  const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID as string;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>


  );
};

export default App
