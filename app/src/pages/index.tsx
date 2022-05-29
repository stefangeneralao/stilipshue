import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Card from '~/components/Card';

const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  margin: auto;
`;

const Home: NextPage = () => {
  return (
    <>
      <LinksContainer>
        <Card>
          <Link href="/relays">
            <a>
              <h2>Relays</h2>
              <p>Control lamps and stuff.</p>
            </a>
          </Link>
        </Card>

        <Card>
          <Link href="/jobs">
            <a>
              <h2>Schedule</h2>
              <p>Configuration of schedule events.</p>
            </a>
          </Link>
        </Card>
      </LinksContainer>
    </>
  );
};

export default Home;
