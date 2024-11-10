import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  age: z.number(),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});
