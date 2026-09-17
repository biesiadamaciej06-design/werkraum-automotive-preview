import { CheckInPage } from "@/CheckIn/check-in-page";

const withBasePath = (path: string) => path;

export default function CheckInRoute() {
  return <CheckInPage heroImageSrc={withBasePath("/images/hero-premium-porsche-bmw.png")} />;
}
