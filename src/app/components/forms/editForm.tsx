'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { TaskType } from 'src/app/lib/appTypes';
import { editTask } from 'src/app/server/taskActions';
import styled from 'styled-components';

const StyledLabelInputWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
`;

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

const StyledTitleInput = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid #6b7280;
  border-radius: 0.5rem;
`;

type Props = {
  task: TaskType;
  setIsDialogOpen: (value: boolean) => void;
};

export const EditForm = ({ task, setIsDialogOpen }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  const [newTitle, setNewTitle] = useState(task.title);

  const { pending } = useFormStatus();

  const isDisabled = task.title === newTitle || newTitle.length < 1 || pending;

  return (
    <StyledForm
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await editTask(formData);
        toast('Task updated successfully');
        setIsDialogOpen(false);
      }}
    >
      <StyledLabelInputWrapper>
        <input type="hidden" name="taskId" value={task.id} />
        <input type="hidden" name="userId" value={task.userId} />
        <label htmlFor="title">Task</label>
        <StyledTitleInput
          type="title"
          id="title"
          name="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </StyledLabelInputWrapper>
      <StyledSubmitButton aria-disabled={isDisabled} disabled={isDisabled}>
        Save changes
      </StyledSubmitButton>
    </StyledForm>
  );
};
