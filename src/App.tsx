import Home from './components/Pages/Home';
import Products from './components/Pages/Products';
import { Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/products" element={ <Products /> } />
    </Routes>
  );
};

export default App
