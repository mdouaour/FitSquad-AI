import { redirect } from 'next/navigation'

export default async function HomePage() {
  const hasSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  if (!hasSupabase) {
    redirect('/dashboard')
  }

  redirect('/auth')
}
