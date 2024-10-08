import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import cart from '../../assets/images/cart-icon.png';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { logoutAccount } from "../../Utility/api";

const Header: React.FC = () => {
    const homeRoute: string = '/';
    const productsRoute: string = '/products';
    const loginRoute: string = '/login';
    const cartRoute: string = '/cart';
    const profileRoute: string = '/profile';
    const aboutUsRoute: string = '/aboutus';
    const { itemCount, setItemCount } = useCart();
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await logoutAccount();
            if (response.success) {
                setIsLoggedIn(false);
                setItemCount(0)
            } else {
                console.error("Logout failed:", response.message || "Unknown error");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    return (
        <div className="flex items-center justify-around bg-slate-700 h-20">
            <Link to={homeRoute}>
            <div className="flex items-center">
                <img src={logo} className='h-16 rounded-full' alt="logo" />
                <h1 className='font-bold m-2 text-3xl text-white'>VirtuShop</h1>
            </div>
            </Link>

            <div className='flex items-center justify-around w-68'>
                <Link to={homeRoute} className="m-1">
                    <button className='text-white hover:bg-gray-400 font-semibold py-2 px-4 rounded'>Home</button>
                </Link>

                <Link to={productsRoute} className="m-1">
                    <button className='text-white hover:bg-gray-400 font-semibold py-2 px-4 rounded'>Products</button>
                </Link>
                <Link to={aboutUsRoute} className="m-1">
                    <button className='text-white hover:bg-gray-400 font-semibold py-2 px-5 rounded'>About us</button>
                </Link>
            </div>

            <div className="flex items-center">
                <Link to={cartRoute}>
                    <div className='relative hover:bg-gray-400 py-2 px-2 rounded cursor-pointer'>
                        <p className='absolute bottom-6 right-5 text-white w-6 h-6 flex items-center justify-center rounded-full text-l font-semibold'>{itemCount}</p>
                        <img src={cart} className='w-14' alt='cart-icon' />
                    </div>
                </Link>

                {isLoggedIn ?
                    <>
                        <Link to={profileRoute} className="ml-10">
                            <button className="text-white hover:bg-gray-400 font-semibold px-3 py-2 rounded">My Profile</button>
                        </Link>
                        <button onClick={handleLogout} className="text-white hover:bg-gray-400 font-semibold py-2 px-4 rounded">Logout</button>
                    </>
                    :
                    <Link to={loginRoute}>
                        <button className="text-white ml-10 hover:bg-gray-400 font-semibold py-2 px-4 rounded">Login/Register</button>
                    </Link>}
            </div>

        </div>
    );
};

export default Header;