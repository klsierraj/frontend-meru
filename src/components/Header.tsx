"use client"; // Este también debe ser un Client Component

import { useAuthStore } from '@/state/useAuthStore';
import Link from 'next/link';


export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-lg font-semibold">
          Productos
        </Link>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <p className="mr-4">Hola {user.username}</p>
            <Link href="/dashboard" className="mr-4">
              Gestiona tus productos
            </Link>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link href="/login" className="text-lg font-semibold">
            Gestiona tus productos
          </Link>
        )}
      </div>
    </header>
  );
}
