export const TaskStatus: { [x: string]: 'New' | 'Cancelled' | 'InProgress' | 'Completed' | 'Failed' } = {
  New: 'New',
  Cancelled: 'Cancelled',
  InProgress: 'InProgress',
  Completed: 'Completed',
  Failed: 'Failed'
}

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]
