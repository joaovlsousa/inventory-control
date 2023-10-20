import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { PlusIcon } from '@radix-ui/react-icons'
import { columns } from '../components/columns'
import { ProductForm } from '../components/product-form'

export default async function InventoyPage({
  params,
}: {
  params: { inventoryId: string }
}) {
  const productsAndInventory = await prisma.inventory.findUniqueOrThrow({
    where: {
      id: params.inventoryId,
    },
    select: {
      name: true,
      description: true,
      products: true,
    },
  })

  const { name, description, products } = productsAndInventory

  const dataProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    quantity: `${product.quantity} ${product.typeQuantity.toLowerCase()}`,
    price: formatPrice(product.price),
  }))

  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="leading-relaxed">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-muted-foreground">{description ?? ''}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Novo produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo produto</DialogTitle>
              <DialogDescription>
                Adicione um novo produto ao seu estoque.
              </DialogDescription>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <div className="pt-10 flex justify-center items-center">
        {products.length === 0 ? (
          <span className="text-sm text-muted-foreground">
            Nenhum produto cadastrado
          </span>
        ) : (
          <div className="w-1/2">
            <DataTable
              acessorKey="name"
              columns={columns}
              data={dataProducts}
            />
          </div>
        )}
      </div>
    </>
  )
}
