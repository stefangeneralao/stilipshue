import React from 'react';
import { TableCell } from '@mui/material';
import { Task as TTask } from '~/types/jobs';
import { TableRow } from './style';

interface Props extends TTask {}

const Task = ({ device, name }: Props) => {
  return (
    <TableRow>
      <TableCell>{device}</TableCell>
      <TableCell align="right">{name}</TableCell>
    </TableRow>
  );
};

export default Task;
