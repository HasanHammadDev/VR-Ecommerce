import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import cart from '../../assets/images/cart-icon.png';
const Header: React.FC = () => {
    const homeRoute: string = '/';
    const productsRoute: string = '/products';

    return (
        <div className="flex items-center justify-around bg-slate-700 h-20">
            <Link to={homeRoute}><img src={logo} className='h-16 rounded-full' alt="logo" /></Link>
            {/* <h1 className='font-bold m-2 text-3xl text-white'>E-commerce</h1> */}
            <div className='flex items-center justify-around w-68'>
                <button className='text-white m-1 hover:bg-gray-400 font-semibold py-2 px-4 rounded'>Home</button>
                <Link to={productsRoute}>                <button className='text-white m-1 hover:bg-gray-400 font-semibold py-2 px-4 rounded'>Products</button></Link>
                <button className='text-white m-1 hover:bg-gray-400 font-semibold py-2 px-5 rounded'>About us</button>
            </div>

            <div className='relative hover:bg-gray-400 py-2 px-2 rounded cursor-pointer'>
                <p className='absolute bottom-6 right-5 text-white w-6 h-6 flex items-center justify-center rounded-full text-l font-semibold'>0</p>
                <img src={cart} className='w-14' alt='cart-icon' />
            </div>
        </div>
    );
};

export default Header;