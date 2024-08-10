"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/services/authService';
import { useAuthStore } from '@/state/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirigir al dashboard si ya está autenticado
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { token } = await loginUser(email, password);
      const username = email.split('@')[0];
      login({ username, token });
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed: Invalid credentials');
    }
  };

  // No mostrar el formulario si el usuario ya está autenticado
  if (user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
      <div className="mt-4">
        <p className='text-white'>¿No te has registrado? <Link href="/register" className="text-blue-500 hover:underline">Regístrate</Link></p>
      </div>
    </div>
  );
}
