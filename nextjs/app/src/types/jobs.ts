export interface Rule {
  hour: number;
  minute: number;
  second: number;
}

export interface Task {
  device: string;
  id: string;
  name: string;
}

export interface Job {
  rule: Rule;
  tasks: Task[];
}

export interface Jobs {
  [key: string]: Job;
}
