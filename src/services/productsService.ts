import { useAuthStore } from "@/state/useAuthStore";


export async function getProducts() {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
  
  export async function getProductsByClient(): Promise<[]> {
    const token = useAuthStore.getState().user?.token;
  
    if (!token) {
      throw new Error('User is not authenticated');
    }
  
    const response = await fetch('http://localhost:3000/my_products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user products');
    }
  
    return response.json();
  }

  export async function getProductById(id: string) {
    const { user } = useAuthStore.getState();
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
  
    return response.json();
  }

  
  export async function updateProduct(id: string, data: { name: string; description: string; price: number }) {
    const { user } = useAuthStore.getState();
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
  
    return response.json();
  }

  export async function destroyProduct(id: number) {
    const { user } = useAuthStore.getState();
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  
    return response.ok;
  }
  export async function createProduct(data: { name: string; description: string; price: number }) {
    const { user } = useAuthStore.getState();
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: data }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
  
    return response.json();
  }
  