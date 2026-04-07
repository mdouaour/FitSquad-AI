'use client'

import { Globe } from 'lucide-react'

interface LanguageSwitcherProps {
  language: 'en' | 'ar'
  onChange: (lang: 'en' | 'ar') => void
}

export default function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  return (
    <button
      onClick={() => onChange(language === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-2 bg-[#1E1E2E] hover:bg-[#2A2A3E] text-white text-sm font-semibold px-3 py-2 rounded-xl transition-all"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  )
}
