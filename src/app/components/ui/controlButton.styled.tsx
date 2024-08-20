import styled from 'styled-components';

export const StyledControlButton = styled.button<{ $type: 'info' | 'danger' }>`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ $type, theme }) =>
    $type === 'info' ? theme.colors.info : $type === 'danger' ? theme.colors.error : 'initial'};
  cursor: pointer;
  width: 32px;
  height: 32px;
`;
