export type BaseEntity = {
  id: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Task = Entity<{
  title: string;
  notes: string;
  tasklist: string;
  priority: string;
  estimate: string;
  duedate: string;
}>;

export type List = Entity<{
  title: string;
  color: string;
  tasks: Task;
}>;
