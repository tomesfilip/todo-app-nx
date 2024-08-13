import { redirect } from 'next/navigation';
import { AuthFormContent } from 'src/app/components/forms/authForm';
import { login } from '../../server/userActions';

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
    </form>
  );
}
