import { UpdateIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { UpdateProductForm } from './update-product-form'

export interface UpdateProductProps {
  data: {
    id: string
    name: string
    quantity: number
    price: number
  }[]
}

export function UpdateProductCard({ data }: UpdateProductProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UpdateIcon className="w-4 h-4 mr-2" />
          Atualizar estoque
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar estoque</DialogTitle>
          <DialogDescription>
            Atualize os dados dos produtos de seu estoque
          </DialogDescription>
        </DialogHeader>
        <UpdateProductForm data={data} />
      </DialogContent>
    </Dialog>
  )
}
