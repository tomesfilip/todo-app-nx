'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { LogoutForm } from './forms/logoutForm';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.desktop};
  padding: 1rem;
`;

const StyledLogoLink = styled(Link)`
  font-weight: 600;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
`;

const StyledLoginLink = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey};
`;

type Props = {
  userId?: string;
};

export const Header = ({ userId }: Props) => {
  return (
    <StyledHeader>
      <StyledLogoLink href="/">Todos</StyledLogoLink>
      {userId ? <LogoutForm /> : <StyledLoginLink href="/login">Log in</StyledLoginLink>}
    </StyledHeader>
  );
};
