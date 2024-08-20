import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  isCompleted: z.boolean().optional().default(false),
});

export const userSchema = z.object({
  name: z.string().min(5, 'Name is required (min. 5 characters)'),
  password: z.string().min(5, 'Password is required (min. 5 characters)'),
});
