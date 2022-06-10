import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Relays from '~/components/Relays';

const RelaysPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stilips Hue - Relays</title>
      </Head>
      <Relays />
    </>
  );
};

export default RelaysPage;
