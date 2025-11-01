'use client';

import { useRouter } from 'next/navigation';
import { useLogin } from '@/contexts/LoginContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, User } from 'lucide-react';
import { AlertPopup } from '@/components/AlertPopup';

export function LoginForm() {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const { loginAs } = useLogin();

  const handleLogin = async (role) => {
    try {
      await loginAs(role);
      router.push('/');
    } catch (err) {
      console.error(err);
      setShowDialog(true);
    }
  };

  return (
    <>
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

      <AlertPopup
        title="Error al iniciar sesión"
        description="Por favor intente nuevamente."
        handleOnClick={() => {
          router.push('/login-test');
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
