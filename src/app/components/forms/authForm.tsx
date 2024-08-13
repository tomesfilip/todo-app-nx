'use client';

import styled from 'styled-components';
import { LabelledInput } from '../ui/labelledInput';

type Props = { buttonText: string };

const StyledSubmitButton = styled.button`
  background-color: #374151;
  border-radius: 0.5rem;
  color: white;
  padding: 0.5rem 1rem;

  &:disabled {
    background-color: #374151;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AuthFormContent = ({ buttonText }: Props) => {
  return (
    <>
      <LabelledInput label="Username" htmlFor="name" id="name" name="name" />
      <LabelledInput label="Password" htmlFor="password" id="password" name="password" type="password" />
      <StyledSubmitButton>{buttonText}</StyledSubmitButton>
    </>
  );
};
