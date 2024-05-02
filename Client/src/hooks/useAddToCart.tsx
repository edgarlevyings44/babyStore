import { useState } from 'react';

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

const useAddToCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setCartCount(cartCount + 1);
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    setCartCount(updatedCartItems.length);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return { cartItems, cartCount, addToCart, removeFromCart, clearCart };
};

export default useAddToCart;