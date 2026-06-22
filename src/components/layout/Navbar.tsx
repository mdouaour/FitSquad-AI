'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Map, Users, Trophy, Bot, Zap } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tracks', label: 'Tracks', icon: Map },
  { href: '/squads', label: 'Squads', icon: Users },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/coach', label: 'AI Coach', icon: Bot },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#13131A] border-r border-[#1E1E2E] flex-col p-6 z-40">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#7B2FBE] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-lg leading-tight">FitSquad</div>
            <div className="text-xs text-gray-500">AI Fitness</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30'
                    : 'text-gray-400 hover:text-white hover:bg-[#1E1E2E]'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-[#1E1E2E]">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#7B2FBE] flex items-center justify-center text-white font-bold text-sm">
              W
            </div>
            <div>
              <div className="text-sm font-medium text-white">warrior_42</div>
              <div className="text-xs text-gray-500">Level 8 · 750 XP</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#13131A] border-t border-[#1E1E2E] z-40 px-2">
        <div className="flex items-center justify-around">
          {navItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex flex-col items-center gap-1 px-3 py-3 rounded-xl transition-all duration-200 min-w-0',
                  active ? 'text-[#FF6B35]' : 'text-gray-500 hover:text-gray-300'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
