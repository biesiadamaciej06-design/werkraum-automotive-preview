import Link from "next/link";
import { contactConfig } from "@/lib/contact";

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
                Informationen gemäß § 5 E-Commerce-Gesetz und Offenlegung gemäß § 25 Mediengesetz.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                `Betreiber und Medieninhaber: ${contactConfig.owner}`,
                `Geschäftsbezeichnung: ${contactConfig.businessName}`,
                `Anschrift: ${contactConfig.streetAddress}, ${contactConfig.postalCode} ${contactConfig.city}, ${contactConfig.country}`,
                `E-Mail: ${contactConfig.inquiryEmail}`,
                "Unternehmensgegenstand: Vorbereitung eines Betriebs für Fahrzeugservice, Wartung, Diagnose und Fahrzeugpflege",
                "Grundlegende Richtung der Website: Information über das geplante Leistungsangebot von Werksraum Automotive",
              ].map((item) => (
                <div key={item} className="glass-panel rounded-[24px] px-5 py-5">
                  <p className="text-sm text-white/78">{item}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-white/10 pt-8 text-sm leading-7 text-white/66">
              <p>
                Werksraum Automotive befindet sich in der Gründungs- und Vorbereitungsphase. Eine
                Gesellschaft mit beschränkter Haftung ist derzeit nicht im Firmenbuch eingetragen.
              </p>
              <p>
                Firmenbuchnummer, UID-Nummer und gewerberechtliche Angaben werden ergänzt, sobald
                diese vorliegen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
