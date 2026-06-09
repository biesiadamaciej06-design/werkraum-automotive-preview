import { CheckInPage } from "@/CheckIn/check-in-page";

const repository = "werkraum-automotive-preview";
const isUserPagesRepository = repository.endsWith(".github.io");
const basePath = repository && !isUserPagesRepository ? `/${repository}` : "";
const withBasePath = (path: string) => `${basePath}${path}`;

export default function CheckInRoute() {
  return <CheckInPage heroImageSrc={withBasePath("/images/hero-premium-porsche-bmw.png")} />;
}
