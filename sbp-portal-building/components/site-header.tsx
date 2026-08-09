'use client'

import { Landmark, ShieldCheck, Clock, Search, Menu, Bell, X } from 'lucide-react'
import {
  categories,
  countByCategory,
  banks,
  type Category,
} from '@/lib/banks'

const stats = [
  { value: `${banks.length}`, label: 'Licensed banks', icon: Landmark },
  { value: '5', label: 'Categories', icon: ShieldCheck },
  { value: '24/7', label: 'Reference', icon: Clock },
]

type Filter = Category | 'All'

export function SiteHeader({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
  activeCategory: Filter
  onCategoryChange: (value: Filter) => void
}) {
  const filters: { label: Filter; count: number }[] = [
    { label: 'All', count: banks.length },
    ...categories.map((c) => ({ label: c as Filter, count: countByCategory(c) })),
  ]

  return (
    <header>
      {/* Top nav bar */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-100 hover:bg-secondary active:bg-secondary active:scale-90"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-primary/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/state-bank-of-pakistan.png"
                alt="State Bank of Pakistan logo"
                className="h-full w-full object-contain p-0.5"
              />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold uppercase tracking-tight text-primary">
                State Bank
                <span className="block text-[0.7rem] font-semibold text-muted-foreground">
                  of Pakistan
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-100 hover:bg-secondary active:bg-secondary active:scale-90"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
          </button>
        </div>
      </div>

      {/* Green hero block */}
      <div
        className="relative overflow-hidden text-primary-foreground"
        style={{
          backgroundImage:
            'linear-gradient(160deg, var(--primary) 0%, var(--primary-dark) 100%)',
        }}
      >
        {/* subtle decorative ring, purposeful brand motif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-primary-foreground/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full border border-primary-foreground/10"
        />

        <div className="relative mx-auto max-w-5xl px-4 pb-8 pt-6">
          <div className="flex items-center gap-2">
            <span
              dir="rtl"
              lang="ur"
              style={{
                fontFamily:
                  'var(--font-urdu), "Jameel Noori Nastaleeq", "Segoe UI", Tahoma, sans-serif',
              }}
              className="text-xs leading-relaxed text-primary-foreground/70"
            >
              بینک دولت پاکستان
            </span>
          </div>

          <div className="mt-4 max-w-2xl">
            <p className="text-sm font-medium text-primary-foreground/80">
              Welcome to the SBP Bank Directory
            </p>
            <h1 className="mt-1 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Pakistan Bank Directory
            </h1>
            <p className="mt-2 text-pretty text-primary-foreground/80">
              Browse licensed banks operating in Pakistan. A reference directory
              built for a college project.
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-primary-foreground/10 px-3 py-3 ring-1 ring-primary-foreground/15"
              >
                <stat.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                <dt className="mt-2 text-lg font-bold leading-none">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-primary-foreground/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-6">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="bank-search" className="sr-only">
              Search your bank
            </label>
            <input
              id="bank-search"
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search your bank..."
              className="w-full rounded-full border-0 bg-card py-3.5 pl-12 pr-11 text-base text-foreground shadow-lg outline-none ring-2 ring-transparent transition focus:ring-accent"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors duration-100 hover:bg-secondary active:bg-secondary active:scale-90"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category filter chips */}
          <div
            className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter banks by category"
          >
            {filters.map((filter) => {
              const active = activeCategory === filter.label
              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => onCategoryChange(filter.label)}
                  aria-pressed={active}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-100 active:scale-95 ${
                    active
                      ? 'bg-card text-primary shadow-sm'
                      : 'bg-primary-foreground/10 text-primary-foreground ring-1 ring-inset ring-primary-foreground/20 hover:bg-primary-foreground/15 active:bg-primary-foreground/20'
                  }`}
                >
                  {filter.label}
                  <span
                    className={`rounded-full px-1.5 text-[0.7rem] font-bold ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'bg-primary-foreground/15 text-primary-foreground/80'
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
