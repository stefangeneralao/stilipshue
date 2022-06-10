import React, { useState } from 'react';
import { PlayArrow } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Checkbox, Input, TableCell, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Job, Rule } from '~/types/jobs';
import { parseTaskRule, taskRuleToString } from '~/utils';
import axios from 'axios';
import { NetworkStatus } from '~/types/network';

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
  jobName: string;
  initialRule: Rule;
  initialSkipOnce: boolean;
}

const MainRow = ({
  setOpen,
  open,
  jobName,
  initialRule,
  initialSkipOnce,
}: Props) => {
  const [isSkipOnce, setIsSkipOnce] = useState(initialSkipOnce);
  const [rule, setRule] = useState(taskRuleToString(initialRule));
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

  const handleTimeChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    try {
      const newRule = parseTaskRule(e.target.value);
      setRule(e.currentTarget.value);
      await axios.patch<Job>(`/api/jobs/${jobName}`, {
        rule: newRule,
      });
    } catch {
      console.log('Fail to set rule');
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
        <Input
          type="time"
          value={rule}
          disableUnderline
          onChange={handleTimeChange}
        />
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
