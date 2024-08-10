export async function loginUser(email: string, password: string) {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Enviar `email` y `password` como espera el backend
    });
  
    if (!response.ok) {
      throw new Error('Failed to login');
    }
  
    return response.json(); // Esto devolverá el token JWT
  }
  
  export async function registerUser(userName: string, email: string, password: string) {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name: userName, email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to register');
    }
  
    return response.json(); // Devuelve la respuesta JSON si es necesario
  }
  