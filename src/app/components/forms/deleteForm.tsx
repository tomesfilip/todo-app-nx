import { toast } from 'sonner';
import { TaskType } from 'src/app/lib/appTypes';
import { deleteTask } from 'src/app/server/taskActions';
import styled from 'styled-components';

const StyledDeleteButton = styled.button`
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  padding: 0.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

export const DeleteForm = ({ id, userId }: Pick<TaskType, 'id' | 'userId'>) => {
  return (
    <form
      action={async (formData) => {
        await deleteTask(formData);
        toast('Task deleted');
      }}
    >
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <StyledDeleteButton>
        <span>Delete</span>
      </StyledDeleteButton>
    </form>
  );
};
