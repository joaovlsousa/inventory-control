import { cn, formatDate } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ButtonDeleteInventory } from './button-delete-inventory'

interface InventoryCardProps {
  id: string
  name: string
  description: string | null
  quantity: number
  updatedAt: Date
}

export function InventoryCard({
  updatedAt,
  description = '',
  id,
  name,
  quantity,
}: InventoryCardProps) {
  const date = formatDate(updatedAt)
  const linkURL = `/inventories/${id}`

  return (
    <Card className="w-72 h-64 flex flex-col transition-all group hover:border-primary">
      <CardHeader>
        <CardTitle className="text-xl h-5 flex justify-between">
          {name}
          <ButtonDeleteInventory inventoryId={id} />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1">
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex gap-x-2 items-center">
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                quantity === 0 ? 'bg-slate-600' : 'bg-emerald-600',
              )}
            />
            <p
              className={cn(
                'text-sm',
                quantity === 0 ? 'text-muted-foreground' : 'text-primary/90',
              )}
            >
              {quantity} produtos cadastrados
            </p>
          </div>
          <div>
            <div className="flex gap-x-2 items-center">
              <CalendarIcon className="w-4 h-4 text-sky-600" />
              <p className="text-sm font-semibold text-primary/90">
                Útima atualização
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-medium">{date}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={linkURL} className="text-sm text-sky-600">
          Ver estoque
        </Link>
      </CardFooter>
    </Card>
  )
}
