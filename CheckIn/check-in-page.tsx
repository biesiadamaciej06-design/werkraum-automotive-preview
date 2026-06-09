"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckInHero } from "@/CheckIn/check-in-hero";
import { StepProgress } from "@/CheckIn/step-progress";

type FileItem = {
  id: string;
  name: string;
  type: string;
  previewUrl?: string;
};

type CheckInData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredContact: string;
  brand: string;
  model: string;
  firstRegistration: string;
  licensePlate: string;
  vin: string;
  mileage: string;
  fuelType: string;
  fuelLevel: string;
  serviceRequest: string[];
  requestDescription: string;
  issueSince: string;
  issueFrequency: string;
  warningLights: string;
  warningDescription: string;
  budgetLimit: string;
  preferredDate: string;
  replacementMobility: string;
  itemsInVehicle: string;
  files: {
    damageImages: FileItem[];
  };
  acceptNoLiability: boolean;
  confirmAccuracy: boolean;
  acceptPrivacy: boolean;
};

const STORAGE_KEY = "werkraum-checkin-v1";

const stepItems = [
  { id: "customer", number: 1, title: "Kundendaten" },
  { id: "vehicle", number: 2, title: "Fahrzeugdaten" },
  { id: "request", number: 3, title: "Anliegen" },
  { id: "uploads", number: 4, title: "Bilder & Dokumente" },
  { id: "summary", number: 5, title: "Zusammenfassung" },
];

const serviceOptions = [
  "Wartung & Service",
  "Diagnose / Fehlersuche",
  "Bremsen",
  "Fahrwerk",
  "Pickerl / §57a",
  "Reifen",
  "Klimaanlage",
  "Performance-Umbau",
  "Software / Codierung",
  "Fahrzeugaufbereitung",
  "Sonstiges",
];

const initialData: CheckInData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  preferredContact: "Telefon",
  brand: "",
  model: "",
  firstRegistration: "",
  licensePlate: "",
  vin: "",
  mileage: "",
  fuelType: "Benzin",
  fuelLevel: "1/4",
  serviceRequest: [],
  requestDescription: "",
  issueSince: "",
  issueFrequency: "",
  warningLights: "Unsicher",
  warningDescription: "",
  budgetLimit: "",
  preferredDate: "",
  replacementMobility: "Nicht benötigt",
  itemsInVehicle: "",
  files: {
    damageImages: [],
  },
  acceptNoLiability: false,
  confirmAccuracy: false,
  acceptPrivacy: false,
};

type CheckInPageProps = {
  heroImageSrc: string;
};

export function CheckInPage({ heroImageSrc }: CheckInPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckInData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const minPreferredDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as { currentStep: number; formData: CheckInData };
      setCurrentStep(parsed.currentStep || 1);
      setFormData({
        ...initialData,
        ...parsed.formData,
        files: parsed.formData.files || initialData.files,
      });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || isSubmitted) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep, formData }));
  }, [currentStep, formData, isSubmitted]);

  const summaryGroups = useMemo(
    () => [
      {
        title: "Kundendaten",
        items: [
          ["Name", `${formData.firstName} ${formData.lastName}`.trim()],
          ["Telefon", formData.phone],
          ["E-Mail", formData.email],
          ["Kontaktwunsch", formData.preferredContact],
        ],
      },
      {
        title: "Fahrzeugdaten",
        items: [
          ["Fahrzeug", [formData.brand, formData.model].filter(Boolean).join(" ")],
          ["Erstzulassung", formData.firstRegistration],
          ["Kennzeichen", formData.licensePlate],
          ["VIN", formData.vin],
          ["Kilometerstand", formData.mileage ? `${formData.mileage} km` : ""],
          ["Kraftstoff", formData.fuelType],
          ["Tank / Akku", formData.fuelLevel],
        ],
      },
      {
        title: "Anliegen",
        items: [
          ["Servicewunsch", formData.serviceRequest.join(", ")],
          ["Beschreibung", formData.requestDescription],
          ["Kostenlimit brutto", formData.budgetLimit ? `${formData.budgetLimit} €` : ""],
          ["Wunschtermin", formData.preferredDate],
          ["Ersatzmobilität", formData.replacementMobility],
          ["Gegenstände im Fahrzeug", formData.itemsInVehicle],
          ["Seit wann", formData.issueSince],
          ["Verhalten", formData.issueFrequency],
          ["Warnlampen", formData.warningLights],
          ["Warnmeldung", formData.warningDescription],
        ],
      },
      {
        title: "Bilder & Dokumente",
        items: [
          [
            "Uploads",
            formData.files.damageImages
              .map((item) => item.name)
              .join(", "),
          ],
        ],
      },
    ],
    [formData],
  );

  const updateField = (field: keyof CheckInData, value: string | boolean | string[]) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const updateFiles = (key: keyof CheckInData["files"], files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    const nextFiles = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      type: file.type,
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));

    setFormData((previous) => ({
      ...previous,
      files: {
        ...previous.files,
        [key]: [...previous.files[key], ...nextFiles],
      },
    }));
  };

  useEffect(() => {
    return () => {
      Object.values(formData.files)
        .flat()
        .forEach((file) => {
          if (file.previewUrl) {
            URL.revokeObjectURL(file.previewUrl);
          }
        });
    };
  }, [formData.files]);

  const removeFile = (key: keyof CheckInData["files"], id: string) => {
    setFormData((previous) => {
      const file = previous.files[key].find((item) => item.id === id);

      if (file?.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }

      return {
        ...previous,
        files: {
          ...previous.files,
          [key]: previous.files[key].filter((item) => item.id !== id),
        },
      };
    });
  };

  const toggleSelection = (field: "serviceRequest", value: string) => {
    const currentValues = formData[field];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateField(field, nextValues);
  };

  const validateStep = (step: number) => {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) nextErrors.firstName = "Bitte Vornamen angeben.";
      if (!formData.lastName.trim()) nextErrors.lastName = "Bitte Nachnamen angeben.";
      if (!formData.phone.trim()) nextErrors.phone = "Bitte Telefonnummer angeben.";
      if (!formData.email.trim()) nextErrors.email = "Bitte E-Mail-Adresse angeben.";
    }

    if (step === 2) {
      if (!formData.brand.trim()) nextErrors.brand = "Bitte Marke angeben.";
      if (!formData.model.trim()) nextErrors.model = "Bitte Modell angeben.";
      if (!formData.firstRegistration.trim()) {
        nextErrors.firstRegistration = "Bitte Erstzulassung angeben.";
      }
      if (!formData.licensePlate.trim()) nextErrors.licensePlate = "Bitte Kennzeichen angeben.";
      if (!formData.mileage.trim()) nextErrors.mileage = "Bitte Kilometerstand angeben.";
    }

    if (step === 3) {
      if (!formData.serviceRequest.length) {
        nextErrors.serviceRequest = "Bitte mindestens einen Servicewunsch auswählen.";
      }
      if (!formData.requestDescription.trim()) {
        nextErrors.requestDescription = "Bitte dein Anliegen kurz beschreiben.";
      }
      if (!formData.budgetLimit.trim()) {
        nextErrors.budgetLimit = "Bitte ein Kostenlimit angeben.";
      }
      if (!formData.preferredDate.trim()) {
        nextErrors.preferredDate = "Bitte einen Wunschtermin angeben.";
      }
      if (formData.warningLights === "Ja" && !formData.warningDescription.trim()) {
        nextErrors.warningDescription = "Bitte die Warnmeldung oder den Fehler beschreiben.";
      }
    }

    if (step === 5) {
      if (!formData.acceptNoLiability) {
        nextErrors.acceptNoLiability = "Bitte bestätige den Haftungshinweis.";
      }
      if (!formData.confirmAccuracy) {
        nextErrors.confirmAccuracy = "Bitte bestätige die Richtigkeit deiner Angaben.";
      }
      if (!formData.acceptPrivacy) {
        nextErrors.acceptPrivacy = "Bitte stimme der Datenverarbeitung zu.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setCurrentStep((previous) => Math.min(previous + 1, stepItems.length));
  };

  const previousStep = () => {
    setErrors({});
    setCurrentStep((previous) => Math.max(previous - 1, 1));
  };

  const submitForm = () => {
    if (!validateStep(5)) {
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    setIsSubmitted(true);
  };

  return (
    <main className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-radial-premium" />

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
        <div className="section-shell flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 shadow-aura backdrop-blur-2xl">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.32em] text-white">
            Werkraum Automotive
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/" className="cta-secondary hidden sm:inline-flex">
              Zur Hauptseite
            </Link>
            <Link href="/#kontakt" className="cta-primary">
              Termin anfragen
            </Link>
          </div>
        </div>
      </header>

      {isSubmitted ? (
        <section className="section-shell relative z-10 flex min-h-screen items-center py-32">
          <div className="glass-panel mx-auto max-w-3xl rounded-[36px] p-8 text-center sm:p-12">
            <span className="eyebrow justify-center">Bestätigung</span>
            <h1 className="section-title mt-5">Check-in erfolgreich übermittelt</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/68">
              Vielen Dank. Wir haben deine Angaben erhalten und bereiten deinen Termin
              bestmöglich vor. Unser Team meldet sich persönlich bei dir.
            </p>
            <div className="mt-10">
              <Link href="/" className="cta-primary">
                Zur Startseite
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <CheckInHero imageSrc={heroImageSrc} />

          <section id="check-in" className="section-shell relative z-10 py-16 sm:py-20">
            <StepProgress currentStep={currentStep} steps={stepItems} />

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
              <aside className="space-y-6">
                {currentStep === 1 ? (
                  <div className="glass-panel rounded-[30px] p-6 sm:p-7">
                    <p className="text-xs uppercase tracking-[0.28em] text-champagne/78">
                      Premium Workflow
                    </p>
                    <h2 className="mt-4 text-2xl font-medium text-white">
                      Digitale Fahrzeugannahme mit klarer Struktur
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/62">
                      Jede Stufe führt durch die wichtigsten Angaben, damit wir dein Fahrzeug,
                      dein Anliegen und den Termin gezielt vorbereiten können.
                    </p>
                  </div>
                ) : null}

                <div className="glass-panel rounded-[30px] p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/42">
                    Aktueller Schritt
                  </p>
                  <p className="mt-4 text-xl text-white">{stepItems[currentStep - 1].title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/56">
                    Fortschritt wird lokal gespeichert, damit dein Check-in auf Smartphone oder
                    Tablet nicht verloren geht.
                  </p>
                </div>
              </aside>

              <div className="glass-panel overflow-hidden rounded-[34px] p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentStep === 1 ? (
                      <div className="space-y-6">
                        <SectionHeading
                          title="Kundendaten"
                          text="Teile uns mit, wie wir dich am besten erreichen können."
                        />
                        <div className="grid gap-5 md:grid-cols-2">
                          <TextField label="Vorname" value={formData.firstName} onChange={(value) => updateField("firstName", value)} error={errors.firstName} />
                          <TextField label="Nachname" value={formData.lastName} onChange={(value) => updateField("lastName", value)} error={errors.lastName} />
                          <TextField label="Telefonnummer" type="tel" value={formData.phone} onChange={(value) => updateField("phone", value)} error={errors.phone} />
                          <TextField label="E-Mail-Adresse" type="email" value={formData.email} onChange={(value) => updateField("email", value)} error={errors.email} />
                          <SelectField
                            className="md:col-span-2"
                            label="Bevorzugte Kontaktart"
                            value={formData.preferredContact}
                            onChange={(value) => updateField("preferredContact", value)}
                            options={["Telefon", "WhatsApp", "E-Mail", "SMS"]}
                          />
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 2 ? (
                      <div className="space-y-6">
                        <SectionHeading
                          title="Fahrzeugdaten"
                          text="Je genauer die Angaben sind, desto präziser können wir dein Anliegen vorbereiten."
                        />
                        <div className="grid gap-5 md:grid-cols-2">
                          <TextField label="Marke" value={formData.brand} onChange={(value) => updateField("brand", value)} error={errors.brand} />
                          <TextField label="Modell" value={formData.model} onChange={(value) => updateField("model", value)} error={errors.model} />
                          <TextField
                            label="Erstzulassung"
                            value={formData.firstRegistration}
                            onChange={(value) => updateField("firstRegistration", value)}
                            error={errors.firstRegistration}
                            placeholder="MM/JJJJ"
                          />
                          <TextField label="Kennzeichen" value={formData.licensePlate} onChange={(value) => updateField("licensePlate", value)} error={errors.licensePlate} />
                          <TextField label="Fahrgestellnummer / VIN" value={formData.vin} onChange={(value) => updateField("vin", value)} />
                          <TextField label="Kilometerstand" value={formData.mileage} onChange={(value) => updateField("mileage", value)} error={errors.mileage} />
                          <SelectField
                            label="Kraftstoffart"
                            value={formData.fuelType}
                            onChange={(value) => updateField("fuelType", value)}
                            options={["Benzin", "Diesel", "Hybrid", "Elektro"]}
                          />
                          <SelectField
                            label="Tank / Akku"
                            value={formData.fuelLevel}
                            onChange={(value) => updateField("fuelLevel", value)}
                            options={[
                              "1/4",
                              "1/2",
                              "3/4",
                              "Voll",
                              "Elektrisch: unter 30%",
                              "Elektrisch: 30-80%",
                              "Elektrisch: über 80%",
                            ]}
                          />
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 3 ? (
                      <div className="space-y-6">
                        <SectionHeading
                          title="Anliegen / Servicewunsch"
                          text="Wähle die passenden Leistungsbereiche und beschreibe dein Anliegen möglichst konkret."
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          {serviceOptions.map((option) => {
                            const selected = formData.serviceRequest.includes(option);

                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleSelection("serviceRequest", option)}
                                className={`rounded-[26px] border p-5 text-left transition duration-300 ${
                                  selected
                                    ? "border-champagne/40 bg-champagne/[0.08] shadow-[0_0_0_1px_rgba(210,184,148,0.1)]"
                                    : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.05]"
                                }`}
                              >
                                <p className="text-lg text-white">{option}</p>
                              </button>
                            );
                          })}
                        </div>
                        {errors.serviceRequest ? <ErrorText message={errors.serviceRequest} /> : null}

                        <div className="grid gap-5 md:grid-cols-2">
                          <TextAreaField
                            className="md:col-span-2"
                            label="Beschreibung des Problems oder Wunsches"
                            value={formData.requestDescription}
                            onChange={(value) => updateField("requestDescription", value)}
                            error={errors.requestDescription}
                          />
                          <TextField
                            label="Kostenlimit brutto"
                            value={formData.budgetLimit}
                            onChange={(value) => updateField("budgetLimit", value)}
                            error={errors.budgetLimit}
                            placeholder="z. B. 750"
                          />
                          <DateField
                            label="Wunschtermin"
                            value={formData.preferredDate}
                            onChange={(value) => updateField("preferredDate", value)}
                            error={errors.preferredDate}
                            min={minPreferredDate}
                          />
                          <SelectField
                            className="md:col-span-2"
                            label="Ersatzmobilität"
                            value={formData.replacementMobility}
                            onChange={(value) => updateField("replacementMobility", value)}
                            options={[
                              "Nicht benötigt",
                              "Leihwagen",
                              "Abholung / Bringservice",
                              "Warten vor Ort",
                            ]}
                          />
                          <TextField
                            className="md:col-span-2"
                            label="Gegenstände im Fahrzeug"
                            value={formData.itemsInVehicle}
                            onChange={(value) => updateField("itemsInVehicle", value)}
                            placeholder="Zulassung, Serviceheft, Kindersitz, Ladekabel ..."
                          />
                          <TextField
                            label="Seit wann besteht das Problem?"
                            value={formData.issueSince}
                            onChange={(value) => updateField("issueSince", value)}
                          />
                          <TextField
                            label="Tritt das Problem dauerhaft oder sporadisch auf?"
                            value={formData.issueFrequency}
                            onChange={(value) => updateField("issueFrequency", value)}
                          />
                          <SelectField
                            className="md:col-span-2"
                            label="Gibt es Warnlampen?"
                            value={formData.warningLights}
                            onChange={(value) => updateField("warningLights", value)}
                            options={["Ja", "Nein", "Unsicher"]}
                          />
                          {formData.warningLights === "Ja" ? (
                            <TextAreaField
                              className="md:col-span-2"
                              label="Warnmeldung / Fehlerbeschreibung"
                              value={formData.warningDescription}
                              onChange={(value) => updateField("warningDescription", value)}
                              error={errors.warningDescription}
                            />
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {currentStep === 4 ? (
                      <div className="space-y-6">
                        <SectionHeading
                          title="Bilder & Dokumente"
                          text="Schadenbilder sind optional. Wenn etwas sichtbar ist, kannst du hier direkt Fotos mitsenden."
                        />

                        <UploadField
                          title="Schadenbilder hochladen"
                          helperText="Optional: Nur wenn Schäden, Auffälligkeiten oder relevante Details sichtbar sind."
                          files={formData.files.damageImages}
                          onAdd={(files) => updateFiles("damageImages", files)}
                          onRemove={(id) => removeFile("damageImages", id)}
                        />
                      </div>
                    ) : null}

                    {currentStep === 5 ? (
                      <div className="space-y-6">
                        <SectionHeading
                          title="Zusammenfassung"
                          text="Prüfe alle Angaben vor dem Absenden. Danach übermitteln wir den Check-in an das Team."
                        />

                        <div className="grid gap-5">
                          {summaryGroups.map((group) => (
                            <div key={group.title} className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                              <p className="text-xs uppercase tracking-[0.24em] text-champagne/76">{group.title}</p>
                              <div className="mt-4 grid gap-4 md:grid-cols-2">
                                {group.items.map(([label, value]) => (
                                  <div key={label}>
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/36">{label}</p>
                                    <p className="mt-2 text-sm leading-7 text-white/78">
                                      {value || "Noch keine Angabe"}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid gap-4">
                          <CheckboxField
                            checked={formData.acceptNoLiability}
                            label="Ich nehme zur Kenntnis, dass für im Fahrzeug liegende Gegenstände keine Haftung übernommen wird"
                            onChange={(checked) => updateField("acceptNoLiability", checked)}
                            error={errors.acceptNoLiability}
                          />
                          <CheckboxField
                            checked={formData.confirmAccuracy}
                            label="Ich bestätige, dass die Angaben korrekt sind"
                            onChange={(checked) => updateField("confirmAccuracy", checked)}
                            error={errors.confirmAccuracy}
                          />
                          <CheckboxField
                            checked={formData.acceptPrivacy}
                            label="Ich stimme der Verarbeitung meiner Daten zur Bearbeitung der Anfrage zu"
                            onChange={(checked) => updateField("acceptPrivacy", checked)}
                            error={errors.acceptPrivacy}
                          />
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={currentStep === 1}
                    className="cta-secondary disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Zurück
                  </button>

                  {currentStep < 5 ? (
                    <button type="button" onClick={nextStep} className="cta-primary">
                      Weiter
                    </button>
                  ) : (
                    <button type="button" onClick={submitForm} className="cta-primary">
                      Check-in absenden
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.28em] text-champagne/75">{title}</p>
      <p className="text-sm leading-7 text-white/58">{text}</p>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  className,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className={`space-y-2 ${className || ""}`}>
      <span className="text-sm text-white/74">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-champagne/45 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(210,184,148,0.14)]"
      />
      {error ? <ErrorText message={error} /> : null}
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  error,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}) {
  return (
    <label className={`space-y-2 ${className || ""}`}>
      <span className="text-sm text-white/74">{label}</span>
      <textarea
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-champagne/45 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(210,184,148,0.14)]"
      />
      {error ? <ErrorText message={error} /> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <label className={`space-y-2 ${className || ""}`}>
      <span className="text-sm text-white/74">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-champagne/45 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(210,184,148,0.14)]"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-obsidian text-white">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DateField({
  label,
  value,
  onChange,
  error,
  min,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  min?: string;
  className?: string;
}) {
  const parsedDate = value ? parseIsoDate(value) : null;
  const minDate = min ? parseIsoDate(min) : null;
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialMonth = parsedDate ?? minDate ?? today;
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );

  useEffect(() => {
    if (parsedDate) {
      setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
    }
  }, [value]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const hasValidDate = parsedDate !== null;
  const formattedValue = hasValidDate
    ? new Intl.DateTimeFormat("de-AT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(parsedDate)
    : "";
  const monthLabel = new Intl.DateTimeFormat("de-AT", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const monthDays = buildCalendarDays(visibleMonth);

  const selectDate = (date: Date) => {
    if (minDate && date < minDate) {
      return;
    }

    onChange(toIsoDate(date));
    setIsOpen(false);
  };

  return (
    <div className={`space-y-2 ${className || ""}`}>
      <span className="text-sm text-white/74">{label}</span>
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="date-field-shell group relative flex w-full items-center gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition hover:border-white/16 focus:border-champagne/45 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_0_1px_rgba(210,184,148,0.14)]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-champagne/78 transition group-hover:border-champagne/24 group-hover:text-champagne">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect x="3" y="5" width="18" height="16" rx="3" />
              <path d="M3 10h18" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <span className={`block text-sm ${formattedValue ? "text-white" : "text-white/38"}`}>
              {formattedValue || "Datum auswählen"}
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-white/34">Kalender</span>
        </button>

        {isOpen ? (
          <div className="absolute left-0 top-[calc(100%+12px)] z-30 w-[320px] max-w-[calc(100vw-3rem)] rounded-[28px] border border-white/10 bg-[#16181c]/95 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth(
                    (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/74 transition hover:border-white/18 hover:bg-white/[0.08]"
              >
                ‹
              </button>
              <p className="text-sm font-medium capitalize text-white">{monthLabel}</p>
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth(
                    (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/74 transition hover:border-white/18 hover:bg-white/[0.08]"
              >
                ›
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2">
              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                <div
                  key={day}
                  className="flex h-8 items-center justify-center text-[11px] uppercase tracking-[0.2em] text-white/36"
                >
                  {day}
                </div>
              ))}

              {monthDays.map((date) => {
                const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
                const isoDate = toIsoDate(date);
                const isSelected = value === isoDate;
                const isDisabled = minDate ? date < minDate : false;
                const isToday = toIsoDate(today) === isoDate;

                return (
                  <button
                    key={isoDate}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => selectDate(date)}
                    className={`flex h-10 items-center justify-center rounded-full text-sm transition ${
                      isSelected
                        ? "bg-champagne text-obsidian"
                        : isDisabled
                          ? "cursor-not-allowed text-white/18"
                          : isCurrentMonth
                            ? "text-white hover:bg-white/[0.08]"
                            : "text-white/32 hover:bg-white/[0.04]"
                    } ${isToday && !isSelected ? "border border-champagne/30" : ""}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className="text-xs uppercase tracking-[0.2em] text-white/44 transition hover:text-white/72"
              >
                Löschen
              </button>
              <button
                type="button"
                onClick={() => selectDate(today)}
                className="text-xs uppercase tracking-[0.2em] text-champagne/84 transition hover:text-champagne"
              >
                Heute
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {error ? <ErrorText message={error} /> : null}
    </div>
  );
}

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function buildCalendarDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return startOfDay(date);
  });
}

function CheckboxField({
  checked,
  label,
  onChange,
  error,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
  error?: string;
}) {
  return (
    <label className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-[#d2b894]"
        />
        <div>
          <span className="text-sm leading-7 text-white/74">{label}</span>
          {error ? <ErrorText message={error} /> : null}
        </div>
      </div>
    </label>
  );
}

function UploadField({
  title,
  helperText,
  files,
  onAdd,
  onRemove,
}: {
  title: string;
  helperText: string;
  files: FileItem[];
  onAdd: (files: FileList | null) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-white/12 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-white/68">{title}</p>
          <p className="text-sm leading-7 text-white/48">{helperText}</p>
        </div>
        <label className="cta-secondary cursor-pointer">
          Dateien wählen
          <input type="file" multiple className="hidden" onChange={(event) => onAdd(event.target.files)} />
        </label>
      </div>

      {files.length ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <div key={file.id} className="rounded-[24px] border border-white/8 bg-black/20 p-4">
              {file.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={file.previewUrl}
                  alt={file.name}
                  className="h-32 w-full rounded-[18px] object-cover"
                />
              ) : (
                <div className="flex h-32 items-center justify-center rounded-[18px] border border-white/8 bg-white/[0.03] text-xs uppercase tracking-[0.2em] text-white/38">
                  Dokument
                </div>
              )}
              <p className="mt-4 truncate text-sm text-white/78">{file.name}</p>
              <button
                type="button"
                onClick={() => onRemove(file.id)}
                className="mt-3 text-xs uppercase tracking-[0.22em] text-champagne/80 transition hover:text-champagne"
              >
                Entfernen
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ErrorText({ message }: { message: string }) {
  return <p className="text-sm text-[#f0c8b4]">{message}</p>;
}
