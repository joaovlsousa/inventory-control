import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

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

import { InventoryCard } from './_components/inventory-card'
import { InventoryForm } from './_components/inventory-form'

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const inventories = await prisma.inventory.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  })

  return (
    <>
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
      {inventories.length === 0 ? (
        <div className="pt-10 flex justify-center items-center">
          <span className="text-sm text-muted-foreground">
            Nenhum estoque cadastrado
          </span>
        </div>
      ) : (
        <div className="p-10 flex flex-wrap items-center justify-start gap-8">
          {inventories.map((inventory) => (
            <InventoryCard
              key={inventory.id}
              quantity={inventory._count.products}
              {...inventory}
            />
          ))}
        </div>
      )}
    </>
  )
}
