import { toast } from 'sonner';
import { AuthFormContent } from 'src/app/components/forms/authForm';
import { register } from '../../server/userActions';

export default function Register() {
  return (
    <form
      action={async (formData) => {
        await register(formData);
        toast('Registration successfull. Now please login');
      }}
      style={{ display: 'grid', gap: '1rem' }}
    >
      <AuthFormContent buttonText="Register" />
    </form>
  );
}
