import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledLabelledInputWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid #6b7280;
  border-radius: 0.5rem;
`;

type Props = {
  label: string;
} & LabelHTMLAttributes<HTMLLabelElement> &
  InputHTMLAttributes<HTMLInputElement>;

export const LabelledInput = ({ label, ...props }: Props) => {
  return (
    <StyledLabelledInputWrapper>
      <label htmlFor={props.htmlFor}>{label}</label>
      <StyledInput type="text" {...props} />
    </StyledLabelledInputWrapper>
  );
};
