import Link from 'next/link'
import { popularBanks, bankSlug } from '@/lib/banks'
import { BankTile } from '@/components/bank-tile'

export function PopularBanks() {
  return (
    <section aria-labelledby="popular-heading" className="mt-6">
      <div className="flex items-center justify-between">
        <h2 id="popular-heading" className="text-lg font-bold tracking-tight">
          Popular Banks
        </h2>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Top {popularBanks.length}
        </span>
      </div>

      <ul
        className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="animate-marquee flex w-max gap-3 px-4 py-1">
          {loop.map((bank, i) => {
            const isClone = i >= popularBanks.length
            return (
              <li key={`${bank.name}-${i}`} aria-hidden={isClone}>
                <Link
                  href={`/bank/${bankSlug(bank.name)}`}
                  tabIndex={isClone ? -1 : undefined}
                  prefetch
                  className="flex min-w-[7.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-center shadow-sm transition-all duration-100 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.96] active:border-primary/40 active:bg-secondary/60"
                >
                  <BankLogo bank={bank} size="lg" />
                  <span className="text-sm font-semibold">{bank.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {bank.category}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
