'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { ProductsColumns } from './columns'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface CellActionProps {
  data: ProductsColumns
}

export function CellAction({ data }: CellActionProps) {
  const router = useRouter()
  const params = useParams()

  const deleteProduct = async (productId: string) => {
    const response = await axios.delete(
      `/api/inventories/${params.inventoryId}/products/${productId}`,
    )

    if (response.status === 200) {
      router.refresh()
    }
  }

  function handleDeleteProduct(id: string) {
    toast.promise(deleteProduct(id), {
      loading: 'Apagando produto...',
      success: 'Produto apagado',
      error: 'Erro ao apagar o produto',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="transition-colors hover:bg-red-600"
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-1/3">
        <DialogHeader>
          <DialogTitle>Deseja realmente apagar este produto?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Button
            variant="destructive"
            onClick={() => handleDeleteProduct(data.id)}
          >
            Apagar produto
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
