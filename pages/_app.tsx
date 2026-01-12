import "@/styles/globals.css";
import type { AppProps } from "next/app";
import useLenis from "@/hooks/useLenis";

export default function App({ Component, pageProps }: AppProps) {
  useLenis();
  return <Component {...pageProps} />;
}
