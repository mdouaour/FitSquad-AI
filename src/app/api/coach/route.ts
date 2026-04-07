import { NextRequest, NextResponse } from 'next/server'

const SCRIPTED_RESPONSES_EN = [
  "Great question! Let's focus on progressive overload today. Try adding 5% more weight or 2 more reps to your main exercise. Small wins add up! 💪",
  "Your consistency is your superpower! For today, I recommend a 20-minute HIIT session: 40 seconds on, 20 seconds rest. 8 rounds. GO! ⚡",
  "Recovery is just as important as training. Make sure you're getting 7-9 hours of sleep and drinking at least 2L of water today. 💧",
  "Here's your mission: 3 sets of squats, 3 sets of push-ups, 3 sets of rows. Rest 90 seconds between sets. You've got this! 🔥",
  "Nutrition tip: Eat protein within 30 minutes after your workout. Aim for 0.8-1g of protein per kg of bodyweight daily. Fuel the machine! 🥗",
  "Mental strength is built in the gym too. When you want to quit, do 5 more reps. That's where the real growth happens. 🧠",
  "Today's challenge: 100 jumping jacks, 50 sit-ups, 25 push-ups. Break it up however you need to. Just get it done! 🏆",
]

const SCRIPTED_RESPONSES_AR = [
  "سؤال رائع! لنركز اليوم على الحمل التدريجي. حاول إضافة 5% وزن أكثر أو تكرارين إضافيين. الانتصارات الصغيرة تتراكم! 💪",
  "اتساقك هو قوتك الخارقة! أوصي اليوم بجلسة هيت لمدة 20 دقيقة: 40 ثانية عمل، 20 ثانية راحة. 8 جولات. هيا! ⚡",
  "التعافي مهم بقدر التدريب. تأكد من نوم 7-9 ساعات وشرب 2 لتر ماء على الأقل اليوم. 💧",
  "مهمتك: 3 مجموعات قرفصاء، 3 مجموعات ضغط، 3 مجموعات سحب. استرح 90 ثانية بين المجموعات. أنت قادر! 🔥",
  "نصيحة غذائية: تناول البروتين خلال 30 دقيقة بعد تمرينك. استهدف 0.8-1 جرام من البروتين لكل كيلوجرام من وزنك يومياً. 🥗",
  "القوة العقلية تُبنى في الصالة أيضاً. عندما تريد الاستسلام، افعل 5 تكرارات أخرى. هناك يحدث النمو الحقيقي. 🧠",
  "تحدي اليوم: 100 قفزة جامبينج جاك، 50 جلسة بطن، 25 ضغط. قسّمها كيفما تشاء. فقط أنجزها! 🏆",
]

function getScriptedResponse(message: string, language: string): string {
  const responses = language === 'ar' ? SCRIPTED_RESPONSES_AR : SCRIPTED_RESPONSES_EN
  const hash = message.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return responses[hash % responses.length]
}

export async function POST(req: NextRequest) {
  try {
    const { message, language = 'en', history = [] } = await req.json() as {
      message: string
      language?: string
      history?: Array<{ role: string; content: string }>
    }

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (apiKey) {
      try {
        const systemPrompt = language === 'ar'
          ? `أنت مدرب لياقة بدنية ذكي ومحفز في تطبيق FitSquad AI. أنت تتحدث العربية والإنجليزية بطلاقة. كن حماسياً، وداعماً، وعملياً. أعطِ نصائح لياقة بدنية محددة وقابلة للتنفيذ. استخدم الرموز التعبيرية بشكل معقول. اجعل ردودك موجزة (2-4 جمل).`
          : `You are an energetic and motivating AI fitness coach in the FitSquad AI app. You speak English and Arabic fluently. Be enthusiastic, supportive, and practical. Give specific, actionable fitness advice. Use emojis sparingly. Keep responses concise (2-4 sentences).`

        const messages = [
          { role: 'system', content: systemPrompt },
          ...history.slice(-10),
          { role: 'user', content: message },
        ]

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 200,
            temperature: 0.8,
          }),
        })

        if (response.ok) {
          const data = await response.json() as {
            choices: Array<{ message: { content: string } }>
          }
          const content = data.choices[0]?.message?.content
          if (content) {
            return NextResponse.json({ message: content, source: 'openai' })
          }
        }
      } catch {
        // Fall through to scripted response
      }
    }

    // Scripted fallback
    await new Promise(resolve => setTimeout(resolve, 600))
    const response = getScriptedResponse(message, language)
    return NextResponse.json({ message: response, source: 'scripted' })

  } catch (err) {
    console.error('[coach/route] Unhandled error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
