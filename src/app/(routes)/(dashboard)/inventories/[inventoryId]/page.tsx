import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'

import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

import { columns } from './_components/columns'
import { NewProductCard } from './_components/new-product-card'
import { UpdateProductCard } from './_components/update-product-card'

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
    quantity: `${product.quantity} ${
      product.typeQuantity === 'KG' ? 'Quilogramas' : 'Unidades'
    }`,
    price: formatPrice(product.price),
  }))

  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="leading-relaxed">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-muted-foreground">{description ?? ''}</p>
        </div>
        <div className="flex items-center gap-x-3">
          <UpdateProductCard data={products} />
          <NewProductCard />
        </div>
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
