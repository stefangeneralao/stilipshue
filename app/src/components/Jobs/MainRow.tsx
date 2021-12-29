import React, { useState } from 'react';
import { PlayArrow } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Checkbox, Input, TableCell, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Job, Rule } from '~/types/jobs';
import { parseTaskRule } from '~/utils';
import axios from 'axios';
import { NetworkStatus } from '~/types/network';

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
  jobName: string;
  rule: Rule;
  initialSkipOnce: boolean;
}

const MainRow = ({ setOpen, open, jobName, rule, initialSkipOnce }: Props) => {
  const [isSkipOnce, setIsSkipOnce] = useState(initialSkipOnce);
  const [skipOnceNetworkStatus, setSkipOnceNetworkStatus] =
    useState<NetworkStatus>('success');
  const [executeNowNetworkStatus, setExecuteNowNetworkStatus] =
    useState<NetworkStatus>('success');

  const handleSkipOnce = async () => {
    try {
      setSkipOnceNetworkStatus('loading');
      setIsSkipOnce(!isSkipOnce);
      await axios.patch<Job>(`/api/jobs/${jobName}`, {
        skipOnce: !isSkipOnce,
      });
      setSkipOnceNetworkStatus('success');
    } catch {
      console.log('Fail to skip once');
      setSkipOnceNetworkStatus('error');
    }
  };

  const handleExecuteNow = async () => {
    try {
      setExecuteNowNetworkStatus('loading');
      await axios.patch<Job>(`/api/jobs/${jobName}`, {
        executeNow: true,
      });
      setExecuteNowNetworkStatus('success');
    } catch {
      console.log('Fail to execute now');
      setExecuteNowNetworkStatus('error');
    }
  };

  return (
    <TableRow>
      <TableCell
        sx={{
          width: '40px',
          borderBottom: 'unset',
        }}
        onClick={() => setOpen(!open)}
      >
        <IconButton>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell sx={{ borderBottom: 'unset' }}>
        <Input type="text" value={jobName} disableUnderline />
      </TableCell>
      <TableCell align="right" sx={{ borderBottom: 'unset' }}>
        <Input type="time" value={parseTaskRule(rule)} disableUnderline />
      </TableCell>
      <TableCell align="right" sx={{ borderBottom: 'unset' }}>
        <Checkbox
          checked={isSkipOnce}
          onChange={handleSkipOnce}
          disabled={skipOnceNetworkStatus === 'loading'}
        />
      </TableCell>
      <TableCell align="right" sx={{ borderBottom: 'unset' }}>
        <IconButton
          disabled={executeNowNetworkStatus === 'loading'}
          onClick={handleExecuteNow}
        >
          <PlayArrow
            color={
              executeNowNetworkStatus === 'loading' ? 'disabled' : 'primary'
            }
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default MainRow;
