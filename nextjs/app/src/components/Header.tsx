import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  border-bottom: 1px solid #eaeaea;
  height: 120px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-size: 1.7rem;
`;

interface Props {
  label: string;
}

const Header = ({ label }: Props) => {
  return (
    <Link href="/" passHref>
      <a>
        <StyledHeader>
          <h1>{label}</h1>
        </StyledHeader>
      </a>
    </Link>
  );
};

export default Header;
