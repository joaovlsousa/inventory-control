import { z } from 'zod'

export const newInventorySchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  description: z.string().optional(),
})

export const newProductSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  price: z.coerce
    .number({ required_error: 'Campo obrigatório' })
    .positive('Preço inválido'),

  quantity: z.coerce
    .number({ required_error: 'Campo obrigatório' })
    .positive('Quantidade inválida'),

  typeQuantity: z.enum(['KG', 'UN'], {
    required_error: 'Campo obrigatório',
  }),
})

export const updateProductSchema = z.object({
  id: z.string().uuid().nonempty('Campo obrigatório'),
  price: z.coerce
    .number({ required_error: 'Campo obrigatório' })
    .positive('Preço inválido'),

  quantity: z.coerce
    .number({ required_error: 'Campo obrigatório' })
    .positive('Quantidade inválida'),
})
