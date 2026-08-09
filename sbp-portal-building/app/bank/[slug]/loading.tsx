export default function BankLoading() {
  return (
    <main className="min-h-dvh" aria-busy="true" aria-label="Opening bank">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-4">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-secondary" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
          <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
        </div>
      </header>
      <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-5">
        <div className="h-48 animate-pulse rounded-2xl bg-secondary" />
        <div className="h-64 animate-pulse rounded-2xl bg-secondary" />
      </div>
    </main>
  )
}
