import React from 'react';

import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import Task from '~/components/Task';
import { Task as TTask } from '~/types/jobs';

interface Props {
  tasks: TTask[];
  colSpan: number;
  open: boolean;
}

const CollapsedContent = ({ tasks, colSpan, open }: Props) => (
  <TableRow>
    <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colSpan}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device</TableCell>
              <TableCell align="right">Task</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                device={task.device}
                name={task.name}
              />
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" width="100%">
          <Button sx={{ margin: '20px', padding: '10px' }} color="error">
            Remove job
          </Button>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
);

export default CollapsedContent;
