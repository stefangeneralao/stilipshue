import React, { useState } from 'react';
import { PlayArrow } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Task from '~/components/Task';
import { Rule, Task as TTask } from '~/types/jobs';
import { parseTaskRule } from '~/utils';

interface RowProps {
  jobName: string;
  tasks: TTask[];
  rule: Rule;
}

const Row = ({
  jobName,
  tasks,
  rule,
  colSpan,
}: RowProps & { colSpan: number }) => {
  const [open, setOpen] = useState(false);

  const MainRow = () => (
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

  const CollapsedContent = () => (
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

  return (
    <>
      {MainRow()}
      {CollapsedContent()}
    </>
  );
};

export default Row;
