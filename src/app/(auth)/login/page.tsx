import { redirect } from 'next/navigation';

import { AuthFormContent } from '@/components/forms/authFormContent';
import { login } from '@/server/userActions';
import Link from 'next/link';

export default function Login() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await login(formData);
        redirect('/');
      }}
      style={{ display: 'grid', gap: '1rem' }}
    >
      <AuthFormContent buttonText="Login" />
      <Link href="/register">No account? Register</Link>
    </form>
  );
}
