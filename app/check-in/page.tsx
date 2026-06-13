import { CheckInPage } from "@/CheckIn/check-in-page";

const repository = "werkraum-automotive-preview";
const isUserPagesRepository = repository.endsWith(".github.io");
const isProduction = process.env.NODE_ENV === "production";
const basePath =
  isProduction && repository && !isUserPagesRepository ? `/${repository}` : "";
const withBasePath = (path: string) => `${basePath}${path}`;

export default function CheckInRoute() {
  return <CheckInPage heroImageSrc={withBasePath("/images/hero-premium-porsche-bmw.png")} />;
}
