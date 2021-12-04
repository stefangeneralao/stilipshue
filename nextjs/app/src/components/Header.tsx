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

const Header = () => {
  return (
    <Link href="/" passHref>
      <StyledHeader>
        <h1>Stilips Hue</h1>
      </StyledHeader>
    </Link>
  );
};

export default Header;
