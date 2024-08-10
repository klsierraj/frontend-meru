import ProductsList from "@/components/ProductList";


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductsList />
    </div>
  );
}
