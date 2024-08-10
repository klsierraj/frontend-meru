"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/state/useAuthStore';
import { getProductById, updateProduct } from '@/services/productsService';


export default function EditProduct() {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const router = useRouter();
  const { user } = useAuthStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadProduct();
    } else {
      router.push('/login');
    }
  }, [user, id]);

  const loadProduct = async () => {
    try {
      const product = await getProductById(id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    } catch (err) {
      console.error('Failed to load product:', err);
      setError('Failed to load product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProduct(id, { name, description, price: Number(price) });
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to update product');
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Descripción</label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Precio</label>
          <input
            type="number"
            id="price"
            className="w-full p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
