'use client';

import { LabelledInput } from '../ui/labelledInput';
import { StyledSubmitButton } from '../ui/submitButton.styled';

type Props = { buttonText: string };

export const AuthFormContent = ({ buttonText }: Props) => {
  return (
    <>
      <LabelledInput label="Username" id="name" name="name" />
      <LabelledInput label="Password" id="password" name="password" type="password" />
      <StyledSubmitButton>{buttonText}</StyledSubmitButton>
    </>
  );
};
