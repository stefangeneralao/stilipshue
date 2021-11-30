import React, { useState } from 'react';
import axios from 'axios';
import type { RelayState, Relay as TRelay } from '~/types/relay';

interface Props {
  name: string;
  initialState: RelayState;
  id: string;
}

type NetworkStatus = 'loading' | 'error' | 'success';

const Relay = ({ name, initialState, id }: Props) => {
  const [state, setState] = useState(initialState);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('success');

  const onClickHandler = async () => {
    if (networkStatus === 'loading') {
      return;
    }

    setNetworkStatus('loading');
    try {
      const { data } = await axios.patch<TRelay>(`/api/devices/relay/${id}`, {
        id,
        state: state === 'on' ? 'off' : 'on',
      });

      setState(data.state);
      setNetworkStatus('success');
    } catch {
      setNetworkStatus('error');
    }
  };

  if (networkStatus === 'error') {
    return (
      <div onClick={onClickHandler}>
        <p>{`${name}: Failed`}</p>
      </div>
    );
  }

  if (networkStatus === 'loading') {
    return (
      <div onClick={onClickHandler}>
        <p>{`${name}: Loading`}</p>
      </div>
    );
  }

  return (
    <div onClick={onClickHandler}>
      <p>{`${name}: ${state}`}</p>
    </div>
  );
};

export default Relay;
