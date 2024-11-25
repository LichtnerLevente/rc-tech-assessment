import { z } from "zod";

//same schema is used for getById and delete
export const byIdSchema = z.object({
  id: z.string().min(1),
});



export const createSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    board_id: z.number().min(1)
   }),
});

export const updateSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1)
  })
});

export const updatePositionsSchema = z.object({
  params: z.object({
    board_id: z.string().min(1),
  }),
  body: z.array(z.object({
    id: z.number().min(1),
    position: z.number().min(1)
  }))
})



