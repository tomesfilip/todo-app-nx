import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteTask } from '@/server/taskActions';
import { StyledSubmitButton } from '../ui/submitButton.styled';

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
      <StyledSubmitButton>Delete</StyledSubmitButton>
    </form>
  );
};
