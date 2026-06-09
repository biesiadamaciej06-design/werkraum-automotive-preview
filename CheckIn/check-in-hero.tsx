import Image from "next/image";

type CheckInHeroProps = {
  imageSrc: string;
};

const trustBadges = [
  "Sichere Datenübermittlung",
  "Für Performance-Fahrzeuge",
  "Persönliche Betreuung",
];

export function CheckInHero({ imageSrc }: CheckInHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/8">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Digitale Fahrzeugannahme bei Werkraum Automotive"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,8,0.2),rgba(4,5,8,0.78)_40%,rgba(4,5,8,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,184,148,0.2),transparent_30%)]" />
      </div>

      <div className="section-shell relative z-10 flex min-h-[70vh] items-end py-28 sm:min-h-[76vh] sm:py-32">
        <div className="w-full">
          <div className="max-w-3xl space-y-7">
            <span className="eyebrow">Digitaler Empfang</span>
            <div className="space-y-5">
              <h1 className="display-title">Digitaler Fahrzeug Check-in</h1>
              <p className="max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Schnell, präzise und professionell: Übermittle uns alle wichtigen
                Fahrzeugdaten vor deinem Werkstatttermin.
              </p>
            </div>

            <div className="inline-flex rounded-full border border-champagne/25 bg-black/30 px-5 py-3 text-xs uppercase tracking-[0.24em] text-champagne/88 backdrop-blur-xl sm:text-sm">
              Dauer: ca. 2-3 Minuten
            </div>

            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/76 backdrop-blur-md sm:text-xs"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
