import { z } from "zod";

// same schema for getById and delete
export const byIdSchema = z.object({
  id: z.string().min(1),
});