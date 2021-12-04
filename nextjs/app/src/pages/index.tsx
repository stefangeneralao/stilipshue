import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

// const useStyles = makeStyles({
//   linksContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//     margin: 'auto',
//   },
//   card: {
//     display: 'flex',
//     flex: '1',
//     padding: '2rem 0',
//     borderTop: '1px solid #eaeaea',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: auto;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 10px 0;
  margin: 5px;
  border: 1px solid #eaeaea;
  text-align: center;
`;

const Home: NextPage = () => {
  return (
    <>
      <LinksContainer>
        <Link href="/relays">
          <a>
            <Card>
              <h2>Reläer</h2>
              <p>Kontrollera lampor och sånt.</p>
            </Card>
          </a>
        </Link>

        <Link href="/jobs">
          <a>
            <Card>
              <h2>Schema</h2>
              <p>Konfiguera schemaläggning och sånt.</p>
            </Card>
          </a>
        </Link>
      </LinksContainer>
    </>
  );
};

export default Home;
