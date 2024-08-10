"use client";
import { useEffect } from 'react';

import ProductCard from './ProductCard';
import { getProducts } from '../services/productsService';
import useProductsStore from '@/state/useProductsStore';

export default function ProductsList() {
  const { products, setProducts } = useProductsStore();

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    loadProducts();
  }, [setProducts]);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
             id={product.id}
             name={product.name}
             description={product.description}
             price={product.price}
             showEdit={false}
          />
        </li>
      ))}
    </ul>
  );
}
