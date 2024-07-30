import Home from './components/Pages/Home';
import Products from './components/Pages/Products';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/context';
import Cart from './components/Pages/Cart';
import ProductDetails from './components/Pages/ProductDetails';


const App: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/products" element={ <Products /> } />
        <Route path="/products/:id" element={ <ProductDetails /> } />
        <Route path="/cart" element={ <Cart /> } />
      </Routes>
    </CartProvider>
  );
};

export default App
