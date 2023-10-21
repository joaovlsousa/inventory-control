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

import { updateProductSchema } from '@/contracts'
import { UpdateProductProps } from './update-product-card'

type UpdateProduct = z.infer<typeof updateProductSchema>

export function UpdateProductForm({ data }: UpdateProductProps) {
  const router = useRouter()
  const params = useParams()

  const form = useForm<UpdateProduct>({
    resolver: zodResolver(updateProductSchema),
  })

  const {
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = form

  function getDataProduct(id: string) {
    const product = data.find((product) => product.id === id)

    if (product) {
      setValue('price', product.price)
      setValue('quantity', product.quantity)
    }
  }

  async function onSubmit(data: UpdateProduct): Promise<void> {
    try {
      const response = await axios.patch(
        `/api/inventories/${params.inventoryId}/products`,
        data,
      )

      if (response.status === 200) {
        toast.success('Produto atualizado')
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
          name="id"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produtos</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar produto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription
                onClick={() => getDataProduct(getValues('id'))}
                className="text-sky-600 font-medium cursor-pointer"
              >
                Buscar dados do produto
              </FormDescription>
              <FormMessage>{errors.id?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="price">Novo preço</FormLabel>
              <FormControl>
                <Input id="price" {...field} />
              </FormControl>
              <FormDescription>
                Informe um novo preço, ou carregue o preço anterior
              </FormDescription>
              <FormMessage>{errors.price?.message?.toString()}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="quantity">Repor estoque</FormLabel>
              <FormControl>
                <Input
                  id="quantity"
                  placeholder="Adicionar nova quantidade"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Repor uma nova remessa do produto
              </FormDescription>
              <FormMessage>{errors.quantity?.message?.toString()}</FormMessage>
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
