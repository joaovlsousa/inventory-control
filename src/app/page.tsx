import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-6">
      <Link href="/sign-in">
        <Button>Faça login</Button>
      </Link>

      <Link href="/sign-up">
        <Button>Registre-se</Button>
      </Link>
    </div>
  )
}
