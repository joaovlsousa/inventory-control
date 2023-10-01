'use client'

import { newInventorySchema } from '@/contracts'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

type NewInventory = z.infer<typeof newInventorySchema>

export function InventoryForm() {
  const router = useRouter()

  const form = useForm<NewInventory>({
    resolver: zodResolver(newInventorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const {
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(data: NewInventory): Promise<void> {
    try {
      console.log(data)
      const response = await axios.post('/api/inventories', data)

      if (response.status === 201) {
        form.reset()
        toast.success('Estoque criado')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Erro ao acessar o servidor')
        console.log(error.response)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Nome para o estoque</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="bebidas, frutas, roupas..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.name?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">
                Descrição para o estoque
              </FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="estoque de laticínios..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Este campo é opcional</FormDescription>
              <FormMessage>
                {errors.description?.message?.toString()}
              </FormMessage>
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="px-14">
            {isSubmitting ? <Loader /> : 'Enviar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
