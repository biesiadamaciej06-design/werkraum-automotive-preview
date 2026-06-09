import { CheckInPage } from "@/CheckIn/check-in-page";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserPagesRepository = repository.endsWith(".github.io");
const basePath = repository && !isUserPagesRepository ? `/${repository}` : "";
const withBasePath = (path: string) => `${basePath}${path}`;

export default function CheckInRoute() {
  return <CheckInPage heroImageSrc={withBasePath("/images/hero-premium-porsche-bmw.png")} />;
}
