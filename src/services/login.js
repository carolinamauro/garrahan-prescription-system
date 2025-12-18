import { apiClient } from './apiClient';

export const admin = 'admin';

export async function loginUser(role) {
  const dni = 19201241;
  const currUser = {
    id: 2,
    name: role === admin ? 'Administrador' : 'Profesional',
    role
  };

  try {
    await apiClient.post('/auth/login-test', currUser);
    const {data: profesional} = await apiClient.get(`/profesionales/externo/${dni}`);
    return {...currUser, profesional };
  } catch (err) {
    console.error('Error in loginUser:', err);
    throw err;
  }
}
