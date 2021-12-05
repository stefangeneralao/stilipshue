import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Card from '~/components/Card';

const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-auto-rows: auto 1fr;
  margin: auto;
`;

const LinkCard = styled(Card)`
  display: grid;
  grid-template-rows: min-content auto;
`;

const Home: NextPage = () => {
  return (
    <>
      <LinksContainer>
        <Link href="/relays">
          <a>
            <LinkCard>
              <h2>Reläer</h2>
              <p>Kontrollera lampor och sånt.</p>
            </LinkCard>
          </a>
        </Link>

        <Link href="/jobs">
          <a>
            <LinkCard>
              <h2>Schema</h2>
              <p>Konfiguera schemaläggning och sånt.</p>
            </LinkCard>
          </a>
        </Link>
      </LinksContainer>
    </>
  );
};

export default Home;
