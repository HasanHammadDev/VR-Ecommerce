import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { getUserCart, updateCartItemQuantity } from "../../Utility/api";
import { CartOrderItem } from "../../../types/types";

const Cart: React.FC = () => {
    const [userCart, setUserCart] = useState<CartOrderItem[]>([]);

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await getUserCart();
                setUserCart(response.order_items);
                console.log(response.order_items)
            } catch (error) {
                console.error('There was an error retrieving the cart', error);
            }
        };
        getCart();
    }, []);

    const handleQuantityChange = async (orderId: number, productId: number, newQuantity: number) => {
        try {
            // Update cart item quantity via API
            await updateCartItemQuantity(orderId, productId, newQuantity);
            setUserCart(prevCart =>
                prevCart.map(item =>
                    item.order_id === orderId && item.products_information.product_id === productId
                        ? {
                            ...item,
                            quantity: newQuantity
                        }
                        : item
                )
            );
        } catch (error) {
            console.error('There was an error updating the cart item quantity', error);
        }
    };

    const handleIncrement = (orderId: number, productId: number, currentQuantity: number) => {
        handleQuantityChange(orderId, productId, currentQuantity + 1);
    };

    const handleDecrement = (orderId: number, productId: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            handleQuantityChange(orderId, productId, currentQuantity - 1);
        }
    };

    return (
        <>
            <Header />
            {userCart.length === 0 ? (
                <h1 className="text-2xl font-bold text-center text-gray-700 mt-10">Your Cart is Empty</h1>
            ) : (
                <div className="cart-container max-w-6xl mx-auto p-4 flex">
                    {/* Cart Items */}
                    <div className="w-3/4 pr-4">
                        {/* Header Row */}
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                            <p className="font-bold text-lg text-gray-600">Item</p>
                            <p className="font-bold text-lg text-gray-600">Price</p>
                        </div>
    
                        {userCart.map((orderItem) => (
                            <div className="flex items-center border-b border-gray-200 p-4 mb-4" key={orderItem.products_information.product_id}>
                                <img
                                    className="w-40 h-40 object-cover rounded-lg shadow-md"
                                    src={orderItem.products_information.image_url}
                                    alt={orderItem.products_information.product_name}
                                />
                                <div className="flex flex-col justify-between ml-6 flex-grow">
                                    <div>
                                        <h1 className="text-xl font-semibold text-gray-800">
                                            {orderItem.products_information.product_name}
                                        </h1>
                                        <div className="mt-4">
                                            <p className="text-gray-500">Quantity:</p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded-l"
                                                    onClick={() => handleDecrement(orderItem.order_id, orderItem.products_information.product_id, orderItem.quantity)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="border-t border-b border-gray-300 text-center w-16 focus:outline-none"
                                                    value={orderItem.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            orderItem.order_id,
                                                            orderItem.products_information.product_id,
                                                            parseInt(e.target.value, 10)
                                                        )
                                                    }
                                                />
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded-r"
                                                    onClick={() => handleIncrement(orderItem.order_id, orderItem.products_information.product_id, orderItem.quantity)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 mt-4">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Buy Now</button>
                                        <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-xl">Remove Item</button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end text-lg font-bold text-gray-700">
                                    {orderItem.products_information.sale_price ? (
                                        <>
                                            <p className="text-gray-500 line-through mr-2">${orderItem.products_information.price}</p>
                                            <p>${orderItem.products_information.sale_price}</p>
                                        </>
                                    ) : (
                                        <p>${orderItem.products_information.price}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
    
                    {/* Cart Summary Section */}
                    <div className="w-1/4 bg-white shadow-lg ml-10 p-6 rounded-lg sticky top-4 h-fit">
                        <h2 className="text-xl font-bold mb-4 text-center">Order Summary</h2>
    
                        {/* Subtotal */}
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-600">Subtotal</p>
                            <p>${userCart.reduce((total, orderItem) => 
                                total + (orderItem.quantity * (orderItem.products_information.sale_price || orderItem.products_information.price)), 
                                0
                            ).toFixed(2)}</p>
                        </div>
    
                        {/* Fixed shipping cost */}
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-600">Shipping</p>
                            <p>$10.00</p>
                        </div>
    
                        {/* Total */}
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <p>Total</p>
                            <p>${(userCart.reduce(
                                (total, orderItem) =>
                                    total + (orderItem.quantity * (orderItem.products_information.sale_price || orderItem.products_information.price)),
                                0
                            ) + 10.00).toFixed(2)}</p>
                        </div>
    
                        {/* Buy All Button */}
                        <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded w-full hover:bg-green-800 hover:shadow-lg transition duration-300">
                            Buy All
                        </button>
                    </div>
                </div>
            )}
        </>
    );    
};

export default Cart;