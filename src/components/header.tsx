import { ModeToggle } from '@/components/mode-toogle'
import { NavbarLinks } from '@/components/navbar-links'
import { Separator } from '@/components/ui/separator'
import { UserButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-muted">
      <h1 className="text-xl font-bold">inventory control</h1>
      <NavbarLinks />
      <div className="flex items-center justify-center gap-x-4">
        <ModeToggle />
        <Separator orientation="vertical" className="h-6" />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
