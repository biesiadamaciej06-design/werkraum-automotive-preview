"use client";

import { FormEvent, useState } from "react";
import { buildMailtoHref, contactConfig } from "@/lib/contact";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [draftOpened, setDraftOpened] = useState(false);

  const fields = [
    { key: "name", label: "Name", type: "text", placeholder: "Ihr Name" },
    { key: "phone", label: "Telefonnummer", type: "tel", placeholder: "+43 ..." },
    { key: "email", label: "E-Mail", type: "email", placeholder: "name@beispiel.at" },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const href = buildMailtoHref({
      to: contactConfig.inquiryEmail,
      subject: `Website-Anfrage${formData.name ? ` - ${formData.name}` : ""}`,
      body: [
        "Neue Anfrage ueber die Website",
        "",
        `Name: ${formData.name}`,
        `Telefon: ${formData.phone}`,
        `E-Mail: ${formData.email}`,
        "",
        "Nachricht:",
        formData.message,
      ].join("\n"),
    });

    window.location.href = href;
    setDraftOpened(true);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-[32px] p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.label} className="space-y-2 text-sm text-white/80">
            <span>{field.label}</span>
            <input
              type={field.type}
              placeholder={field.placeholder}
              required
              value={formData[field.key as keyof typeof formData]}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  [field.key]: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-champagne/50 focus:bg-white/[0.07]"
            />
          </label>
        ))}

        <label className="space-y-2 text-sm text-white/80 md:col-span-2">
          <span>Nachricht</span>
          <textarea
            rows={5}
            placeholder="Beschreiben Sie Ihr Anliegen."
            required
            value={formData.message}
            onChange={(event) =>
              setFormData((previous) => ({
                ...previous,
                message: event.target.value,
              }))
            }
            className="w-full rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-champagne/50 focus:bg-white/[0.07]"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-white/45">Wir melden uns so schnell wie möglich zurück.</p>
          {draftOpened ? (
            <p className="text-sm text-champagne/85">
              Ihr E-Mail-Programm wurde mit einem Entwurf an {contactConfig.inquiryEmail} geöffnet.
            </p>
          ) : null}
        </div>
        <button type="submit" className="cta-primary">
          Anfrage senden
        </button>
      </div>
    </form>
  );
}
