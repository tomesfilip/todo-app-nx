'use client';

import { login, register } from '@/server/userActions';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

import { StyledForm } from '../ui/form.styled';
import { StyledError } from '../ui/formError.styled';
import { LabelledInput } from '../ui/labelledInput';
import { StyledSubmitButton } from '../ui/submitButton.styled';
import { StyledWrapper } from '../ui/wrapper.styled';

type Props = { type: 'login' | 'register' };

export const AuthForm = ({ type }: Props) => {
  const formConfig = {
    login: {
      buttonText: 'Login',
      linkText: 'No account? Register',
      linkHref: '/register',
      action: login,
    },
    register: {
      buttonText: 'Register',
      linkText: 'Already a member? Log in',
      linkHref: '/login',
      action: register,
    },
  };

  const { buttonText, linkText, linkHref, action } = formConfig[type];

  const [error, formAction] = useFormState(action, null);

  const { pending } = useFormStatus();

  return (
    <StyledWrapper>
      <StyledForm action={formAction}>
        <LabelledInput label="Username" id="name" name="name" />
        <LabelledInput label="Password" id="password" name="password" type="password" />
        <StyledSubmitButton disabled={pending} aria-disabled={pending}>
          {buttonText}
        </StyledSubmitButton>
        {error && <StyledError>{error}</StyledError>}
        <Link href={linkHref}>{linkText}</Link>
      </StyledForm>
    </StyledWrapper>
  );
};
