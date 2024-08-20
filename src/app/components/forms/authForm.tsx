'use client';

import { login, register } from '@/server/userActions';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import styled from 'styled-components';

import { StyledError } from '../ui/formError.styled';
import { LabelledInput } from '../ui/labelledInput';
import { StyledSubmitButton } from '../ui/submitButton.styled';
import { StyledWrapper } from '../ui/wrapper.styled';

const StyledForm = styled.form`
  display: grid;
  gap: 1.2rem;
`;

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

  return (
    <StyledWrapper>
      <StyledForm action={formAction}>
        <LabelledInput label="Username" id="name" name="name" />
        <LabelledInput label="Password" id="password" name="password" type="password" />
        <StyledSubmitButton>{buttonText}</StyledSubmitButton>
        {error && <StyledError>{error}</StyledError>}
        <Link href={linkHref}>{linkText}</Link>
      </StyledForm>
    </StyledWrapper>
  );
};
