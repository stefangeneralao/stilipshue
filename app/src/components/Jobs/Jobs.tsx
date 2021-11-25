import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import moment from 'moment';
import { Job, Jobs as StyledJobs } from './styles';

interface IJobsResponse {
  [key: string]: {
    rule: {
      hour: number;
      minute: number;
      second: number;
    };
    tasks: {
      device: string;
      id: string;
      name: string;
    }[];
  };
}

export const Jobs = () => {
  const [jobs, setJobs] = useState<IJobsResponse>({});
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get<IJobsResponse>(
          'http://192.168.0.2:3001/jobs',
        );
        console.log(data);
        setJobs(data);
      } catch (e) {
        console.log('error', e);
        setIsFailed(true);
        setJobs({});
      }
    };
    fetchJobs();
  }, []);

  return (
    <StyledJobs>
      {Object.entries(jobs).map(([key, value]) => {
        const timeString = moment({
          hour: value.rule.hour,
          minute: value.rule.minute,
          second: value.rule.second,
        }).format('HH:mm:ss');

        return (
          <Job key={key}>
            <h3>
              {key} ({timeString})
            </h3>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Device</TableCell>
                    <TableCell>Task</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value.tasks.map(({ device, id, name }) => (
                    <TableRow key={id}>
                      <TableCell>{device}</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Job>
        );
      })}
    </StyledJobs>
  );
};
