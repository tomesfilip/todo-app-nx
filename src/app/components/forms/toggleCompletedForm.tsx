'use client';

import { useFormStatus } from 'react-dom';
import { TaskType } from 'src/app/lib/appTypes';
import { toggleCompleted } from 'src/app/server/taskActions';
import styled from 'styled-components';

const StyledCheckmarkButton = styled.button<{ $isCompleted?: boolean }>`
  border-radius: 100%;
  border: 1px solid red;
  width: 20px;
  height: 20px;
  background-color: ${($isCompleted) => ($isCompleted ? 'red' : 'transparent')};
  :disabled {
    opacity: 0.5;
  }
`;

export const ToggleCompletedForm = ({ id, userId, isCompleted }: Pick<TaskType, 'id' | 'userId' | 'isCompleted'>) => {
  const { pending } = useFormStatus();

  return (
    <form action={toggleCompleted} className="flex items-center">
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="isCompleted" value={isCompleted ? 'checked' : 'unchecked'} />
      <StyledCheckmarkButton aria-disabled={pending} disabled={pending} $isCompleted={isCompleted} />
    </form>
  );
};
