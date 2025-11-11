import { apiClient } from './apiClient';

const idRolAdmin = '1';
const idRolMedico = '2';
export const admin = 'admin';

export async function loginUser(role) {
  const currUser = {
    id: role === admin ? idRolAdmin : idRolMedico,
    name: role === admin ? 'Administrador' : 'Miguel Merentiel',
    role
  };

  try {
    await apiClient.post('/auth/login-test', currUser);
    return currUser;
  } catch (err) {
    console.error('Error in loginUser:', err);
    throw err;
  }
}
