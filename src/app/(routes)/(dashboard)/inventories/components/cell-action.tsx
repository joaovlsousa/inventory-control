'use client'

import {
  CardStackPlusIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ProductsColumns } from './columns'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CellActionProps {
  data: ProductsColumns
}

export function CellAction({ data }: CellActionProps) {
  const router = useRouter()
  const params = useParams()

  const deleteProduct = async (inventoryId: string, productId: string) => {
    const response = await axios.delete(
      `/api/inventories/${inventoryId}/products/${productId}`,
    )

    if (response.status === 200) {
      router.refresh()
    }
  }

  function handleDeleteProduct(id: string) {
    toast.promise(deleteProduct(params.inventoryId, id), {
      loading: 'Apagando produto...',
      success: 'Produto apagado',
      error: 'Erro ao apagar o produto',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DotsHorizontalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/products/${data.id}/edit`)}
        >
          <CardStackPlusIcon className="w-4 h-4 mr-2" />
          Atualizar estoque
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDeleteProduct(data.id)}>
          <TrashIcon className="w-4 h-4 mr-2" />
          Apagar produto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
