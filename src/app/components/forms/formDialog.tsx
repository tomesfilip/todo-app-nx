import { ReactNode } from 'react';
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
`;

const DialogHeader = styled.div`
  margin-bottom: 1rem;
`;

const DialogTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;

const DialogDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.bg};
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  &:disabled {
    background-color: #047857;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f9fafb;
  color: #4b5563;
`;

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description?: string;
  cancelButtonText?: string;
  children: ReactNode;
};

export const FormDialog = ({ isOpen, setIsOpen, title, description, children, cancelButtonText = 'Cancel' }: Props) => {
  return (
    <Overlay $isOpen={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <ButtonContainer>
          <CancelButton onClick={() => setIsOpen(false)}>{cancelButtonText}</CancelButton>
          <Button onClick={() => setIsOpen(false)}>Submit</Button>
        </ButtonContainer>
      </DialogContent>
    </Overlay>
  );
};
