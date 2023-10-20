import { newInventorySchema } from '@/contracts'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const body = await req.json()
    const { name, description } = newInventorySchema.parse(body)

    const inventory = await prisma.inventory.create({
      data: {
        userId,
        name,
        description,
      },
    })

    return NextResponse.json(inventory, { status: 201 })
  } catch (error) {
    return new NextResponse(`[INVENTORY_POST_ERROR]: ${error}`, { status: 500 })
  }
}
