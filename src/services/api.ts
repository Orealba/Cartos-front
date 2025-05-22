const BASE_URL = 'http://localhost:8080';

export const apiClient = (token?: string) => {
  const callApi = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (options.method === 'DELETE') {
        if (response.ok) {
          return null;
        }
        throw new Error('Error al eliminar');
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get: (endpoint: string) => callApi(endpoint),
    post: (endpoint: string, data: any) => {
      return callApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    put: (endpoint: string, data: any) =>
      callApi(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (endpoint: string) =>
      callApi(endpoint, {
        method: 'DELETE',
      }),
  };
};
