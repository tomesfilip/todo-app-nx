import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledLabelledInputWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid #6b7280;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

type Props = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const LabelledInput = ({ label, id, ...props }: Props) => {
  return (
    <StyledLabelledInputWrapper>
      <label htmlFor={id}>{label}</label>
      <StyledInput type="text" id={id} name={id} {...props} />
    </StyledLabelledInputWrapper>
  );
};
