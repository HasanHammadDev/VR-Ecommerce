import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { getUserCart, removeItemFromOrder, updateCartItemQuantity } from "../../Utility/api";
import { CartOrderItem } from "../../../types/types";
import { ClipLoader } from "react-spinners";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
    const [userCart, setUserCart] = useState<CartOrderItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { decrementItem } = useCart()
    const paymentRoute = '/payment';

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getUserCart();
            setUserCart(response.order_items);
        } catch (error) {
            setError('Failed to retrieve cart. Please try again.');
            console.error('There was an error retrieving the cart', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleQuantityChange = useCallback(async (orderId: number, productId: number, newQuantity: number) => {
        try {
            await updateCartItemQuantity(orderId, productId, newQuantity);
            setUserCart(prevCart =>
                prevCart.map(item =>
                    item.order_id === orderId && item.products_information.product_id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.error('There was an error updating the cart item quantity', error);
            setError('Failed to update quantity. Please try again.');
        }
    }, []);

    const removeItem = useCallback(async (productId: number) => {
        try {
            const response = await removeItemFromOrder(productId);
            if (response.success) {
                setUserCart(prevCart => prevCart.filter(item => item.products_information.product_id !== productId));
                decrementItem()
            } else {
                setError('Failed to remove item. Please try again.');
            }
        } catch (error) {
            console.error('There was an error removing the item from your cart', error);
            setError('Failed to remove item. Please try again.');
        }
    }, []);

    const calculateTotal = useCallback(() => {
        return userCart.reduce(
            (total, item) => total + item.quantity * (item.products_information.sale_price || item.products_information.price),
            0
        );
    }, [userCart]);

    if (isLoading) {
        return (
            <div className='h-96 flex justify-center items-center'>
                <ClipLoader color="#000" loading={isLoading} size={50} />
            </div>
        );
    }

    if (error) return (
        <div className='h-96 flex justify-center items-center'>
            <div>Error: {error}</div>
        </div>
    );


return (
    <>
        <Header />
        {userCart.length === 0 ? (
            <h1 className="text-2xl font-bold text-center text-gray-700 mt-10">Your Cart is Empty</h1>
        ) : (
            <div className="cart-container max-w-6xl mx-auto p-4 flex">
                <CartItems
                    userCart={userCart}
                    handleQuantityChange={handleQuantityChange}
                    removeItem={removeItem}
                    paymentRoute={paymentRoute}
                />
                <CartSummary
                    total={calculateTotal()}
                    paymentRoute={paymentRoute}
                />
            </div>
        )}
    </>
);
};

interface CartItemsProps {
    userCart: CartOrderItem[];
    handleQuantityChange: (orderId: number, productId: number, newQuantity: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    paymentRoute: string;
}

const CartItems: React.FC<CartItemsProps> = ({ userCart, handleQuantityChange, removeItem, paymentRoute }) => (
    <div className="w-3/4 pr-4">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
            <p className="font-bold text-lg text-gray-600">Item</p>
            <p className="font-bold text-lg text-gray-600">Price</p>
        </div>
        {userCart.map((orderItem) => (
            <CartItem
                key={orderItem.products_information.product_id}
                orderItem={orderItem}
                handleQuantityChange={handleQuantityChange}
                removeItem={removeItem}
                paymentRoute={paymentRoute}
            />
        ))}
    </div>
);

interface CartItemProps {
    orderItem: CartOrderItem;
    handleQuantityChange: (orderId: number, productId: number, newQuantity: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    paymentRoute: string;
}

const CartItem: React.FC<CartItemProps> = ({ orderItem, handleQuantityChange, removeItem, paymentRoute }) => {
    const { order_id, products_information, quantity } = orderItem;
    const { product_id, product_name, image_url, price, sale_price } = products_information;

    return (
        <div className="flex items-center border-b border-gray-200 p-4 mb-4">
            <img
                className="w-40 h-40 object-cover rounded-lg shadow-md"
                src={image_url}
                alt={product_name}
            />
            <div className="flex flex-col justify-between ml-6 flex-grow">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">{product_name}</h1>
                    <div className="mt-4">
                        <p className="text-gray-500">Quantity:</p>
                        <div className="flex items-center mt-2">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-3 py-0.5 rounded mx-1"
                                onClick={() => quantity === 1 ? removeItem(product_id) : handleQuantityChange(order_id, product_id, quantity - 1)}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                className="border border-gray-300 text-center w-16 focus:outline-none rounded"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(order_id, product_id, parseInt(e.target.value, 10))}
                            />
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2.5 py-0.5 rounded mx-1"
                                onClick={() => handleQuantityChange(order_id, product_id, quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <Link to={`${paymentRoute}/${product_id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Buy Now</button>
                    </Link>
                    <button onClick={() => removeItem(product_id)} className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-xl">Remove Item</button>
                </div>
            </div>
            <div className="flex items-center justify-end text-lg font-bold text-gray-700">
                {sale_price ? (
                    <>
                        <p className="text-gray-500 line-through mr-2">${price}</p>
                        <p>${sale_price}</p>
                    </>
                ) : (
                    <p>${price}</p>
                )}
            </div>
        </div>
    );
};

interface CartSummaryProps {
    total: number;
    paymentRoute: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, paymentRoute }) => (
    <div className="w-1/4 bg-white shadow-lg ml-10 p-6 rounded-lg sticky top-4 h-fit">
        <h2 className="text-xl font-bold mb-4 text-center">Order Summary</h2>
        <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p>${total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
            <p className="text-gray-600">Shipping</p>
            <p>$10.00</p>
        </div>
        <div className="flex justify-between font-bold text-lg mb-4">
            <p>Total</p>
            <p>${(total + 10).toFixed(2)}</p>
        </div>
        <Link to={`${paymentRoute}/buyall`}>
            <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded w-full hover:bg-green-800 hover:shadow-lg transition duration-300">
                Buy All
            </button>
        </Link>
    </div>
);

export default Cart;