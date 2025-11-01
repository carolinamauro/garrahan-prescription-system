import { API_BASE_URL } from '.';

const idRolAdmin = '1';
const idRolMedico = '2';
const admin = 'admin';

export async function loginUser(role) {
  const currUser = {
    id: role === admin ? idRolAdmin : idRolMedico,
    name: role === admin ? 'Administrador' : 'Dr. Miguel Merentiel',
    role
  };

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(currUser)
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    return currUser;
  } catch (err) {
    console.error('Error in loginUser:', err);
    throw err;
  }
}
