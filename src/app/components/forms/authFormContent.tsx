'use client';

import styled from 'styled-components';

import { LabelledInput } from '../ui/labelledInput';

type Props = { buttonText: string };

const StyledSubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.bg};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  padding: 0.5rem 1rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AuthFormContent = ({ buttonText }: Props) => {
  return (
    <>
      <LabelledInput label="Username" id="name" name="name" />
      <LabelledInput label="Password" id="password" name="password" type="password" />
      <StyledSubmitButton>{buttonText}</StyledSubmitButton>
    </>
  );
};
