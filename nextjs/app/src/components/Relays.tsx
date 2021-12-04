import React from 'react';
import axios from 'axios';
import useSwr from 'swr';
import { Relay as TRelay } from '~/types/relay';
import Relay from '~/components/Relay';
import styled from 'styled-components';

const fetcher = (url: string) => axios(url).then((res) => res.data);

const StyledRelays = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-auto-rows: auto 1fr;
`;

const Relays = () => {
  const { data: relays, error } = useSwr<TRelay[]>(
    '/api/devices/relays',
    fetcher
  );

  if (error) {
    return <div>failed to load</div>;
  }

  if (!relays) {
    return <div>loading...</div>;
  }

  return (
    <>
      <StyledRelays>
        {relays.map((relay) => (
          <Relay
            key={relay.id}
            name={relay.name}
            id={relay.id}
            initialState={relay.state}
          />
        ))}
      </StyledRelays>
    </>
  );
};

export default Relays;
