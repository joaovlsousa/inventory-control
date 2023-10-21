'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ButtonDeleteInventoryProps {
  inventoryId: string
}

export function ButtonDeleteInventory({
  inventoryId,
}: ButtonDeleteInventoryProps) {
  const router = useRouter()

  const deleteInventory = async (id: string) => {
    const response = await axios.delete(`/api/inventories/${id}`)

    if (response.status === 200) {
      router.refresh()
    }
  }

  function handleDeleteInventory(id: string) {
    toast.promise(deleteInventory(id), {
      loading: 'Apagando estoque...',
      success: 'Estoque apagado',
      error: 'Erro ao apagar o estoque',
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:hidden md:group-hover:block p-2 flex items-center justify-center transition-all bg-red-600 hover:bg-red-500">
          <TrashIcon className="w-6 h-5 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-1/3">
        <DialogHeader>
          <DialogTitle>Deseja realmente apagar este estoque?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Button
            variant="destructive"
            onClick={() => handleDeleteInventory(inventoryId)}
          >
            Apagar estoque
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
