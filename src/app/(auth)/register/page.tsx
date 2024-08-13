import { redirect } from 'next/navigation';
import { AuthFormContent } from 'src/app/components/forms/authForm';
import { register } from '../../server/userActions';

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
    </form>
  );
}
