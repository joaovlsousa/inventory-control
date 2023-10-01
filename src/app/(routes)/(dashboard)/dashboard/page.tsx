import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import { InventoryForm } from './components/inventory-form'

export default function DashboardPage() {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="leading-relaxed">
        <h1 className="text-2xl font-bold">Controle seus estoques</h1>
        <p className="text-sm text-muted-foreground">
          Tenha todo controle de seus estoques por aqui.
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Novo estoque
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo estoque</DialogTitle>
            <DialogDescription>
              Crie um novo estoque para sua empresa.
            </DialogDescription>
          </DialogHeader>
          <InventoryForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
