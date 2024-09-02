import React from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { ShoppingBag, Truck, Headset } from 'lucide-react';
import logo from '../../assets/images/logo.jpg';

const AboutUs: React.FC = () => {
    const productsRoute: string = '/products';

    const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="text-red-600 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    );

    return (
        <>
            <Header />
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">About <span className="text-red-600">VirtuShop</span></h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Enhancing online shopping with innovative digital experiences.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img className="h-48 w-full object-cover md:w-48" src={logo} alt="Online Shopping" />
                            </div>
                            <div className="p-8">
                                <div className="text-2xl font-semibold text-gray-900 mb-2">Our Vision</div>
                                <p className="mt-2 text-gray-600">
                                    At <Link to={productsRoute} className="font-semibold text-red-600 hover:underline">VirtuShop</Link>, we're working to bridge the gap between traditional e-commerce and emerging digital technologies. Our platform aims to offer an enhanced shopping experience with detailed product visualizations and information, helping you make informed decisions from the comfort of your home.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Feature 
                            icon={<ShoppingBag size={48} />}
                            title="Enhanced Product Visuals"
                            description="View detailed images and 360° photos of products where available."
                        />
                        <Feature 
                            icon={<Truck size={48} />}
                            title="Efficient Delivery"
                            description="We strive for quick and reliable delivery to your doorstep."
                        />
                        <Feature 
                            icon={<Headset size={48} />}
                            title="Customer Support"
                            description="Our team is here to assist you with your shopping needs."
                        />
                    </div>

                    <div className="bg-red-600 text-white rounded-xl shadow-lg p-8 mb-16">
                        <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
                        <p className="text-lg mb-6">
                            We're continuously improving our platform and expanding our product catalog to provide a better shopping experience. While we're not quite in the realm of full VR shopping yet, we're excited about the future possibilities of online retail.
                        </p>
                        <Link to={productsRoute} className="inline-block bg-white text-red-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
                            Explore VirtuShop
                        </Link>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Join us at <Link to={productsRoute} className="font-semibold text-red-600 hover:underline">VirtuShop</Link> as we work towards enhancing the online shopping experience, one step at a time.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;