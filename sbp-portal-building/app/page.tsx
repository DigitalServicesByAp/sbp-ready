'use client'

import { useMemo, useState } from 'react'
import { banks, type Category } from '@/lib/banks'
import { SiteHeader } from '@/components/site-header'
import { PopularBanks } from '@/components/popular-banks'
import { BankGrid } from '@/components/bank-grid'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return banks.filter((bank) => {
      const matchesQuery = !q || bank.name.toLowerCase().includes(q)
      const matchesCategory =
        activeCategory === 'All' || bank.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [query, activeCategory])

  const isFiltering = query.trim().length > 0 || activeCategory !== 'All'

  return (
    <main className="min-h-dvh">
      <SiteHeader
        query={query}
        onQueryChange={setQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="mx-auto max-w-5xl px-4">
        {!isFiltering && <PopularBanks />}

        <BankGrid banks={filtered} />
      </div>

      <SiteFooter />
    </main>
  )
}
