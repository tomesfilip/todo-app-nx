'use client';

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';

import { TaskType } from '../lib/appTypes';
import { DeleteForm } from './forms/deleteForm';
import { EditForm } from './forms/editForm';
import { FormDialog } from './forms/formDialog';
import { ToggleCompletedForm } from './forms/toggleCompletedForm';
import { StyledControlButton } from './ui/controlButton.styled';
import { StyledWrapper } from './ui/wrapper.styled';

type TaskItemProps = {
  task: TaskType;
};

const StyledTask = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const StyledTaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledTaskContent = styled.div`
  width: 100%;
`;

const StyledTaskTitle = styled.h2<{ $isCompleted: boolean }>`
  width: 100%;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  text-decoration: ${({ $isCompleted }) => ($isCompleted ? 'line-through' : 'none')};
  color: ${(props) => props.theme.colors.text};
`;

const StyledControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledLine = styled.hr`
  border-top: 1px solid ${(props) => props.theme.colors.grey};
  width: 100%;
`;

export const TaskDetail = ({ task }: TaskItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { id, userId, isCompleted, title, description } = task;

  return (
    <StyledWrapper>
      <StyledTask>
        <StyledTaskHeader>
          <ToggleCompletedForm id={id} userId={userId} isCompleted={isCompleted} />
          <StyledControlsWrapper>
            <StyledControlButton onClick={() => setIsEditDialogOpen(true)} $type="info">
              <MdEdit color="white" size={16} />
            </StyledControlButton>
            <StyledControlButton onClick={() => setIsDeleteDialogOpen(true)} $type="danger">
              <FaTrash color="white" size={16} />
            </StyledControlButton>
          </StyledControlsWrapper>
        </StyledTaskHeader>
        <StyledLine />
        <StyledTaskContent>
          <StyledTaskTitle $isCompleted={isCompleted}>{title}</StyledTaskTitle>
          <p>{description}</p>
        </StyledTaskContent>
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
        <DeleteForm userId={userId} id={id} shouldRedirectHome />
      </FormDialog>
    </StyledWrapper>
  );
};
