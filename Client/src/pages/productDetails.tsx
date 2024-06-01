import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productsDetailsUrl } from '../Components/urls';
import MainLayout from '../layout/mainlayout';
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

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useAddToCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${productsDetailsUrl}/${id}`);
        setProduct(response.data);
        console.log(typeof(response.data));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

  }, [id]);


  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout cartItems={[]} cartCount={0}>
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">${product.price}</p>
            {/* <p className="text-gray-600">Quantity: {product.quantity}</p> */}
          </div>
          {/* <p className="text-gray-600 mt-2">Category: {product.category}</p> */}
          <button
              onClick={handleAddToCart}
              className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300 active:scale-95"
            >
              Add to Cart
            </button>
        </div>
      </div>

    </div>

    </MainLayout>
  );
}

export default ProductDetails;