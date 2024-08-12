import { AuthFormContent } from 'src/app/components/forms/authForm';
import { login } from '../../server/userActions';

export default function Login() {
  return (
    <form
      action={async (formData) => {
        await login(formData);
      }}
      style={{ display: 'grid', gap: '1rem' }}
    >
      <AuthFormContent buttonText="Login" />
    </form>
  );
}
