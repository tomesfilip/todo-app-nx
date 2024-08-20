export type TaskType = {
  id: string;
  userId: string;
  createdAt: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

export type UserType = {
  id: string;
  createdAt: string;
  name: string;
  password: string;
};
