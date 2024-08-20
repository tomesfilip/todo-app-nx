'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteTask } from '@/server/taskActions';
import { StyledError } from '../ui/formError.styled';
import { StyledSubmitButton } from '../ui/submitButton.styled';

type Props = {
  id: string;
  userId: string;
  shouldRedirectHome?: boolean;
};

export const DeleteForm = ({ id, userId, shouldRedirectHome }: Props) => {
  const [error, setError] = useState('');

  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const res = await deleteTask(formData);
        if (res?.error) {
          setError(res.error);
          return;
        }
        toast('Task deleted');
        if (shouldRedirectHome) {
          router.push('/');
        }
      }}
    >
      <input type="hidden" name="taskId" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <StyledSubmitButton>Delete</StyledSubmitButton>
      {error && error.length > 0 && <StyledError>{error}</StyledError>}
    </form>
  );
};
