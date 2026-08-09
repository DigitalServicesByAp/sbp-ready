import { Globe } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-primary/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/state-bank-of-pakistan.png"
              alt="State Bank of Pakistan logo"
              className="h-full w-full object-contain p-0.5"
            />
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-bold uppercase tracking-wide">
              State Bank of Pakistan
            </span>
            <span className="text-xs text-muted-foreground">Bank Directory</span>
          </div>
        </div>
        <a
          href="https://www.sbp.org.pk"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:underline"
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          www.sbp.org.pk
        </a>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          {'\u00A9'} 2026 Bank Directory. Informational reference only {'\u2014'}{' '}
          not an official verification portal and not affiliated with any bank.
        </p>
      </div>
    </footer>
  )
}
