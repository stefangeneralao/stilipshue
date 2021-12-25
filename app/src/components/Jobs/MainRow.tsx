import { PlayArrow } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Checkbox, Input, TableCell, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { Rule } from '~/types/jobs';
import { parseTaskRule } from '~/utils';

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
  jobName: string;
  rule: Rule;
}

const MainRow = ({ setOpen, open, jobName, rule }: Props) => (
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
      <Checkbox />
    </TableCell>
    <TableCell align="right" sx={{ borderBottom: 'unset' }}>
      <IconButton>
        <PlayArrow />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default MainRow;
