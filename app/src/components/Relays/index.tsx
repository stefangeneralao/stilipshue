import React from 'react';
import axios from 'axios';
import useSwr from 'swr';
import { Relay as TRelay } from '~/types/relay';
import Relay from './Relay';
import { Relays as StyledRelays } from './style';

const fetcher = (url: string) => axios(url).then((res) => res.data);

const Relays = () => {
  const { data, error } = useSwr<TRelay[]>('/api/relays', fetcher, {
    revalidateOnMount: true,
    refreshInterval: 1000,
  });

  if (error) {
    return <div>failed to load</div>;
  }

  if (!data) {
    return (
      <StyledRelays>
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <Relay key={`${i}`} name="Loading..." id="" initialState="off" />
          ))}
      </StyledRelays>
    );
  }

  return (
    <StyledRelays>
      {data.map((relay) => (
        <Relay
          key={`${relay.id}:${relay.state}`}
          name={relay.name}
          id={relay.id}
          initialState={relay.state}
        />
      ))}
    </StyledRelays>
  );
};

export default Relays;
