import { apiClient } from './api';

export async function crearCategoriasOnboarding(
  token: string,
  payload: {
    firstName: string;
    lastName: string;
    language: string;
    picture: string;
    linkedAccount: string;
  },
) {
  const api = apiClient(token);
  const response = await api.post('/api/users/onboarding', payload);
  return response;
}
