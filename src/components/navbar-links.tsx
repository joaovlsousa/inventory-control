'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Vendas',
    href: '/sales',
  },
]

export function NavbarLinks() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-x-5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'font-normal',
            link.href === pathname ? 'font-medium' : 'text-muted-foreground',
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
