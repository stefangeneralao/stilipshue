import React, { useState } from 'react';
import { Rule, Task as TTask } from '~/types/jobs';
import CollapsedContent from './CollapsedContent';
import MainRow from './MainRow';

interface RowProps {
  jobName: string;
  tasks: TTask[];
  rule: Rule;
  skipOnce: boolean;
}

const Row = ({
  jobName,
  tasks,
  rule,
  skipOnce,
  colSpan,
}: RowProps & { colSpan: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainRow
        open={open}
        setOpen={setOpen}
        jobName={jobName}
        rule={rule}
        initialSkipOnce={skipOnce}
      />
      <CollapsedContent colSpan={colSpan} tasks={tasks} open={open} />
    </>
  );
};

export default Row;
