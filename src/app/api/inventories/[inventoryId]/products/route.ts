import { newProductSchema } from '@/contracts'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { inventoryId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Não autorizado', { status: 401 })
    }

    const body = await req.json()

    const productPayload = newProductSchema.parse(body)

    const product = await prisma.product.create({
      data: {
        ...productPayload,
        inventory: {
          connect: {
            id: params.inventoryId,
          },
        },
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.log('[PRODUCT_ERROR]', error)
    return new NextResponse('Internal server error')
  }
}
