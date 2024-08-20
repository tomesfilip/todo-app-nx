'use client';

import { useFormStatus } from 'react-dom';
import styled from 'styled-components';

import { TaskType } from '@/lib/appTypes';
import { toggleCompleted } from '@/server/taskActions';
import { StyledForm } from '../ui/form.styled';

const StyledCheckmarkButton = styled.button<{ $isCompleted?: boolean }>`
  border-radius: 100%;
  border: 1px solid ${(props) => props.theme.colors.primary};
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.$isCompleted ? props.theme.colors.primary : 'transparent')};
  z-index: 2;
  cursor: pointer;
  :disabled {
    opacity: 0.5;
  }
`;

export const ToggleCompletedForm = ({ id, userId, isCompleted }: Pick<TaskType, 'id' | 'userId' | 'isCompleted'>) => {
  const { pending } = useFormStatus();

  return (
    <StyledForm action={toggleCompleted}>
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="isCompleted" value={isCompleted ? 'checked' : 'unchecked'} />
      <StyledCheckmarkButton aria-disabled={pending} disabled={pending} $isCompleted={isCompleted} />
    </StyledForm>
  );
};
