import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  showEdit?: boolean;
  onDelete?: () => void; 
}

export default function ProductCard({ id, name, description, price, showEdit = false, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-green-500 font-bold">${price}</p>
      {showEdit && (
        <div className="flex flex-col mt-4 space-y-2">
          <Link href={`/edit/${id}`} className="text-blue-500 hover:underline">
            Editar
          </Link>
          {onDelete && (
            <button onClick={onDelete} className="text-red-500 hover:underline">
              Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
