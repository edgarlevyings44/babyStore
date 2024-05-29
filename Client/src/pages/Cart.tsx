
import React from 'react';
import { Link } from 'react-router-dom';
import useAddToCart from '../hooks/useAddToCart';

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
  category: string;
  created_at: string | null;
  updated_at: string | null;
}

interface CartProps {
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const { removeFromCart, clearCart } = useAddToCart();

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotalPrice = () => {

    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };



  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ width: '50%', textAlign: 'center' }}>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover mr-4" />
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    {/* <p>Quantity: {item.quantity}</p> */}
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-8">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <p className="text-lg font-bold">Total: ${calculateTotalPrice().toFixed(2)}</p>
            </div>
            <div className="flex justify-end mt-4">
              <Link
                to="/checkout"
                className="bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-800 transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;