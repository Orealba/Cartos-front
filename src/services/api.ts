const BASE_URL = 'https://backend.cartos-app.com';

export const apiClient = (token?: string) => {
  const callApi = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      console.log('Request:', {
        url: `${BASE_URL}${endpoint}`,
        method: options.method || 'GET',
        headers,
        body: options.body,
      });

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error respuesta API:', {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        throw new Error(JSON.stringify(data));
      }

      return data;
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  };

  return {
    get: (endpoint: string) => callApi(endpoint),
    post: (endpoint: string, data: any) => {
      console.log('Datos a enviar:', data);
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
