import { useMemo, useState } from 'react'
import { ArrowLeftRight, Calculator } from 'lucide-react'

/* ---------- EMI ---------- */
function EmiCalculator() {
  const [loan, setLoan] = useState(30) // lakh
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)

  const { emi, totalInterest, total } = useMemo(() => {
    const p = loan * 100000
    const r = rate / 1200
    const n = years * 12
    if (r === 0) {
      const e = p / n
      return { emi: e, totalInterest: 0, total: p }
    }
    const pow = Math.pow(1 + r, n)
    const e = (p * r * pow) / (pow - 1)
    return { emi: e, totalInterest: e * n - p, total: e * n }
  }, [loan, rate, years])

  const fmt = (v: number) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(v))

  const principalPct = total > 0 ? Math.round(((loan * 100000) / total) * 100) : 0

  return (
    <div>
      <div className="space-y-7">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="emi-loan" className="text-sm font-semibold text-[var(--paper)]">
              Loan Amount
            </label>
            <span className="font-mono2 text-lg font-bold text-[var(--yellow)]">₹ {loan} Lakh</span>
          </div>
          <input
            id="emi-loan"
            type="range"
            min={5}
            max={300}
            step={5}
            value={loan}
            onChange={(e) => setLoan(Number(e.target.value))}
            className="range-yellow mt-3 w-full"
          />
          <div className="mt-1 flex justify-between font-mono2 text-[11px] text-[var(--paper-faint)]">
            <span>₹5L</span>
            <span>₹3 Cr</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="emi-rate" className="text-sm font-semibold text-[var(--paper)]">
              Interest Rate
            </label>
            <span className="font-mono2 text-lg font-bold text-[var(--yellow)]">{rate.toFixed(1)}% p.a.</span>
          </div>
          <input
            id="emi-rate"
            type="range"
            min={6}
            max={14}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="range-yellow mt-3 w-full"
          />
          <div className="mt-1 flex justify-between font-mono2 text-[11px] text-[var(--paper-faint)]">
            <span>6%</span>
            <span>14%</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="emi-years" className="text-sm font-semibold text-[var(--paper)]">
              Tenure
            </label>
            <span className="font-mono2 text-lg font-bold text-[var(--yellow)]">{years} years</span>
          </div>
          <input
            id="emi-years"
            type="range"
            min={1}
            max={30}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="range-yellow mt-3 w-full"
          />
          <div className="mt-1 flex justify-between font-mono2 text-[11px] text-[var(--paper-faint)]">
            <span>1 yr</span>
            <span>30 yrs</span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border hairline bg-[var(--ink)] p-5">
        <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[var(--paper-faint)]">Monthly EMI</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight text-[var(--yellow)]">₹ {fmt(emi)}</p>
        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-[var(--ink-3)]" aria-hidden>
          <div className="h-full bg-[var(--red)] transition-all duration-500" style={{ width: `${principalPct}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="flex items-center gap-1.5 text-[var(--paper-dim)]">
              <span className="h-2 w-2 rounded-full bg-[var(--red)]" aria-hidden /> Principal
            </p>
            <p className="font-mono2 mt-0.5 font-bold text-[var(--paper)]">₹ {fmt(loan * 100000)}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[var(--paper-dim)]">
              <span className="h-2 w-2 rounded-full bg-[var(--ink-3)]" aria-hidden /> Total Interest
            </p>
            <p className="font-mono2 mt-0.5 font-bold text-[var(--paper)]">₹ {fmt(totalInterest)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Area converter ---------- */
const UNITS = [
  { key: 'sqft', label: 'Sq. Ft', perGaj: 9 },
  { key: 'gaj', label: 'Gaj / Sq. Yard', perGaj: 1 },
  { key: 'sqm', label: 'Sq. Metre', perGaj: 0.836127 },
  { key: 'marla', label: 'Marla', perGaj: 0.0330579 },
  { key: 'kanal', label: 'Kanal', perGaj: 0.00165344 },
] as const

function AreaConverter() {
  const [value, setValue] = useState('100')
  const [from, setFrom] = useState<(typeof UNITS)[number]['key']>('gaj')
  const num = parseFloat(value) || 0
  const fromUnit = UNITS.find((u) => u.key === from)!
  const gaj = num / fromUnit.perGaj

  const fmt = (v: number) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: v >= 100 ? 1 : 2 }).format(v)

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="area-val" className="text-sm font-semibold text-[var(--paper)]">
            Enter Area
          </label>
          <input
            id="area-val"
            type="number"
            min={0}
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 min-h-12 w-full rounded-md border hairline bg-[var(--ink)] px-4 font-mono2 text-lg font-bold text-[var(--yellow)] outline-none focus:border-[var(--yellow)]"
          />
        </div>
        <div>
          <label htmlFor="area-unit" className="text-sm font-semibold text-[var(--paper)]">
            Unit
          </label>
          <select
            id="area-unit"
            value={from}
            onChange={(e) => setFrom(e.target.value as typeof from)}
            className="mt-2 min-h-12 w-full rounded-md border hairline bg-[var(--ink)] px-4 font-mono2 text-sm font-bold text-[var(--paper)] outline-none focus:border-[var(--yellow)] sm:w-auto"
          >
            {UNITS.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 divide-y divide-[var(--line)] rounded-lg border hairline bg-[var(--ink)]">
        {UNITS.map((u) => {
          const converted = gaj * u.perGaj
          const active = u.key === from
          return (
            <div key={u.key} className={`flex items-center justify-between px-5 py-3.5 ${active ? 'bg-[var(--ink-3)]' : ''}`}>
              <span className={`font-mono2 text-xs uppercase tracking-wider ${active ? 'text-[var(--yellow)]' : 'text-[var(--paper-dim)]'}`}>
                {u.label}
              </span>
              <span className={`font-mono2 text-lg font-bold ${active ? 'text-[var(--yellow)]' : 'text-[var(--paper)]'}`}>
                {fmt(converted)}
              </span>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-[var(--paper-faint)]">
        Delhi dealing standard: 1 Gaj = 1 Sq. Yard = 9 Sq. Ft. Marla &amp; Kanal as per standard revenue measure.
      </p>
    </div>
  )
}

export default function Tools() {
  const [tab, setTab] = useState<'emi' | 'area'>('emi')

  return (
    <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
      <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">03 / Buyer tools</p>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="reveal max-w-[20ch] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 }}>
          Plan before you <span className="text-[var(--yellow)]">shake hands.</span>
        </h2>
        <p className="reveal max-w-[46ch] text-[var(--paper-dim)]" style={{ ['--i' as string]: 2 }}>
          Free calculators — check your home-loan EMI and convert gaj, sq ft and marla instantly.
        </p>
      </div>

      <div className="reveal mt-12 rounded-xl border hairline bg-[var(--ink-2)] p-6 sm:p-9" style={{ ['--i' as string]: 2 }}>
        <div className="flex gap-2.5" role="tablist" aria-label="Calculator selection">
          {(
            [
              { key: 'emi', label: 'EMI Calculator', icon: Calculator },
              { key: 'area', label: 'Area Converter', icon: ArrowLeftRight },
            ] as const
          ).map((t) => {
            const active = tab === t.key
            const Icon = t.icon
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className={`flex min-h-11 items-center gap-2 rounded-md border px-4 font-mono2 text-sm font-bold uppercase tracking-wider transition-all sm:px-5 ${
                  active
                    ? 'border-[var(--yellow)] bg-[var(--yellow)] text-[var(--ink)]'
                    : 'hairline text-[var(--paper-dim)] hover:border-[var(--yellow)] hover:text-[var(--yellow)]'
                }`}
              >
                <Icon size={16} aria-hidden />
                {t.label}
              </button>
            )
          })}
        </div>
        <div className="mt-8">{tab === 'emi' ? <EmiCalculator /> : <AreaConverter />}</div>
      </div>
    </section>
  )
}
