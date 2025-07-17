const BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
    // —————— Recurrent transactions ——————
    // GET one recurring by its ID
    getRecurring: (id: string) => callApi(`/api/recurring-transactions/${id}`),
    // GET all recurrings for the user
    listRecurring: () => callApi(`/api/recurring-transactions`),
    // POST a new recurring
    createRecurring: (data: any) =>
      callApi(`/api/recurring-transactions`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    // PUT (update) an existing recurring
    updateRecurring: (id: string, data: any) =>
      callApi(`/api/recurring-transactions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    // DELETE a recurring
    deleteRecurring: (id: string) =>
      callApi(`/api/recurring-transactions/${id}`, {
        method: 'DELETE',
      }),
  };
};
