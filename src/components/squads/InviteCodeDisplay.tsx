'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import clsx from 'clsx'
import Card from '@/components/ui/Card'

interface InviteCodeDisplayProps {
  inviteCode: string
}

export default function InviteCodeDisplay({ inviteCode }: InviteCodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-5">
      <p className="text-sm text-gray-400 mb-3 font-medium">Invite Code</p>
      <div className="border-2 border-dashed border-[#1E1E2E] rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-2xl font-bold text-white tracking-widest select-all">
            {inviteCode}
          </span>
          <button
            onClick={handleCopy}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 shrink-0',
              copied
                ? 'bg-[#00D68F]/20 text-[#00D68F]'
                : 'bg-[#1E1E2E] hover:bg-[#2A2A3E] text-gray-300 hover:text-white'
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  )
}
