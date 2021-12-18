import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import useSwr from 'swr';
import { Jobs as TJobs } from '~/types/jobs';
import Row from './Row';

const fetcher = (url: string) => axios(url).then((res) => res.data);

const Jobs = () => {
  const { data, error } = useSwr<TJobs>('/api/jobs', fetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const rows = Object.entries(data)
    .sort((a, b) => {
      const dateA = moment({
        hour: a[1].rule.hour,
        minute: a[1].rule.minute,
        second: a[1].rule.second,
      });

      const dateB = moment({
        hour: b[1].rule.hour,
        minute: b[1].rule.minute,
        second: b[1].rule.second,
      });

      if (dateA < dateB) {
        return -1;
      }

      if (dateA > dateB) {
        return 1;
      }

      return 0;
    })
    .map(([jobKey, job]) => ({
      ...job,
      jobKey,
    }));

  return (
    <TableContainer sx={{ margin: '20px auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Job</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Skip once?</TableCell>
            <TableCell align="right">Run now</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ jobKey, tasks, rule }) => (
            <Row
              key={jobKey}
              jobName={jobKey}
              tasks={tasks}
              rule={rule}
              colSpan={5}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Jobs;
