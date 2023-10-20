import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { inventoryId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Não autorizado', { status: 401 })
    }

    await prisma.inventory.delete({
      where: {
        userId,
        id: params.inventoryId,
      },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.log(`[INVENTORY_ERROR] ${error}`)
    return new NextResponse('Internal error', { status: 500 })
  }
}
