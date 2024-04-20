import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsUrl } from './urls';

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

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(productsUrl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
          >
            <div className="relative h-64">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">${product.price}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>
              <p className="text-gray-600 mt-2">Category: {product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;