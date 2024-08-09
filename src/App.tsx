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

const App: React.FC = () => {
  return (
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

  );
};

export default App
