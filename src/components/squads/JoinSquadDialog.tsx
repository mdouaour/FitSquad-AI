'use client'

import { useState } from 'react'
import { X, UserPlus } from 'lucide-react'

interface JoinSquadDialogProps {
  isOpen: boolean
  onClose: () => void
  onJoin: (code: string) => void
}

export default function JoinSquadDialog({ isOpen, onClose, onJoin }: JoinSquadDialogProps) {
  const [code, setCode] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    onJoin(code.trim().toUpperCase())
    setCode('')
    onClose()
  }

  const handleClose = () => {
    setCode('')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-6 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7B2FBE]/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[#7B2FBE]" />
            </div>
            <h3 className="text-xl font-bold text-white">Join Squad</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-[#1E1E2E] hover:bg-[#2A2A3E] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5 font-medium">
              Invite Code
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="ABCD12"
              maxLength={10}
              className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7B2FBE] transition-colors uppercase tracking-widest font-mono text-center text-lg"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-[#1E1E2E] hover:bg-[#2A2A3E] text-white font-semibold py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!code.trim()}
              className="flex-1 bg-[#7B2FBE] hover:bg-[#9B4FDE] text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
