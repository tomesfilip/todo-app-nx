'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import styled from 'styled-components';

import { TaskType } from '@/lib/appTypes';
import { editTask } from '@/server/taskActions';
import { StyledError } from '../ui/formError.styled';
import { LabelledInput } from '../ui/labelledInput';
import { StyledSubmitButton } from '../ui/submitButton.styled';

const StyledLabelInputWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const StyledForm = styled.form`
  display: grid;
  align-items: start;
  gap: 1rem;
`;

type Props = {
  task: TaskType;
  setIsDialogOpen: (value: boolean) => void;
};

export const EditForm = ({ task, setIsDialogOpen }: Props) => {
  const [error, setError] = useState('');

  const ref = useRef<HTMLFormElement>(null);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDesc, setNewDesc] = useState(task.description);

  const { pending } = useFormStatus();

  const isDisabled =
    (task.title === newTitle && task.description === newDesc) || newTitle.length < 1 || newDesc.length < 1 || pending;

  return (
    <StyledForm
      ref={ref}
      action={async (formData) => {
        const res = await editTask(formData);
        if (res?.error) {
          setError(res.error);
          return;
        }
        ref.current?.reset();
        toast('Task updated successfully');
        setIsDialogOpen(false);
      }}
    >
      <StyledLabelInputWrapper>
        <input type="hidden" name="taskId" value={task.id} />
        <input type="hidden" name="userId" value={task.userId} />
        <LabelledInput
          label="Task title"
          id="title"
          placeholder="Go to dentist"
          required
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <LabelledInput
          label="Task description"
          id="description"
          placeholder="8th tooth coming out"
          required
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
      </StyledLabelInputWrapper>
      <StyledSubmitButton aria-disabled={isDisabled} disabled={isDisabled}>
        Save changes
      </StyledSubmitButton>
      {error && error.length > 0 && <StyledError>{error}</StyledError>}
    </StyledForm>
  );
};
