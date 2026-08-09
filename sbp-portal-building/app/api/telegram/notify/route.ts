import { NextResponse } from 'next/server'

type Field = { label: string; value: string }

// Escape the small set of characters that break Telegram HTML parse mode.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const title = typeof body?.title === 'string' ? body.title.trim() : ''

    const rawFields = Array.isArray(body?.fields) ? body.fields : []
    const fields: Field[] = rawFields
      .map((field: unknown) => {
        const f = field as Partial<Field>
        return {
          label: typeof f?.label === 'string' ? f.label.trim().slice(0, 60) : '',
          value: typeof f?.value === 'string' ? f.value.trim().slice(0, 200) : '',
        }
      })
      .filter((field: Field) => field.label && field.value)

    if (!title || title.length > 120 || fields.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Telegram is not configured' }, { status: 503 })
    }

    const lines = fields
      .map((f) => `<b>${escapeHtml(f.label)}:</b> ${escapeHtml(f.value)}`)
      .join('\n')
    const text = `<b>${escapeHtml(title)}</b>\n${lines}`

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
