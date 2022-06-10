import React, { useState } from 'react';
import axios from 'axios';
import type { Relay as TRelay, RelayState } from '~/types/relay';
import { IconWrapper, P, RelayCard, StyledSwitch } from '../style';
import Icon from './Icon';
import { NetworkStatus } from '~/types/network';

interface Props {
  name: string;
  initialState: RelayState;
  id: string;
}

const Relay = ({ name, initialState, id }: Props) => {
  const [state, setState] = useState<RelayState>(initialState);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('success');

  const onClickHandler = async () => {
    if (networkStatus === 'loading') {
      return;
    }

    setNetworkStatus('loading');
    setState(state === 'on' ? 'off' : 'on');

    try {
      const { data } = await axios.patch<TRelay>(`/api/relays/${id}`, {
        id,
        state: state === 'on' ? 'off' : 'on',
      });

      setState(data.state);
      setNetworkStatus('success');
    } catch {
      setNetworkStatus('error');
      setState('off');
    }
  };

  const iconStatus = (() => {
    switch (networkStatus) {
      case 'loading':
        return 'loading';
      case 'error':
        return 'error';
      case 'success':
        return state === 'on' ? 'on' : state === 'unknown' ? 'error' : 'off';
      default:
        throw new Error('Unknown network status');
    }
  })();

  return (
    <>
      <RelayCard onClick={onClickHandler} loading={networkStatus === 'loading'}>
        <IconWrapper>
          <Icon status={iconStatus} />
        </IconWrapper>
        <StyledSwitch
          checked={state === 'on'}
          disabled={networkStatus === 'loading'}
        />
        <P>{name}</P>
      </RelayCard>
    </>
  );
};

export default Relay;
