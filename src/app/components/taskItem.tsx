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

const StyledTask = styled.div`
  display: flex;
  max-height: 40px;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const StyledTaskLinkText = styled(Link)<{ $isCompleted: boolean }>`
  width: 100%;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${({ $isCompleted }) => ($isCompleted ? 'line-through' : 'none')};
  color: ${(props) => props.theme.colors.text};
`;

const StyledControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledControlButton = styled.button<{ $type: 'info' | 'danger' }>`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ $type }) => ($type === 'info' ? '#2563eb' : $type === 'danger' ? '#dc2626' : 'initial')};
  cursor: pointer;
`;

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { id, userId, isCompleted, title } = task;

  return (
    <>
      <StyledTask>
        <ToggleCompletedForm id={id} userId={userId} isCompleted={isCompleted} />
        <StyledTaskLinkText href={`/tasks/${id}`} $isCompleted={isCompleted}>
          {title}
        </StyledTaskLinkText>
        <StyledControlsWrapper>
          <StyledControlButton onClick={() => setIsEditDialogOpen(true)} $type="info">
            <MdEdit color="white" size={16} />
          </StyledControlButton>
          <StyledControlButton onClick={() => setIsDeleteDialogOpen(true)} $type="danger">
            <FaTrash color="white" size={16} />
          </StyledControlButton>
        </StyledControlsWrapper>
      </StyledTask>
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
