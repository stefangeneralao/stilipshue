import React from 'react';
import Head from 'next/head';
import Header from '~/components/Header';
import { Footer as StyledFooter, Main as StyledMain } from './style';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Stilips Hue</title>
      </Head>
      <Header label="Stilips Hue" />
      <StyledMain>{children}</StyledMain>
      <StyledFooter>Made by Generalao Tech</StyledFooter>
    </>
  );
};

export default Layout;
