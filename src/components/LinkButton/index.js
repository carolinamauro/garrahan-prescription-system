import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LinkButton({ href, disabled, btnText, icon: Icon, variant }) {
  return (
    <>
      {disabled ? (
        <Button disabled
          variant={variant}>
          <Icon className="mr-2 h-4 w-4" />
          {btnText}
        </Button>
      ) : (
        <Link href={href}>
          <Button variant={variant}>
            <Icon className="mr-2 h-4 w-4" />
            {btnText}
          </Button>
        </Link>)
      }
    </>
  );
}
