import { Link } from "react-router-dom";
import Header from "../Header/Header";

const AboutUs: React.FC = () => {
    const productsRoute: string = '/products';

    return (
        <>
            <Header />
            <div className="bg-gray-100 p-8 rounded-lg shadow-md mx-32 border my-5">
                <h1 className="text-4xl font-bold text-center text-red-600 mb-4">About Us!</h1>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Welcome to <Link to={productsRoute} className="font-semibold text-blue-600 hover:underline">VirtuShop</Link>, where the future of shopping meets the immersive world of virtual reality. We’re passionate about revolutionizing the online shopping experience, allowing you to explore and interact with products in a fully immersive 3D environment, all from the comfort of your own home.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Our journey began with a bold vision: to bridge the gap between traditional e-commerce and the limitless possibilities of VR technology. With a team of dedicated tech enthusiasts and retail experts, we’ve crafted a platform that offers not just products, but experiences.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    At <Link to={productsRoute} className="font-semibold text-blue-600 hover:underline">VirtuShop</Link>, we believe shopping should be as engaging and interactive as it is convenient. Whether you’re browsing the latest tech gadgets, fashion trends, or home décor, our VR store lets you see every detail, try on items, and visualize products in your own space—all before making a purchase.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                    We’re continually expanding our product catalog and refining our technology to ensure that our customers have access to the best products in the most innovative way possible. Join us at <Link to={productsRoute} className="font-semibold text-blue-600 hover:underline">VirtuShop</Link> as we redefine the future of shopping, one virtual experience at a time.
                </p>
            </div>
        </>
    )

}

export default AboutUs;