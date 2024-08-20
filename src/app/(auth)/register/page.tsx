import { redirect } from 'next/navigation';

import { AuthFormContent } from '@/components/forms/authFormContent';
import { register } from '@/server/userActions';
import Link from 'next/link';

export default function Register() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await register(formData);
        redirect('/login');
      }}
      style={{ display: 'grid', gap: '1rem' }}
    >
      <AuthFormContent buttonText="Register" />
      <Link href="/login">Already a member? Log in</Link>
    </form>
  );
}
