'use client'

import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

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
    <Button
      onClick={() => handleDeleteInventory(inventoryId)}
      className="md:hidden md:group-hover:block p-2 flex items-center justify-center transition-all bg-red-600 hover:bg-red-500"
    >
      <TrashIcon className="w-6 h-5 text-white" />
    </Button>
  )
}
