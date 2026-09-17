import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";
import { SiteHeader } from "@/components/site-header";
import { buildMailtoHref, contactConfig } from "@/lib/contact";

const withBasePath = (path: string) => path;

const credibilityItems = [
  {
    value: "Klare Diagnose",
    text: "Keine überfrachteten Versprechen, sondern nachvollziehbare technische Entscheidungen.",
  },
  {
    value: "Kontrollierte Prozesse",
    text: "Saubere Übergaben, dokumentierte Arbeitsschritte und ein kontrollierter Ablauf.",
  },
  {
    value: "Premium-Erfahrung",
    text: "Vertraut mit Fahrzeugen, bei denen Präzision spürbar wichtiger ist als Tempo im Tagesgeschäft.",
  },
  {
    value: "Direkter Kontakt",
    text: "Kurze Wege, realistische Einschätzungen und persönliche Kommunikation ohne Werkstattfloskeln.",
  },
];

const services = [
  {
    title: "Wartung mit Substanz",
    text: "Servicearbeiten mit Herstellerbezug, aber ohne den anonymen Charakter großer Standardabläufe.",
  },
  {
    title: "Diagnose statt Rätselraten",
    text: "Fehlerbilder werden systematisch eingegrenzt, erklärt und erst dann wirtschaftlich sinnvoll gelöst.",
  },
  {
    title: "Bremsen & Fahrwerk",
    text: "Arbeiten an Komponenten, bei denen Fahrgefühl, Sicherheit und Präzision direkt zusammenhängen.",
  },
  {
    title: "Performance-Upgrades",
    text: "Gezielte technische Maßnahmen für Fahrzeuge, die mehr Charakter brauchen, nicht mehr Lautstärke.",
  },
  {
    title: "Aufbereitung & Präsenz",
    text: "Pflege und visuelle Veredelung mit Blick auf Werterhalt, Materialwirkung und Gesamtauftritt.",
  },
  {
    title: "Umbauten mit Haltung",
    text: "Individuelle Lösungen für Kunden, die technische Qualität höher gewichten als kurzfristige Trends.",
  },
];

const detailItems = [
  "Bremsenservice mit sauberer Dokumentation",
  "Fahrwerksprüfung mit technischem Augenmaß",
  "Montage hochwertiger Komponenten",
  "Kontrollierte Übergabe und transparente Empfehlung",
];

const galleryItems = [
  {
    label: "Servicebereich",
    caption: "Ruhige, klare Arbeitsflächen statt Showroom-Theater.",
    image: withBasePath("/images/hero-premium-porsche-bmw.png"),
  },
  {
    label: "Werkstattatelier",
    caption: "Materialität, Ordnung und Lichtführung schaffen Vertrauen.",
    image: withBasePath("/images/brand-premium-mercedes-bmw.png"),
  },
  {
    label: "Detailarbeit",
    caption: "Die Qualität zeigt sich dort, wo kaum jemand hinschaut.",
    image: withBasePath("/images/service-bmw-brake-detail.png"),
  },
];

const footerLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Fahrzeuge", href: "#fahrzeuge" },
  { label: "Galerie", href: "#galerie" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export default function Home() {
  const mobileInquiryHref = buildMailtoHref({
    to: contactConfig.inquiryEmail,
    subject: "Mobile Anfrage ueber die Website",
    body: "Guten Tag,\n\nich moechte eine Anfrage an Werksraum Automotive stellen.",
  });

  return (
    <main id="top" className="relative overflow-hidden pb-24 md:pb-0">
      <div className="pointer-events-none absolute inset-0 bg-radial-premium" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.06]" />
      <SiteHeader />

      <section className="relative min-h-screen">
        <Image
          src={withBasePath("/images/hero-premium-porsche-bmw.png")}
          alt="Premium Performance Werkstatt"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,8,0.22),rgba(4,5,8,0.8)_58%,rgba(4,5,8,0.97))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(210,184,148,0.2),transparent_30%)]" />

        <div className="section-shell relative z-10 flex min-h-screen items-end py-28 sm:py-32">
          <div className="grid w-full gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <FadeIn className="max-w-4xl space-y-8">
              <span className="eyebrow">Werkstattkultur für Fahrzeuge mit Anspruch</span>
              <div className="space-y-6">
                <p className="max-w-md text-sm uppercase tracking-[0.3em] text-white opacity-50">
                  Österreich · Präzision statt Lautstärke
                </p>
                <h1 className="display-title max-w-4xl">
                  Service für Fahrzeuge, die man nicht beiläufig abgibt.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/70 sm:text-[1.15rem]">
                  Werksraum Automotive verbindet ruhige Werkstattprozesse, saubere Diagnose und ein
                  hochwertiges Umfeld für Porsche, BMW M, Mercedes-AMG und exklusive
                  Performance-Fahrzeuge.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/check-in" className="cta-primary">
                  Check-in starten
                </Link>
                <Link href="#leistungen" className="cta-secondary">
                  Leistungen ansehen
                </Link>
              </div>

              <div className="grid max-w-3xl gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                {[
                  ["Diagnose", "klar kommuniziert"],
                  ["Werkstatt", "kontrolliert organisiert"],
                  ["Betreuung", "persönlich statt anonym"],
                ].map(([title, text]) => (
                  <div key={title} className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.24em] text-champagne opacity-70">{title}</p>
                    <p className="text-sm leading-7 text-white opacity-65">{text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn
              delay={0.15}
              className="border border-white/10 bg-black/35 p-6 backdrop-blur-xl sm:p-8"
              style={{ borderRadius: "2rem 2rem 0.5rem 2rem" }}
            >
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-lg font-semibold uppercase tracking-[0.3em] text-champagne opacity-80">
                    Unsere Haltung
                  </p>
                </div>

                <div className="grid gap-4">
                  {credibilityItems.map((item) => (
                    <div
                      key={item.value}
                      className="border border-white/8 bg-white/[0.03] px-5 py-5"
                      style={{ borderRadius: "1.35rem" }}
                    >
                      <p className="text-sm uppercase tracking-[0.22em] text-white opacity-45">{item.value}</p>
                      <p className="mt-3 text-sm leading-7 text-white opacity-75">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section
        id="leistungen"
        className="section-shell relative z-10 scroll-mt-28 py-24 sm:scroll-mt-32 sm:py-28"
      >
        <FadeIn className="mx-auto max-w-3xl text-center">
          <div className="section-copy">
            <span className="eyebrow">Leistungen</span>
            <h2 className="section-title">Leistungen, die wie Werkstattleistung klingen und nicht wie Werbetext.</h2>
            <p className="text-base leading-8 text-white/64">
              Jede Leistung ist so gedacht, dass sie technisch sauber, wirtschaftlich nachvollziehbar
              und im Umgang mit dem Fahrzeug respektvoll bleibt.
            </p>
          </div>
        </FadeIn>

        <StaggerGroup className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <article className="service-block h-full text-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-white">{service.title}</h3>
                  <p className="leading-7 text-white/64">{service.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section
        id="fahrzeuge"
        className="section-shell relative z-10 scroll-mt-28 py-24 sm:scroll-mt-32 sm:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn className="section-copy">
            <span className="eyebrow">Fahrzeuge</span>
            <h2 className="section-title">Für Marken, bei denen Nuancen wichtiger sind als Schlagworte.</h2>
            <p className="text-base leading-8 text-white/64">
              Werksraum Automotive richtet sich an Fahrzeuge, bei denen Fahrgefühl, Materialqualität
              und technisches Vertrauen im Vordergrund stehen.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <FadeIn className="relative overflow-hidden rounded-[40px] border border-white/10">
            <Image
              src={withBasePath("/images/brand-premium-mercedes-bmw.png")}
              alt="Premium Werkstatt Atelier"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.02),rgba(6,7,10,0.62))]" />
          </FadeIn>

          <FadeIn delay={0.1} className="section-copy">
            <span className="eyebrow">Werkstatt / Atelier</span>
            <h2 className="section-title">Ein Umfeld, das Ruhe ausstrahlt, bevor überhaupt gesprochen wird.</h2>
            <p className="text-base leading-8 text-white/64">
              Materialität, Licht, Ordnung und saubere Übergänge gehören hier nicht zur Deko,
              sondern zum Vertrauensaufbau. Das Ambiente stützt den Qualitätsanspruch, statt ihn
              nur zu behaupten.
            </p>
            <div className="quote-panel">
              <p className="text-sm uppercase tracking-[0.24em] text-champagne opacity-80">Werkstattnotiz</p>
              <p className="mt-4 text-base leading-8 text-white/72">
                Gute Arbeit wirkt selten dramatisch. Sie wirkt selbstverständlich, weil jeder
                Schritt vorbereitet, geprüft und bewusst entschieden wurde.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn className="section-copy">
            <span className="eyebrow">Detail-Service</span>
            <h2 className="section-title">Präzision zeigt sich meistens dort, wo niemand Applaus gibt.</h2>
            <p className="text-base leading-8 text-white/64">
              Genau an diesen Stellen entscheidet sich, ob Arbeit nur ordentlich aussieht oder sich
              später auch wirklich richtig fährt.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {detailItems.map((item, index) => (
                <div key={item} className="detail-tile">
                  <p className="text-xs uppercase tracking-[0.24em] text-white opacity-40">{`0${index + 1}`}</p>
                  <p className="mt-3 text-sm leading-7 text-white opacity-80">{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="relative overflow-hidden rounded-[40px] border border-white/10">
            <Image
              src={withBasePath("/images/service-bmw-brake-detail.png")}
              alt="Detailarbeit an Bremsen und Komponenten"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,8,0.08),rgba(4,5,8,0.72))]" />
          </FadeIn>
        </div>
      </section>

      <section
        id="galerie"
        className="section-shell relative z-10 scroll-mt-28 py-24 sm:scroll-mt-32 sm:py-28"
      >
        <FadeIn className="section-copy">
          <span className="eyebrow">Galerie</span>
          <h2 className="section-title">Keine Stock-Atmosphäre, sondern Bilder mit erkennbarer Haltung.</h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {galleryItems.map((item, index) => (
            <FadeIn
              key={item.label}
              delay={index * 0.08}
              className={`${index === 0 ? "lg:row-span-2" : ""} group relative overflow-hidden rounded-[36px] border border-white/10`}
            >
              <div className="relative min-h-[360px]">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,8,0.02),rgba(4,5,8,0.78))]" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs uppercase tracking-[0.28em] text-champagne opacity-80">{item.label}</p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">{item.caption}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section
        id="ueber-uns"
        className="section-shell relative z-10 scroll-mt-28 py-24 sm:scroll-mt-32 sm:py-28"
      >
        <div className="editorial-frame">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">Über uns</span>
            <h2 className="section-title mt-5">
              Werksraum Automotive steht für ein hochwertiges Maß an Sorgfalt, nicht für Masse.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68">
              Der Anspruch ist schlicht: Fahrzeuge mit Respekt behandeln, technische Entscheidungen
              sauber treffen und einen Auftritt schaffen, der diese Haltung sichtbar macht. Nicht
              protzig, sondern präzise.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24 sm:py-28">
        <FadeIn className="cta-stage">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,184,148,0.2),transparent_34%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <span className="eyebrow">Termin anfragen</span>
              <h2 className="section-title">Wenn ein Fahrzeug richtig betreut werden soll, beginnt es mit einem guten Erstgespräch.</h2>
              <p className="text-base leading-8 text-white/68">
                Senden Sie uns Modell, Ausgangslage und Wunschleistung. Wir antworten nicht mit
                Marketingtext, sondern mit einer realistischen Einschätzung.
              </p>
            </div>
            <Link href="/check-in" className="cta-primary">
              Check-in
            </Link>
          </div>
        </FadeIn>
      </section>

      <section
        id="kontakt"
        className="section-shell relative z-10 scroll-mt-28 py-24 sm:scroll-mt-32 sm:py-28"
      >
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <FadeIn className="section-copy">
            <span className="eyebrow">Kontakt</span>
            <h2 className="section-title">Persönliche Beratung statt Werkstatt-Hotline.</h2>
            <p className="text-base leading-8 text-white/64">
              Teilen Sie uns Ihr Anliegen mit. Wir melden uns direkt, klar und ohne unnötige
              Umwege zurück.
            </p>

              <div className="grid gap-4 pt-4">
              {[
                ["E-Mail", contactConfig.inquiryEmail],
                ["Standort", contactConfig.location],
              ].map(([label, value]) => (
                <div key={label} className="contact-tile">
                  <p className="text-xs uppercase tracking-[0.24em] text-white opacity-40">{label}</p>
                  {label === "E-Mail" ? (
                    <a
                      href={buildMailtoHref({
                        to: contactConfig.inquiryEmail,
                        subject: "Anfrage ueber die Website",
                        body: "Guten Tag,\n\nich moechte eine Anfrage an Werksraum Automotive stellen.",
                      })}
                      className="mt-3 inline-flex text-xl text-white transition hover:text-champagne"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-3 text-xl text-white">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      <footer className="section-shell relative z-20 isolate border-t border-white/8 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white">
              Werksraum Automotive
            </p>
            <p className="max-w-md text-sm leading-7 text-white opacity-45">
              Zuverlässiger Service, transparente Kommunikation und sorgfältige Arbeit für Ihr Fahrzeug.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="relative z-20 flex flex-wrap gap-5 text-sm text-white opacity-55"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="pointer-events-auto rounded-md px-1 py-1 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[rgba(5,6,8,0.9)] px-4 py-3 backdrop-blur-2xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[1.05fr_0.95fr] gap-3">
          <a
            href={mobileInquiryHref}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-champagne px-4 text-sm font-semibold text-obsidian shadow-[0_12px_32px_rgba(210,184,148,0.22)]"
          >
            Anfrage senden
          </a>
          <Link
            href="/check-in"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white"
          >
            Check-in
          </Link>
        </div>
      </div>
    </main>
  );
}
