'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';
import { TaskType } from '../lib/appTypes';
import { DeleteForm } from './forms/deleteForm';
import { EditForm } from './forms/editForm';
import { FormDialog } from './forms/formDialog';
import { ToggleCompletedForm } from './forms/toggleCompletedForm';

type TaskItemProps = {
  task: TaskType;
};

const StyledTaskLink = styled(Link)`
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const StyledTaskText = styled.p<{ $isCompleted?: boolean }>`
  width: 100%;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${($isCompleted) => ($isCompleted ? 'line-through' : 'none')};
`;

const StyledControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledControlButton = styled.button<{ $type: 'info' | 'danger' }>`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ $type }) => ($type === 'info' ? '#2563eb' : $type === 'danger' ? '#dc2626' : 'initial')};
`;

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { id, userId, isCompleted, title } = task;

  return (
    <>
      <StyledTaskLink href={`/tasks/${id}`}>
        <ToggleCompletedForm id={id} userId={userId} isCompleted={isCompleted} />
        <StyledTaskText $isCompleted={isCompleted}>{title}</StyledTaskText>
        <StyledControlsWrapper>
          <StyledControlButton onClick={() => setIsEditDialogOpen(true)} $type="info">
            <MdEdit color="white" />
          </StyledControlButton>
          <StyledControlButton onClick={() => setIsDeleteDialogOpen(true)} $type="danger">
            <FaTrash color="white" />
          </StyledControlButton>
        </StyledControlsWrapper>
      </StyledTaskLink>
      <FormDialog
        title="Edit task"
        description="Make changes to your task here. Click save when you are done."
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      >
        <EditForm task={task} setIsDialogOpen={setIsEditDialogOpen} />
      </FormDialog>
      <FormDialog
        title="Delete task"
        description="Are you sure you want to delete this task?"
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      >
        <DeleteForm userId={userId} id={id} />
      </FormDialog>
    </>
  );
};
