'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { newProductSchema } from '@/contracts'

type NewProduct = z.infer<typeof newProductSchema>

export function NewProductForm() {
  const router = useRouter()
  const params = useParams()

  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: '',
    },
  })

  const {
    formState: { errors, isSubmitting, isValid },
  } = form

  async function onSubmit(data: NewProduct): Promise<void> {
    try {
      const response = await axios.post(
        `/api/inventories/${params.inventoryId}/products`,
        data,
      )

      if (response.status === 201) {
        toast.success('Produto cadastrado')
        form.reset()
        router.refresh()
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
              <FormLabel htmlFor="name">Nome do produto</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Refrigerante, arroz, picanha..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.name?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-between">
          <FormField
            control={form.control}
            name="price"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel htmlFor="price">Preço</FormLabel>
                <FormControl>
                  <Input id="price" placeholder="R$ 10.99" {...field} />
                </FormControl>
                <FormMessage>{errors.price?.message?.toString()}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel htmlFor="quantity">Quantidade</FormLabel>
                <FormControl>
                  <Input id="quantity" placeholder="1.5 Kg" {...field} />
                </FormControl>
                <FormMessage>
                  {errors.quantity?.message?.toString()}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="typeQuantity"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo da quantidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="KG">Quilograma - Kg</SelectItem>
                  <SelectItem value="UN">Unidade - Un</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Escolha entre Quilograma ou Unidade
              </FormDescription>
              <FormMessage>
                {errors.typeQuantity?.message?.toString()}
              </FormMessage>
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="px-14"
          >
            {isSubmitting ? <Loader /> : 'Enviar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
