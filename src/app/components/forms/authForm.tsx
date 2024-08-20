'use client';

import { login, register } from '@/server/userActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { LabelledInput } from '../ui/labelledInput';
import { StyledSubmitButton } from '../ui/submitButton.styled';

const StyledForm = styled.form`
  display: grid;
  gap: 1.2rem;
`;

type Props = { type: 'login' | 'register' };

export const AuthForm = ({ type }: Props) => {
  const router = useRouter();

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

  return (
    <StyledForm
      action={async (formData) => {
        await action(formData);
        router.push(type === 'login' ? '/' : '/login');
      }}
    >
      <LabelledInput label="Username" id="name" name="name" />
      <LabelledInput label="Password" id="password" name="password" type="password" />
      <StyledSubmitButton>{buttonText}</StyledSubmitButton>
      <Link href={linkHref}>{linkText}</Link>
    </StyledForm>
  );
};
