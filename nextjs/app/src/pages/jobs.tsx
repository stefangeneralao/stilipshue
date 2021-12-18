import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Jobs from '~/components/Jobs';

const JobsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stilips Hue - Schema</title>
      </Head>
      <Jobs />
    </>
  );
};

export default JobsPage;
