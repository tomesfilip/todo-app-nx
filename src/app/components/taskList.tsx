'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';
import styled from 'styled-components';

import { TaskType } from '../lib/appTypes';
import { AddForm } from './forms/addForm';
import { FormDialog } from './forms/formDialog';
import { TaskItem } from './taskItem';

const StyledTaskListWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  background-color: ${(props) => props.theme.colors.bg};
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  -webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.75);
`;

const StyledAuthLink = styled(Link)`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.bg};
  font-size: 18px;
  padding: 0.75rem 1.4rem;
  border-radius: 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledAddTaskButton = styled.button`
  border-radius: 9999px;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg};
  position: absolute;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  bottom: -4rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const StyledTaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow: auto;
  max-height: 360px;
  width: 100%;
`;

const StyledErrorText = styled.p`
  text-align: center;
  font-size: 18px;
`;

type Props = {
  userId?: string;
  tasks?: TaskType[];
  error?: string;
};

export const TaskList = ({ userId, tasks, error }: Props) => {
  const [isAddFormDialogOpen, setIsAddFormDialogOpen] = useState(false);

  return (
    <StyledTaskListWrapper>
      {error && <StyledErrorText>{error}</StyledErrorText>}
      {!userId && (
        <StyledAuthLink href="/login">
          Log in
          <FiLogIn />
        </StyledAuthLink>
      )}
      {userId && (
        <>
          <StyledAddTaskButton onClick={() => setIsAddFormDialogOpen(true)}>
            <IoAdd style={{ color: 'red', width: '3rem', height: '3rem' }} />
          </StyledAddTaskButton>
          <FormDialog
            title="Add task"
            description="Create a new task and add it to your todo list"
            isOpen={isAddFormDialogOpen}
            setIsOpen={setIsAddFormDialogOpen}
          >
            <AddForm setIsDialogOpen={setIsAddFormDialogOpen} />
          </FormDialog>
        </>
      )}
      {tasks && tasks.length > 0 && (
        <StyledTaskList>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </StyledTaskList>
      )}
    </StyledTaskListWrapper>
  );
};
