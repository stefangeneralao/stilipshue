import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Typography } from '@mui/material';
import { WbIncandescentTwoTone } from '@mui/icons-material';
import type { RelayState, Relay as TRelay } from '~/types/relay';
import styled from 'styled-components';
import Card from '~/components/Card';

interface Props {
  name: string;
  initialState: RelayState;
  id: string;
}

type NetworkStatus = 'loading' | 'error' | 'success';

const IconWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const Icon = styled(WbIncandescentTwoTone)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
`;

const P = styled(Typography)`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  grid-column: 1 / -1;
`;

const StyledSwitch = styled(Switch)`
  margin-left: auto;
`;

const Relay = ({ name, initialState, id }: Props) => {
  const [state, setState] = useState(initialState);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('success');

  const onClickHandler = async () => {
    if (networkStatus === 'loading') {
      return;
    }

    setNetworkStatus('loading');
    setState(state === 'on' ? 'off' : 'on');

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

  console.log('relay', id);

  return (
    <>
      <Card onClick={onClickHandler} disabled={state === 'off'}>
        <IconWrapper>
          <Icon color={state === 'on' ? 'primary' : 'disabled'} />
        </IconWrapper>
        <StyledSwitch
          checked={state === 'on'}
          disabled={networkStatus === 'loading'}
        />
        <P>{`${name}${networkStatus === 'error' ? ': error' : ''}`}</P>
      </Card>
    </>
  );
};

export default Relay;
