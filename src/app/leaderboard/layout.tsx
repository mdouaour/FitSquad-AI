import Navbar from '@/components/layout/Navbar'

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <main className="pb-20 md:pb-0 md:pl-64">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
