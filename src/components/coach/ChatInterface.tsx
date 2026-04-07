'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Globe } from 'lucide-react'
import clsx from 'clsx'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const WELCOME_EN = "Hey! I'm your FitSquad AI Coach. I'm here to push you, motivate you, and hold you accountable. What's your goal today? 💪"
const WELCOME_AR = "مرحباً! أنا مدربك في FitSquad AI. أنا هنا لأدفعك وأحفزك وأحاسبك. ما هو هدفك اليوم؟ 💪"

const MAX_CHAT_HISTORY = 10

export default function ChatInterface() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: WELCOME_EN, timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en'
    setLanguage(newLang)
    setMessages([{ id: '0', role: 'assistant', content: newLang === 'ar' ? WELCOME_AR : WELCOME_EN, timestamp: new Date() }])
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    const history = messages.slice(-MAX_CHAT_HISTORY).map(m => ({ role: m.role, content: m.content }))

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, language, history }),
      })

      const data = await res.json() as { message?: string }
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message ?? 'Sorry, I could not process that.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'ar' ? 'عذراً، حدث خطأ. حاول مرة أخرى.' : 'Sorry, something went wrong. Try again!',
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isRtl = language === 'ar'

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] animate-fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7B2FBE] to-[#FF6B35] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white">{isRtl ? 'المدرب الذكي' : 'AI Coach'}</h1>
            <p className="text-xs text-[#00D68F]">● {isRtl ? 'متاح الآن' : 'Online'}</p>
          </div>
        </div>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-[#1E1E2E] hover:bg-[#2A2A3E] text-white text-sm font-semibold px-3 py-2 rounded-xl transition-all"
        >
          <Globe className="w-4 h-4" />
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={clsx(
              'flex gap-3 animate-slide-up',
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <div className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
              message.role === 'assistant'
                ? 'bg-gradient-to-br from-[#7B2FBE] to-[#FF6B35]'
                : 'bg-[#1E1E2E]'
            )}>
              {message.role === 'assistant'
                ? <Bot className="w-4 h-4 text-white" />
                : <User className="w-4 h-4 text-gray-300" />
              }
            </div>
            <div className={clsx(
              'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              message.role === 'assistant'
                ? 'bg-[#13131A] border border-[#1E1E2E] text-white'
                : 'bg-[#FF6B35] text-white'
            )}>
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FBE] to-[#FF6B35] flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3 items-end mt-auto pt-4 border-t border-[#1E1E2E]">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isRtl ? 'اسأل مدربك أي شيء...' : 'Ask your coach anything...'}
          rows={1}
          className="flex-1 bg-[#13131A] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] resize-none transition-colors text-sm"
          style={{ direction: isRtl ? 'rtl' : 'ltr' }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="bg-[#FF6B35] hover:bg-[#FF8C5A] disabled:opacity-40 text-white p-3 rounded-xl transition-all active:scale-95 flex-shrink-0"
        >
          <Send className={clsx('w-5 h-5', isRtl && 'rotate-180')} />
        </button>
      </div>
    </div>
  )
}
