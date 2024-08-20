'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { addTask } from '@/server/taskActions';
import { StyledForm } from '../ui/form.styled';
import { StyledError } from '../ui/formError.styled';
import { LabelledInput } from '../ui/labelledInput';
import { StyledSubmitButton } from '../ui/submitButton.styled';

type Props = {
  setIsDialogOpen: (value: boolean) => void;
};

export const AddForm = ({ setIsDialogOpen }: Props) => {
  const [error, setError] = useState('');

  const ref = useRef<HTMLFormElement>(null);

  const { pending } = useFormStatus();

  return (
    <StyledForm
      ref={ref}
      action={async (formData) => {
        const res = await addTask(formData);
        if (res?.error) {
          setError(res.error);
          return;
        }
        ref.current?.reset();
        toast('Task added successfully');
        setIsDialogOpen(false);
      }}
    >
      <LabelledInput label="Task title" id="title" placeholder="Go to dentist" required />
      <LabelledInput label="Task description" id="description" placeholder="8th tooth coming out" required />
      <StyledSubmitButton aria-disabled={pending} disabled={pending}>
        Add task
      </StyledSubmitButton>
      {error && error.length > 0 && <StyledError>{error}</StyledError>}
    </StyledForm>
  );
};
