import { z } from "zod";

//TODO: Fix!
export const groupDTO = z.object({
    name: z.string().min(1),
    usernames: z.array(z.string()),
}); 

export type GroupDTO = z.infer<typeof groupDTO>;