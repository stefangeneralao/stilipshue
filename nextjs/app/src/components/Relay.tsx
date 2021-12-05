import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Typography } from '@mui/material';
import { WbIncandescentTwoTone, Error } from '@mui/icons-material';
import type { RelayState, Relay as TRelay } from '~/types/relay';
import styled, { css } from 'styled-components';
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

const StyledCommonIcon = css`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
`;

const BulbIcon = styled(WbIncandescentTwoTone)`
  ${StyledCommonIcon}
`;

const ErrorIcon = styled(Error)`
  ${StyledCommonIcon}
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

const RelayCard = styled(Card)<{ disabled?: boolean }>`
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  position: relative;

  background: ${(props) =>
    props.disabled
      ? 'linear-gradient(81deg,rgba(230, 230, 230, 1) 0%,rgba(208, 208, 208, 1) 100%)'
      : 'white'};
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
      setState('off');
    }
  };

  const Icon = () => {
    if (networkStatus === 'error') {
      return <ErrorIcon color="error" />;
    }

    if (networkStatus === 'loading') {
      return <BulbIcon color="secondary" />;
    }

    return <BulbIcon color={state === 'on' ? 'primary' : 'disabled'} />;
  };

  return (
    <>
      <RelayCard onClick={onClickHandler} disabled={state === 'off'}>
        <IconWrapper>
          <Icon />
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
