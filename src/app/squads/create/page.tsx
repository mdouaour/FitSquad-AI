'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Users } from 'lucide-react'
import Button from '@/components/ui/Button'

function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'FIT-'
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export default function CreateSquadPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [created, setCreated] = useState(false)
  const [inviteCode, setInviteCode] = useState('')
  const [copied, setCopied] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    const code = generateInviteCode()
    setInviteCode(code)
    setCreated(true)
  }

  function handleCopy() {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (created) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#00D68F]/20 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-[#00D68F]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Squad Created!</h2>
          <p className="text-gray-400 mb-6">
            Share this invite code with your friends:
          </p>

          <div className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl p-4 mb-6">
            <p className="text-3xl font-bold text-white tracking-[0.2em] font-mono mb-3">
              {inviteCode}
            </p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-sm text-[#FF6B35] hover:text-[#FF8C5A] transition-colors font-semibold"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy invite link'}
            </button>
          </div>

          <Link href="/squads">
            <Button variant="primary" size="lg" className="w-full">
              Go to My Squads
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link
          href="/squads"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Squads
        </Link>

        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <h1 className="text-xl font-bold text-white">Create Squad</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">
                Squad Name <span className="text-[#FF6B35]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Warrior Squad"
                maxLength={50}
                className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">
                Description <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A squad for morning warriors who never skip..."
                maxLength={200}
                rows={3}
                className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!name.trim()}
            >
              Create Squad
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
