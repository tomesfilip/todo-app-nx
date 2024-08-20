'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import styled from 'styled-components';

import { addTask } from '@/server/taskActions';
import { LabelledInput } from '../ui/labelledInput';
import { StyledSubmitButton } from '../ui/submitButton.styled';

const StyledForm = styled.form`
  display: grid;
  align-items: start;
  gap: 1rem;
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
      <LabelledInput label="Task title" id="title" placeholder="Go to dentist" required />
      <LabelledInput label="Task description" id="description" placeholder="8th tooth coming out" required />
      <StyledSubmitButton aria-disabled={pending} disabled={pending}>
        Add task
      </StyledSubmitButton>
    </StyledForm>
  );
};
