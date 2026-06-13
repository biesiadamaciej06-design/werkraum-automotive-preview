import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-premium" />

      <section className="section-shell relative z-10 py-16 sm:py-20">
        <div className="mb-10">
          <Link href="/" className="cta-secondary">
            Zur Startseite
          </Link>
        </div>

        <div className="glass-panel rounded-[36px] px-6 py-10 sm:px-10 sm:py-14">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <span className="eyebrow">Rechtliches</span>
              <h1 className="section-title">Impressum</h1>
              <p className="text-base leading-8 text-white/66">
                Diese Seite ist als Platzhalter vorbereitet. Tragen Sie hier die rechtlich
                erforderlichen Angaben zu Ihrem Unternehmen ein.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Firmenname / Betreiber",
                "Anschrift",
                "Telefonnummer",
                "E-Mail-Adresse",
                "UID-Nummer / Firmenbuchnummer",
                "Aufsichtsbehörde / Kammer",
              ].map((item) => (
                <div key={item} className="glass-panel rounded-[24px] px-5 py-5">
                  <p className="text-sm text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
