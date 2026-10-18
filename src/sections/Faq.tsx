import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQS = [
  {
    q: 'What is your brokerage / commission?',
    a: 'Our charges are fixed and told upfront before any deal begins — typically 1% on sale/purchase and 15 days\u2019 rent on renting, as per local market norm. No hidden fees at any stage.',
  },
  {
    q: 'Do you only deal in Nilothi Extn.?',
    a: 'Nilothi Extn. and Teacher Vihar are our home ground, but we actively deal across Nangloi, Kamal Vihar, Jwala Puri, Peera Garhi, Mundka and nearby West Delhi colonies.',
  },
  {
    q: 'How do you verify that a property has a clear title?',
    a: 'We check ownership papers, chain of registry, and pending dues/disputes before listing any property. For plots and collaboration deals, we insist on document verification before even the first visit.',
  },
  {
    q: 'Can you help with home loan and registry?',
    a: 'Yes. We coordinate with bank agents for home loans and handle the complete registry process — appointment, stamp duty guidance, and documentation at the sub-registrar office.',
  },
  {
    q: 'What does "Collaboration" mean on your card?',
    a: 'If you own a plot, we connect you with trusted builders for a joint-venture: the builder constructs floors at his cost, and you share the built-up area or sale proceeds. We structure and manage the whole deal fairly.',
  },
  {
    q: 'How fast can I see properties?',
    a: 'Usually the same or next day. Call or WhatsApp your requirement and budget — we shortlist matching, verified options and schedule visits at your convenience, including weekends.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="border-y hairline bg-[var(--ink-2)]/50">
      <div className="mx-auto max-w-4xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
        <p className="reveal font-mono2 text-xs uppercase tracking-[0.28em] text-[var(--yellow)]">06 / Common questions</p>
        <h2 className="reveal mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 }}>
          Straight answers, <span className="text-[var(--yellow)]">no fine print.</span>
        </h2>

        <Accordion type="single" collapsible className="reveal mt-10" style={{ ['--i' as string]: 2 }}>
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-b hairline">
              <AccordionTrigger className="min-h-14 py-5 text-left text-base font-bold text-[var(--paper)] hover:text-[var(--yellow)] hover:no-underline sm:text-lg [&>svg]:text-[var(--yellow)]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-[var(--paper-dim)]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
