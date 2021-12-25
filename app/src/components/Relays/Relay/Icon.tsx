import React from 'react';
import { RelayState } from '~/types/relay';
import { BulbIcon, ErrorIcon, LoadingIcon } from '../style';
import { NetworkStatus } from '../types';
interface Props {
  status: NetworkStatus | RelayState;
}

const Icon = ({ status }: Props) => {
  if (status === 'error') {
    return <ErrorIcon color="error" />;
  }

  if (status === 'loading') {
    return <LoadingIcon size={24} />;
  }

  return <BulbIcon color={status === 'on' ? 'primary' : 'disabled'} />;
};

export default Icon;
