import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  background: ${({ theme }) => theme.colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const DialogContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  max-width: 425px;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const DialogHeader = styled.div`
  margin-bottom: 1rem;
`;

const DialogCloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: 0;
  outline: none;
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  cursor: pointer;
`;

const DialogTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;

const DialogDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.grey};
  margin-top: 0.5rem;
`;

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export const FormDialog = ({ isOpen, setIsOpen, title, description, children }: Props) => {
  return (
    <Overlay $isOpen={isOpen}>
      <DialogContent>
        <DialogCloseButton onClick={() => setIsOpen(false)} aria-label="Close modal">
          <IoClose size={24} />
        </DialogCloseButton>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Overlay>
  );
};
