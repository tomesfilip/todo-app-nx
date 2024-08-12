'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { addTask } from 'src/app/server/taskActions';
import styled from 'styled-components';
import { LabelledInput } from '../ui/labelledInput';

const StyledForm = styled.form`
  display: grid;
  align-items: start;
  gap: 1rem;
`;

const StyledSubmitButton = styled.button`
  background-color: #047857;
  border-radius: 0.5rem;
  color: white;
  padding: 0.5rem 1rem;

  &:disabled {
    background-color: #047857;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

type Props = {
  setIsDialogOpen: (value: boolean) => void;
};

export const AddForm = ({ setIsDialogOpen }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  const { pending } = useFormStatus();

  return (
    <StyledForm
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await addTask(formData);
        toast('Task added successfully');
        setIsDialogOpen(false);
      }}
    >
      <LabelledInput label="Task title" htmlFor="title" id="title" name="title" placeholder="Go to dentist" />
      <StyledSubmitButton aria-disabled={pending} disabled={pending}>
        Save changes
      </StyledSubmitButton>
    </StyledForm>
  );
};
