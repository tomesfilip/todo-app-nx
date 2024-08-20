import styled from 'styled-components';

export const StyledWrapper = styled.div`
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
