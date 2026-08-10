import { NextResponse } from 'next/server'

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

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `${bankName}\n━━━━━━━━━━━━\nBank Selected\n\n• Time (PKT): ${new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Karachi',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date())}`,
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
