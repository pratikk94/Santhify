import { jwtDecode } from 'jwt-decode';

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    window.location.href = '/login'; // Redirect to login if token is missing
    return;
  }

  try {
    // Check token expiration
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      throw new Error('Token expired');
    }

    // Include the token in the headers
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // Token invalid or expired
      throw new Error('Unauthorized');
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Auth fetch error:', error.message);
    } else {
      console.error('Auth fetch error:', error);
    }
    localStorage.removeItem('authToken'); // Clear the token
    window.location.href = '/login'; // Redirect to login
  }
};