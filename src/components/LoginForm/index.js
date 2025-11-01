'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, User } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();

  // TODO: Mover a LoginContext
  const login = async (role) => {
    await fetch('http://localhost:3000/auth/login-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        id: role === 'admin' ? '1' : '2',
        name: role === 'admin' ? 'Admin' : 'Dr. Juan',
        role
      })
    });
  };

  const handleLogin = async (role) => {
    await login(role);
    router.push('/');
  };

  return (
    <Card className='flex flex-col gap-6 min-w-xs'>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Bienvenido</CardTitle>
        <CardDescription>
                          Selecciona tu rol para iniciar sesión
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          variant="default"
          className="flex items-center justify-center gap-2"
          onClick={() => handleLogin('admin')}
        >
          <Shield className="w-4 h-4" />
                          Entrar como Admin
        </Button>
        <Button
          variant="secondary"
          className="flex items-center justify-center gap-2"
          onClick={() => handleLogin('medico')}
        >
          <User className="w-4 h-4" />
                          Entrar como Médico
        </Button>
      </CardContent>
    </Card>
  );
}
