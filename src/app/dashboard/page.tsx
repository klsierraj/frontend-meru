"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProductsByClient, destroyProduct } from '../../services/productsService';
import ProductCard from '../../components/ProductCard';
import { useAuthStore } from '@/state/useAuthStore';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      loadProducts();
    }
  }, [user, router]);

  const loadProducts = async () => {
    try {
      const products = await getProductsByClient();
      setProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await destroyProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hola {user.username}</h1>
        <Link href="/create" className="text-blue-500 hover:underline">
          Crear Producto
        </Link>
      </div>
      <h2 className="text-xl font-semibold mb-4">Tus productos</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              showEdit={true} 
              onDelete={() => handleDelete(product.id)} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
