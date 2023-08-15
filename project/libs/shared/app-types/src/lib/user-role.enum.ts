export const UserRole: { [x: string]: 'Employer' | 'Executor'} = {
  Employer: 'Employer',
  Executor: 'Executor',
}

export type UserRole = typeof UserRole[keyof typeof UserRole]
