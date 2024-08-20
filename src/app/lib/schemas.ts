import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  isCompleted: z.boolean().optional().default(false),
});

export const userSchema = z.object({
  name: z.string().min(5),
  password: z.string().min(5),
});
