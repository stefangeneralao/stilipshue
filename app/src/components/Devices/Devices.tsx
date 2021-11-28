import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Device } from '../Device';
import type { Device as TDevice } from '../../types';
import { Background, Devices as StyledDevices } from './styles';
import { ContentWrapper } from '../common/ContentWrapper';

export const Devices = () => {
  const [devices, setDevices] = useState<TDevice[]>([]);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const { data } = await axios.get<TDevice[]>(
          `${import.meta.env.API_URL}/devices`,
        );
        setDevices(data);
      } catch {
        setIsFailed(true);
        setDevices([]);
      }
    };
    fetchDevices();
  }, []);

  if (isFailed) {
    return <div>Failed to load devices</div>;
  }

  return (
    <Background>
      <StyledDevices>
        {devices.map((device) => (
          <Device
            key={device.name}
            name={device.name}
            initialState={device.state}
            id={device.id}
          />
        ))}
      </StyledDevices>
    </Background>
  );
};
