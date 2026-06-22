'use client'

import { useState } from 'react'
import { Settings, LogOut, Shield, X } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Squad, SquadMember } from '@/types'

interface SquadSettingsProps {
  squad: Squad
  members: SquadMember[]
  onUpdate: (data: Partial<Squad>) => void
  onLeave: () => void
}

export default function SquadSettings({ squad, members, onUpdate, onLeave }: SquadSettingsProps) {
  const [name, setName] = useState(squad.name)
  const [description, setDescription] = useState(squad.description || '')
  const [isDirty, setIsDirty] = useState(false)

  const isAdmin = squad.created_by === members.find(m => m.role === 'admin')?.user_id
  const adminMembers = members.filter(m => m.role === 'admin')

  const handleSave = () => {
    onUpdate({ name: name.trim(), description: description.trim() || null })
    setIsDirty(false)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setIsDirty(true)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    setIsDirty(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1E1E2E] flex items-center justify-center">
          <Settings className="w-5 h-5 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Squad Settings</h3>
      </div>

      {/* Squad Info */}
      <Card className="p-5 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5 font-medium">Squad Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            maxLength={50}
            className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 font-medium">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={200}
            rows={3}
            className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
          />
        </div>

        {isDirty && (
          <button
            onClick={handleSave}
            className="w-full bg-[#FF6B35] hover:bg-[#FF8C5A] text-white font-semibold py-3 rounded-xl transition-all duration-200"
          >
            Save Changes
          </button>
        )}
      </Card>

      {/* Admins */}
      <div>
        <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Admins
        </h4>
        <div className="space-y-2">
          {adminMembers.map(member => (
            <Card key={member.id} className="p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7B2FBE] to-[#9B4FDE] flex items-center justify-center text-white font-bold text-xs">
                {member.full_name?.[0] || member.username?.[0] || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">
                  {member.full_name || member.username || 'Unknown'}
                </div>
              </div>
              <Shield className="w-4 h-4 text-[#7B2FBE]" />
            </Card>
          ))}
        </div>
      </div>

      {/* Leave Squad */}
      <div className="pt-4 border-t border-[#1E1E2E]">
        <p className="text-sm text-gray-500 mb-3">
          Once you leave a squad, you&apos;ll need a new invite to rejoin.
        </p>
        <button
          onClick={onLeave}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-semibold py-3 rounded-xl transition-all duration-200 border border-red-500/20 hover:border-red-500/30"
        >
          <LogOut className="w-4 h-4" />
          Leave Squad
        </button>
      </div>
    </div>
  )
}
