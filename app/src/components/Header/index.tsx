import Link from 'next/link';
import React from 'react';
import { StyledHeader } from './style';

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
