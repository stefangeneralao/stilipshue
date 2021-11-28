import React, { useState } from 'react';
import axios from 'axios';
import type {
  Device as TDevice,
  ShellyRelayNetworkState,
  ShellyRelayState,
} from '../../types';
import { Device as StyledDevice, P, Switch, Icon } from './styles';

interface Props extends Omit<TDevice, 'state'> {
  initialState: ShellyRelayState;
}

export const Device = ({ name, initialState, id }: Props) => {
  const [state, setState] = useState<ShellyRelayNetworkState>(initialState);

  const toggleState = async () => {
    try {
      setState('pending');
      const requestState = state === 'on' ? 'off' : 'on';
      const {
        data: { state: responseState },
      } = await axios.post<{ state: ShellyRelayState }>(
        `${
          import.meta.env.API_URL
        }/devices/relays?state=${requestState}&id=${id}`,
      );
      setState(responseState);
    } catch {
      setState('failed');
    }
  };

  const handleClick = () => {
    if (state === 'pending') return;
    toggleState();
  };

  return (
    <StyledDevice state={state} onClick={handleClick}>
      <div style={{ height: '100%', position: 'relative' }}>
        <Icon color={state === 'on' ? 'primary' : 'disabled'} />
      </div>
      <Switch checked={state === 'on'} />
      <P>{name}</P>
    </StyledDevice>
  );
};
