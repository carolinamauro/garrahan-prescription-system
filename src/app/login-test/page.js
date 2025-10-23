/* global fetch */
'use client';
import { useRouter } from 'next/navigation';
import { LinkButton } from '@/components/LinkButton';
import { User, Shield } from 'lucide-react';

export default function TestLogin() {
  const router = useRouter();

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

  return (
    <div className="flex gap-4 p-8">
      <div
        onClick={async (e) => {
          e.preventDefault();
          await login('admin');
          router.push('/');
        }}
      >
        <LinkButton href="#"
          btnText="Entrar como Admin"
          icon={Shield}
          variant="default" />
      </div>

      <div
        onClick={async (e) => {
          e.preventDefault();
          await login('medico');
          router.push('/');
        }}
      >
        <LinkButton href="#"
          btnText="Entrar como Médico"
          icon={User}
          variant="secondary" />
      </div>
    </div>
  );
}
