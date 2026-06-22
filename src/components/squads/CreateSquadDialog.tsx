'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface CreateSquadDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: { name: string; description: string }) => void
}

export default function CreateSquadDialog({ isOpen, onClose, onCreate }: CreateSquadDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onCreate({ name: name.trim(), description: description.trim() })
    setName('')
    setDescription('')
    onClose()
  }

  const handleClose = () => {
    setName('')
    setDescription('')
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
          <h3 className="text-xl font-bold text-white">Create Squad</h3>
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
              Squad Name <span className="text-[#FF6B35]">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
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
              onChange={e => setDescription(e.target.value)}
              placeholder="A squad for morning warriors who never skip..."
              maxLength={200}
              rows={3}
              className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
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
              disabled={!name.trim()}
              className="flex-1 bg-[#FF6B35] hover:bg-[#FF8C5A] text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
