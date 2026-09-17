export const contactConfig = {
  owner: "Maciej Biesiada",
  businessName: "Werksraum Automotive",
  streetAddress: "Gottfried Vajan-Straße 4",
  postalCode: "2442",
  city: "Unterwaltersdorf",
  country: "Österreich",
  location: "2442 Unterwaltersdorf, Österreich",
  websiteDomain: "www.werksraum.at",
  emailDomain: "werksraum.at",
  inquiryEmail: "info@werksraum.at",
  sharedInboxEmail: "kontakt@werksraum.at",
  checkInEmail: "checkin@werksraum.at",
  serviceEmail: "service@werksraum.at",
  billingEmail: "rechnung@werksraum.at",
  domainOwnerVerified: false,
} as const;

export function buildMailtoHref({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${to}?${params.toString()}`;
}
