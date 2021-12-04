import React from 'react';
import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const StyledMain = styled.main`
  max-width: 768px;
  margin: auto;
`;

const StyledFooter = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Stilips Hue</title>
      </Head>
      <Header />
      <StyledMain>{children}</StyledMain>
      <StyledFooter>Made by Generalao Tech</StyledFooter>
    </>
  );
};

export default Layout;
