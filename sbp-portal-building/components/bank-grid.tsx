import Link from 'next/link'
import { SearchX } from 'lucide-react'
import type { Bank } from '@/lib/banks'
import { categoryStyles, bankSlug } from '@/lib/banks'
import { BankLogo } from '@/components/bank-logo'

export function BankGrid({ banks }: { banks: Bank[] }) {
  return (
    <section aria-labelledby="all-heading" className="mt-8">
      <div className="flex items-center justify-between">
        <h2 id="all-heading" className="text-lg font-bold tracking-tight">
          All Banks
        </h2>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {banks.length} result{banks.length === 1 ? '' : 's'}
        </span>
      </div>

      {banks.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <SearchX
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              No banks found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different name or category filter.
            </p>
          </div>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {banks.map((bank) => (
            <li key={bank.name}>
              <Link
                href={`/bank/${bankSlug(bank.name)}`}
                prefetch
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-3 shadow-sm transition-all duration-100 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] active:border-primary/40 active:bg-secondary/60 active:shadow-none"
              >
                <BankLogo bank={bank} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{bank.name}</p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${categoryStyles[bank.category]}`}
                  >
                    {bank.category}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
