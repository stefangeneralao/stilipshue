import React from 'react';
import axios from 'axios';
import useSwr from 'swr';
import { Relay as TRelay } from '~/types/relay';
import Relay from '~/components/Relay';

const fetcher = (url: string) => axios(url).then((res) => res.data);

const Relays = () => {
  const { data: relays, error } = useSwr<TRelay[]>(
    '/api/devices/relays',
    fetcher
  );

  if (!relays) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  console.log('Relays');

  return (
    <div>
      {relays.map((relay) => (
        <Relay
          key={relay.id}
          name={relay.name}
          id={relay.id}
          initialState={relay.state}
        />
      ))}
    </div>
  );
};

export default Relays;
