export function ContactForm() {
  const fields = [
    { label: "Name", type: "text", placeholder: "Ihr Name" },
    { label: "Telefonnummer", type: "tel", placeholder: "+43 ..." },
    { label: "E-Mail", type: "email", placeholder: "name@beispiel.at" },
  ];

  return (
    <form className="glass-panel rounded-[32px] p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.label} className="space-y-2 text-sm text-white/80">
            <span>{field.label}</span>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-champagne/50 focus:bg-white/[0.07]"
            />
          </label>
        ))}

        <label className="space-y-2 text-sm text-white/80 md:col-span-2">
          <span>Nachricht</span>
          <textarea
            rows={5}
            placeholder="Beschreiben Sie Ihr Anliegen."
            className="w-full rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-champagne/50 focus:bg-white/[0.07]"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/45">
          Wir melden uns so schnell wie möglich zurück.
        </p>
        <button type="submit" className="cta-primary">
          Anfrage senden
        </button>
      </div>
    </form>
  );
}
