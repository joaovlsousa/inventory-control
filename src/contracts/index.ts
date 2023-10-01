import { z } from 'zod'

export const newInventorySchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  description: z.string().optional(),
})
