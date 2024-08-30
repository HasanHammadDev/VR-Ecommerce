import React, { useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, getUserCart } from "../../Utility/api";
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { CartOrderItem } from '../../../types/types';

const SHIPPING_COST = 10;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCart, setUserCart] = useState<CartOrderItem[]>([]);
  const { cartId } = useParams<{ cartId: string }>();

  const calculateItemPrice = (item: CartOrderItem): number => {
    const price = item.products_information.sale_price ?? Number(item.price);
    return price * item.quantity;
  };

  const getCart = useCallback(async () => {
    try {
      const response = await getUserCart();
      const fetchedCart = response.order_items || [];

      if (!cartId) {
        throw new Error('Invalid Cart');
      }

      let calculatedAmount = SHIPPING_COST;
      let selectedItems: CartOrderItem[];

      if (cartId === 'buyall') {
        selectedItems = fetchedCart;
        calculatedAmount += fetchedCart.reduce((sum, item) => sum + calculateItemPrice(item), 0);
      } else {
        const product = fetchedCart.find((item) => item.products_information.product_id === Number(cartId));
        if (!product) {
          throw new Error('Product not found');
        }
        selectedItems = [product];
        calculatedAmount += calculateItemPrice(product);
      }

      setUserCart(selectedItems);
      setAmount(calculatedAmount);
    } catch (error) {
      console.error('There was an error retrieving the cart', error);
      setError(error instanceof Error ? error.message : 'Failed to load cart');
    }
  }, [cartId]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || amount <= 0) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const amountInCents = Math.round(amount * 100); //Stripe accepts amount in cents
      const { clientSecret } = await createPaymentIntent(amountInCents);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || 'Payment failed');
      }

      setSuccess(true);
      elements.getElement(CardElement)?.clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const renderCartItems = () => (
    <ul className="divide-y divide-gray-200 mb-6">
      {userCart.map((item) => (
        <li key={item.products_information.product_id} className="py-4 flex justify-between items-center">
          <div>
            <span className="text-gray-700 font-bold">{item.products_information.product_name}</span>
            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
          </div>
          <span className="text-gray-900">{`$${calculateItemPrice(item).toFixed(2)}`}</span>
        </li>
      ))}
      <div className="pt-4">
        <span className="text-gray-700 font-bold">Shipping:</span>
        <span className="text-gray-900 float-right">{`$${SHIPPING_COST.toFixed(2)}`}</span>
      </div>
    </ul>
  );

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Receipt</h2>
          {renderCartItems()}
          <div className="mt-4 border-t pt-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold float-right">{`$${amount.toFixed(2)}`}</span>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Card Details</label>
              <CardElement className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!stripe || loading || amount <= 0}
            >
              {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
            </button>
            {success && <div className="text-green-600 mt-4">Payment Successful!</div>}
          </form>
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default App;