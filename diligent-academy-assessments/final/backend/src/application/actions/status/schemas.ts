import { z } from "zod";


export const byIdSchema = z.object({
  id: z.string().min(1),
});

export const createSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    board_id: z.number().min(1)
   }),
});




