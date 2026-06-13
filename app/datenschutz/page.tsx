import Link from "next/link";

const controllerDetails = [
  "Verantwortliche Stelle: [Firmenname / Name der Betreiberin oder des Betreibers]",
  "Anschrift: [Straße, Hausnummer, PLZ, Ort, Land]",
  "E-Mail: [E-Mail-Adresse]",
  "Telefon: [Telefonnummer]",
];

const rights = [
  "Auskunft über die verarbeiteten personenbezogenen Daten",
  "Berichtigung unrichtiger Daten",
  "Löschung Ihrer Daten, soweit keine gesetzliche Aufbewahrungspflicht entgegensteht",
  "Einschränkung der Verarbeitung",
  "Datenübertragbarkeit, soweit anwendbar",
  "Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen",
  "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft",
];

const authorityDetails = [
  "Österreichische Datenschutzbehörde",
  "Barichgasse 40-42, 1030 Wien, Österreich",
  "Telefon: +43 1 52 152-0",
  "E-Mail: dsb@dsb.gv.at",
  "Website: https://dsb.gv.at/",
];

export default function DatenschutzPage() {
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
          <div className="max-w-4xl space-y-10">
            <div className="space-y-4">
              <span className="eyebrow">Rechtliches</span>
              <h1 className="section-title">Datenschutzerklärung</h1>
              <p className="text-base leading-8 text-white/68">
                Diese Datenschutzerklärung informiert Sie darüber, welche personenbezogenen Daten
                beim Besuch dieser Website verarbeitet werden, zu welchen Zwecken dies geschieht
                und welche Rechte Ihnen nach der Datenschutz-Grundverordnung (DSGVO) zustehen.
              </p>
              <p className="text-sm leading-7 text-white/50">
                Bitte ergänzen Sie vor Veröffentlichung insbesondere die in eckigen Klammern
                markierten Unternehmens- und Kontaktdaten.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">1. Verantwortliche Stelle</h2>
              <div className="grid gap-4">
                {controllerDetails.map((item) => (
                  <div key={item} className="glass-panel rounded-[24px] px-5 py-5">
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">2. Verarbeitung beim Besuch der Website</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Beim Aufruf dieser Website können durch den jeweiligen Hosting-Anbieter technisch
                  erforderliche Verbindungsdaten verarbeitet werden. Dazu gehören insbesondere
                  IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Informationen zu
                  Browser und Betriebssystem sowie gegebenenfalls Referrer-URL.
                </p>
                <p>
                  Diese Verarbeitung erfolgt zur Bereitstellung der Website, zur Gewährleistung der
                  Stabilität und Sicherheit sowie zur Fehleranalyse. Rechtsgrundlage ist Art. 6
                  Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen
                  Webauftritt).
                </p>
                <p>
                  Bitte ergänzen Sie hier vor Livegang den tatsächlich eingesetzten Hosting-Anbieter,
                  z. B. Name, Anschrift und gegebenenfalls einen Vertrag zur Auftragsverarbeitung,
                  sofern ein solcher Anbieter personenbezogene Daten in Ihrem Auftrag verarbeitet.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">3. Cookies, Tracking und Analyse</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Nach dem derzeitigen technischen Stand dieser Website werden keine Analyse-,
                  Marketing- oder Tracking-Tools eingesetzt. Es werden über den Quellcode aktuell
                  keine Dienste wie Web-Analytics, Werbe-Pixel oder Social-Media-Tracking geladen.
                </p>
                <p>
                  Sollten künftig Cookies oder externe Analyse- und Marketingdienste eingesetzt
                  werden, ist diese Datenschutzerklärung entsprechend zu ergänzen und gegebenenfalls
                  ein Consent-Banner einzubinden, bevor nicht technisch erforderliche Cookies oder
                  ähnliche Technologien aktiviert werden.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">4. Kontaktaufnahme</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Wenn Sie mit uns per E-Mail, telefonisch oder auf anderem Weg Kontakt aufnehmen,
                  verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung Ihrer Anfrage und
                  zur Kommunikation mit Ihnen.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den
                  Abschluss oder die Anbahnung eines Vertrags gerichtet ist, andernfalls Art. 6
                  Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten Interesses an der
                  sachgerechten Bearbeitung von Anfragen.
                </p>
                <p>
                  Das auf dieser Website sichtbare Kontaktformular dient derzeit nach aktuellem
                  technischen Stand lediglich der Darstellung und übermittelt momentan keine Daten
                  serverseitig an uns. Sobald eine aktive Formularübermittlung eingerichtet wird,
                  sind diese Datenschutzhinweise um die konkret eingesetzte technische Abwicklung,
                  Empfänger, Aufbewahrungsdauer und gegebenenfalls Auftragsverarbeiter zu ergänzen.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">5. Speicherdauer</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweils
                  genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten
                  bestehen.
                </p>
                <p>
                  Anfragen und Korrespondenz werden regelmäßig gelöscht, sobald die Bearbeitung
                  abgeschlossen ist und keine gesetzlichen oder vertraglichen Gründe für eine
                  weitere Speicherung bestehen. Sofern Sie konkrete Fristen verwenden, sollten diese
                  hier ergänzt werden.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">6. Empfänger von Daten</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Eine Übermittlung personenbezogener Daten an Dritte erfolgt nur, wenn dies zur
                  Vertragserfüllung erforderlich ist, eine gesetzliche Verpflichtung besteht, Sie
                  eingewilligt haben oder wir berechtigte Interessen an einer Auslagerung einzelner
                  Leistungen haben und Ihre Interessen nicht überwiegen.
                </p>
                <p>
                  Mögliche Empfänger können insbesondere Hosting-Anbieter, IT-Dienstleister oder
                  Kommunikationsdienstleister sein. Soweit diese als Auftragsverarbeiter tätig
                  werden, erfolgt die Verarbeitung auf Grundlage eines entsprechenden Vertrags gemäß
                  Art. 28 DSGVO.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">7. Übermittlungen in Drittländer</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Eine Übermittlung personenbezogener Daten in Staaten außerhalb der Europäischen
                  Union oder des Europäischen Wirtschaftsraums erfolgt nur, wenn dies ausdrücklich
                  angegeben ist, gesetzlich erlaubt ist oder geeignete Garantien nach der DSGVO
                  bestehen.
                </p>
                <p>
                  Wenn Sie Dienste von Anbietern außerhalb der EU/des EWR einsetzen, sollte an
                  dieser Stelle konkret ergänzt werden, an wen übermittelt wird und auf welcher
                  Rechtsgrundlage dies geschieht.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">8. Ihre Rechte</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Ihnen stehen nach der DSGVO insbesondere folgende Rechte zu:
                </p>
                <div className="grid gap-3">
                  {rights.map((item) => (
                    <div key={item} className="glass-panel rounded-[20px] px-4 py-4">
                      <p className="text-sm text-white/78">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">9. Beschwerderecht</h2>
              <div className="space-y-4 text-sm leading-7 text-white/72">
                <p>
                  Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten
                  gegen Datenschutzrecht verstößt, haben Sie das Recht, Beschwerde bei einer
                  Aufsichtsbehörde einzulegen. In Österreich ist dies insbesondere die:
                </p>
                <div className="grid gap-4">
                  {authorityDetails.map((item) => (
                    <div key={item} className="glass-panel rounded-[24px] px-5 py-5">
                      <p className="text-sm text-white/78">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-medium text-white">10. Stand dieser Datenschutzerklärung</h2>
              <p className="text-sm leading-7 text-white/72">
                Stand: 13. Juni 2026. Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                wenn sich technische Funktionen, eingesetzte Dienste oder rechtliche Anforderungen
                ändern.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
