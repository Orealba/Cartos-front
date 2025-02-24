const BASE_URL = 'https://backend.cartos-app.com';

export const apiClient = (token?: string) => {
  const callApi = async (endpoint: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('Error en la llamada a la API');
    }

    return response.json();
  };

  return {
    get: (endpoint: string) => callApi(endpoint),
    post: (endpoint: string, data: any) =>
      callApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
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
