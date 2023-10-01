export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
      {children}
    </div>
  )
}
