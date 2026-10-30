import Script from "next/script";
import { markup } from "./portfolio-markup";
import "./portfolio.css";

export default function Home() {
  return (
    <>
      <div className="mk-root" dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/portfolio.js" strategy="afterInteractive" />
      <Script src="/work-reel.js" strategy="afterInteractive" />
    </>
  );
}
