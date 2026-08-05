import { z } from 'zod';

const schema = z.object({
  apiUrl: z.string().url().default('http://localhost:5000'),
});

export const env = schema.parse({
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
});
