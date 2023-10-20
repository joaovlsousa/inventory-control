import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default function LandingPage() {
  const { userId } = auth()

  return (
    <div className="min-h-screen flex items-center justify-center gap-6">
      <Link href={userId ? '/inventories' : '/sign-in'}>
        <Button>Faça login</Button>
      </Link>

      <Link href={userId ? '/inventories' : '/sign-up'}>
        <Button>Registre-se</Button>
      </Link>
    </div>
  )
}
