import { LoginForm } from '@/components/LoginForm';
import {NameAndLogo} from '@/components/LoginForm/NameAndLogo';

export default function LoginPage() {
  return (
    <div className="absolute inset-0 flex items-center
    justify-center bg-background rounded-xl p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col gap-6 items-center">
        <NameAndLogo />
        <LoginForm />
      </div>
    </div>
  );
}
