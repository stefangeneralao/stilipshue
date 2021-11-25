import React from 'react';
import { Devices } from '../Devices/Devices';
import { Jobs } from '../Jobs';
import { App as StyledApp, H1, Header } from './styles';

interface AppProps {}

export const App = ({}: AppProps) => {
  return (
    <>
      <Header>
        <H1>Stilips Hue</H1>
      </Header>
      <StyledApp>
        <Devices />
        <Jobs />
      </StyledApp>
    </>
  );
};
