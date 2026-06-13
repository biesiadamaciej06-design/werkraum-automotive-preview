import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/animations";
import { SiteHeader } from "@/components/site-header";

const repository = "werkraum-automotive-preview";
const isUserPagesRepository = repository.endsWith(".github.io");
const isProduction = process.env.NODE_ENV === "production";
const basePath =
  isProduction && repository && !isUserPagesRepository ? `/${repository}` : "";
const withBasePath = (path: string) => `${basePath}${path}`;

const trustPoints = [
  "Präzise Diagnose",
  "Saubere Werkstattprozesse",
  "Erfahrung mit Performance-Fahrzeugen",
  "Individuelle Betreuung",
  "OEM-nahe Qualität",
];

const services = [
  {
    title: "Wartung & Service",
    text: "Herstellerorientierte Serviceabläufe für Fahrzeuge, bei denen Details über Werterhalt und Vertrauen entscheiden.",
  },
  {
    title: "Diagnose & Fehlersuche",
    text: "Systematische Analyse komplexer Fehlerbilder mit technischem Verständnis und klarer Kommunikation.",
  },
  {
    title: "Bremsen & Fahrwerk",
    text: "Präzise Prüfung und Montage sicherheitsrelevanter Komponenten für ein stimmiges Fahrgefühl.",
  },
  {
    title: "Performance-Upgrades",
    text: "Sinnvolle Optimierungen für Fahrzeuge, die Charakter, Fahrdynamik und Präsenz behalten sollen.",
  },
  {
    title: "Fahrzeugaufbereitung",
    text: "Detailorientierte Pflege und visuelle Veredelung für einen Auftritt auf Premium-Niveau.",
  },
  {
    title: "Individualisierung & Umbauten",
    text: "Maßgeschneiderte Lösungen für Kunden, die technische Qualität mit einem klaren Anspruch verbinden.",
  },
];

const marques = ["Porsche", "BMW M", "Mercedes-AMG", "Audi RS", "Sportwagen & Performance-Fahrzeuge"];

const detailItems = [
  "Bremsenservice",
  "Fahrwerksprüfung",
  "Montage hochwertiger Komponenten",
  "Sichtprüfung und Dokumentation",
];

const galleryItems = [
  {
    label: "Performance Service",
    image: withBasePath("/images/hero-premium-porsche-bmw.png"),
  },
  {
    label: "Premium Workshop",
    image: withBasePath("/images/brand-premium-mercedes-bmw.png"),
  },
  {
    label: "Präzisionsarbeit",
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
  return (
    <main id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-premium" />
      <SiteHeader />

      <section className="relative min-h-screen">
        <Image
          src={withBasePath("/images/hero-premium-porsche-bmw.png")}
          alt="Premium Performance Werkstatt"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,8,0.46),rgba(4,5,8,0.82)_52%,rgba(4,5,8,0.95))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,184,148,0.15),transparent_25%)]" />

        <div className="section-shell relative z-10 flex min-h-screen items-end py-28 sm:py-32">
          <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <FadeIn className="max-w-3xl space-y-8">
              <span className="eyebrow">High-End Fahrzeugstudio</span>
              <div className="space-y-5">
                <h1 className="display-title">Premium Service für Performance-Fahrzeuge</h1>
                <p className="max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                  Spezialisierte Wartung, Diagnose und Individualisierung für Porsche, BMW M,
                  Mercedes-AMG und exklusive Sportwagen.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/check-in" className="cta-primary">
                  Check-in
                </Link>
                <Link href="#leistungen" className="cta-secondary">
                  Leistungen ansehen
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Performance Service", "Diagnose & Technik", "Exklusive Fahrzeugpflege"].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/72 backdrop-blur-md"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="glass-panel rounded-[32px] p-6 sm:p-8">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.28em] text-champagne/80">
                  Premium Vertrauen
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  {trustPoints.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-3xl border border-white/8 bg-black/20 p-4">
                      <p className="text-sm text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[28px] border border-champagne/20 bg-champagne/[0.08] p-5">
                  <p className="text-sm leading-7 text-white/70">
                    Wir betreuen Fahrzeuge, bei denen Präzision, Erfahrung und saubere Arbeit
                    entscheidend sind.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24 sm:py-28">
        <FadeIn className="section-copy">
          <span className="eyebrow">Vertrauen</span>
          <h2 className="section-title">Qualität, die man in jedem Detail spüren kann</h2>
        </FadeIn>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {trustPoints.map((item) => (
            <StaggerItem key={item}>
              <div className="premium-card h-full">
                <div className="mb-8 h-px w-16 bg-gradient-to-r from-champagne/80 to-transparent" />
                <p className="text-base leading-7 text-white/80">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section
        id="leistungen"
        className="section-shell relative z-10 scroll-mt-28 py-24 sm:scroll-mt-32 sm:py-28"
      >
        <FadeIn className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="section-copy">
            <span className="eyebrow">Leistungen</span>
            <h2 className="section-title">Technische Betreuung auf Premium-Niveau</h2>
            <p className="text-base leading-8 text-white/66">
              Von regelmäßiger Wartung bis zu gezielten Performance-Arbeiten schaffen wir Abläufe,
              die hochwertiger Technik und hohen Erwartungen gerecht werden.
            </p>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/46">
            Dunkle Materialien, klare Linien, kontrollierte Lichtakzente und ein präziser Umgang mit
            jedem Fahrzeug prägen den gesamten Auftritt.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <article className="premium-card h-full rounded-[30px]">
                <div className="space-y-5">
                  <span className="text-xs uppercase tracking-[0.28em] text-champagne/70">
                    Premium Service
                  </span>
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
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn className="section-copy">
            <span className="eyebrow">Spezialisiert auf Fahrzeuge</span>
            <h2 className="section-title">Für Marken mit Charakter und Anspruch</h2>
            <p className="text-base leading-8 text-white/66">
              Wir betreuen Fahrzeuge, bei denen Präzision, Erfahrung und saubere Arbeit
              entscheidend sind.
            </p>
          </FadeIn>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {marques.map((marque) => (
              <StaggerItem key={marque}>
                <div className="glass-panel rounded-[26px] px-5 py-6">
                  <p className="text-lg font-medium text-white">{marque}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeIn className="relative overflow-hidden rounded-[36px] border border-white/10">
            <Image
              src={withBasePath("/images/brand-premium-mercedes-bmw.png")}
              alt="Premium Werkstatt Atelier"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(4,5,8,0.55))]" />
          </FadeIn>

          <FadeIn delay={0.1} className="section-copy">
            <span className="eyebrow">Werkstatt / Atelier</span>
            <h2 className="section-title">Eine Werkstatt, die Qualität sichtbar macht</h2>
            <p className="text-base leading-8 text-white/66">
              Moderne Ausstattung, strukturierte Abläufe und ein Umfeld, das dem Anspruch
              hochwertiger Fahrzeuge gerecht wird.
            </p>
            <div className="glass-panel rounded-[28px] p-6">
              <p className="text-sm leading-7 text-white/62">
                Der Auftritt verbindet Motorsport-Lounge, High-End Detailing Studio und technische
                Werkstattkultur zu einem ruhigen, vertrauensvollen Erlebnis.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <FadeIn className="section-copy">
            <span className="eyebrow">Detail-Service</span>
            <h2 className="section-title">Präzision für Komponenten, die keine Kompromisse kennen</h2>
            <p className="text-base leading-8 text-white/66">
              Von sensiblen Bremsenarbeiten bis zur kontrollierten Montage hochwertiger Komponenten
              steht jeder Arbeitsschritt für Nachvollziehbarkeit und Sorgfalt.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div key={item} className="glass-panel rounded-[24px] px-5 py-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="relative overflow-hidden rounded-[36px] border border-white/10">
            <Image
              src={withBasePath("/images/service-bmw-brake-detail.png")}
              alt="Detailarbeit an Bremsen und Komponenten"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,8,0.12),rgba(4,5,8,0.7))]" />
          </FadeIn>
        </div>
      </section>

      <section
        id="galerie"
        className="section-shell relative z-10 scroll-mt-28 py-24 sm:scroll-mt-32 sm:py-28"
      >
        <FadeIn className="section-copy">
          <span className="eyebrow">Galerie</span>
          <h2 className="section-title">Ein Eindruck von Atmosphäre, Technik und Sorgfalt</h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {galleryItems.map((item, index) => (
            <FadeIn
              key={item.label}
              delay={index * 0.08}
              className={`${index === 0 ? "lg:row-span-2" : ""} group relative overflow-hidden rounded-[32px] border border-white/10`}
            >
              <div className="relative min-h-[320px]">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,8,0.08),rgba(4,5,8,0.7))]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex rounded-full border border-white/12 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/82 backdrop-blur-md">
                    {item.label}
                  </span>
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
        <div className="glass-panel rounded-[36px] px-6 py-10 sm:px-10 sm:py-14">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">Über uns</span>
            <h2 className="section-title mt-5">Werkraum Automotive steht für hochwertige Arbeit an exklusiven Fahrzeugen</h2>
            <p className="mt-6 text-base leading-8 text-white/68">
              Unser Anspruch ist nicht Masse, sondern Genauigkeit, Transparenz und ein Ergebnis, das
              dem Fahrzeug gerecht wird. Wir verbinden technisches Verständnis mit einem
              hochwertigen Umfeld, in dem Kunden und Fahrzeuge mit der nötigen Aufmerksamkeit
              betreut werden.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24 sm:py-28">
        <FadeIn className="relative overflow-hidden rounded-[36px] border border-champagne/20 bg-[linear-gradient(135deg,rgba(210,184,148,0.12),rgba(255,255,255,0.04))] px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,184,148,0.18),transparent_35%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <span className="eyebrow">Termin anfragen</span>
              <h2 className="section-title">Bereit für Service auf Premium-Niveau?</h2>
              <p className="text-base leading-8 text-white/68">
                Senden Sie uns eine Anfrage mit Fahrzeugmodell und gewünschter Leistung. Wir
                melden uns persönlich mit einer passenden Einschätzung.
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
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <FadeIn className="section-copy">
            <span className="eyebrow">Kontakt</span>
            <h2 className="section-title">Persönliche Beratung für Ihr Fahrzeug</h2>
            <p className="text-base leading-8 text-white/66">
              Teilen Sie uns Ihr Anliegen und den gewünschten Zeitraum mit. Wir melden uns direkt
              und mit einer realistischen Einschätzung zurück.
            </p>

            <div className="grid gap-4 pt-4">
              {[
                ["Telefon", "+43 000 000000"],
                ["E-Mail", "info@werkraum.at"],
                ["Standort", "Österreich"],
              ].map(([label, value]) => (
                <div key={label} className="glass-panel rounded-[24px] px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
                  <p className="mt-2 text-lg text-white">{value}</p>
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white">
              Werkraum Automotive
            </p>
            <p className="max-w-md text-sm leading-7 text-white/48">
              Premium Service für exklusive Fahrzeuge mit einem Fokus auf Präzision,
              Transparenz und Vertrauen.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="relative z-20 flex flex-wrap gap-5 text-sm text-white/52"
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
    </main>
  );
}
