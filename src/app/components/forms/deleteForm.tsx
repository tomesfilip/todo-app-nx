import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import styled from 'styled-components';

import { deleteTask } from '@/server/taskActions';

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

type Props = {
  id: string;
  userId: string;
  shouldRedirectHome?: boolean;
};

export const DeleteForm = ({ id, userId, shouldRedirectHome }: Props) => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        await deleteTask(formData);
        toast('Task deleted');
        if (shouldRedirectHome) {
          router.push('/');
        }
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
