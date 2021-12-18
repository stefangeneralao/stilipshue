import React from 'react';
import { RelayState } from '~/types/relay';
import { BulbIcon, ErrorIcon } from '../style';
import { NetworkStatus } from '../types';

interface Props {
  status: NetworkStatus | RelayState;
}

const Icon = ({ status }: Props) => {
  if (status === 'error') {
    return <ErrorIcon color="error" />;
  }

  if (status === 'loading') {
    return <BulbIcon color="disabled" />;
  }

  return <BulbIcon color={status === 'on' ? 'primary' : 'disabled'} />;
};

export default Icon;
