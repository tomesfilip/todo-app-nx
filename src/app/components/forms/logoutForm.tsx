import { logout } from '@/server/userActions';
import { StyledSubmitButton } from '../ui/submitButton.styled';

export const LogoutForm = () => {
  return (
    <form action={logout}>
      <StyledSubmitButton>Log out</StyledSubmitButton>
    </form>
  );
};
