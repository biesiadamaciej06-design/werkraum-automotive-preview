"use client";

import { FormEvent, useState } from "react";

const web3FormsAccessKey = "3fa4ef02-b7f2-483c-a1f0-517da6a09373";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const fields = [
    { key: "name", label: "Name", type: "text", placeholder: "Ihr Name" },
    { key: "phone", label: "Telefonnummer", type: "tel", placeholder: "+43 ..." },
    { key: "email", label: "E-Mail", type: "email", placeholder: "name@beispiel.at" },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("sending");

    const form = event.currentTarget;
    const botcheck = new FormData(form).get("botcheck") ?? "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subject: `Neue Website-Anfrage${formData.name ? ` – ${formData.name}` : ""}`,
          from_name: "Werksraum Automotive Website",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          botcheck,
        }),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Form submission failed");
      }

      setFormData({ name: "", phone: "", email: "", message: "" });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-[32px] p-6 sm:p-8">
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.label} className="space-y-2 text-sm text-white/80">
            <span>{field.label}</span>
            <input
              type={field.type}
              name={field.key}
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
            name="message"
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
          <p className="text-sm text-white/45">
            Mit dem Absenden werden Ihre Angaben zur Bearbeitung der Anfrage über Web3Forms
            übermittelt. Details finden Sie im{" "}
            <a href="/datenschutz/" className="underline underline-offset-4 hover:text-white">
              Datenschutz
            </a>
            .
          </p>
          {submitStatus === "success" ? (
            <p role="status" className="text-sm text-champagne/85">
              Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.
            </p>
          ) : null}
          {submitStatus === "error" ? (
            <p role="alert" className="text-sm text-red-300">
              Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben
              Sie direkt an info@werksraum.at.
            </p>
          ) : null}
        </div>
        <button type="submit" className="cta-primary disabled:cursor-wait disabled:opacity-60" disabled={submitStatus === "sending"}>
          {submitStatus === "sending" ? "Wird gesendet …" : "Anfrage senden"}
        </button>
      </div>
    </form>
  );
}
