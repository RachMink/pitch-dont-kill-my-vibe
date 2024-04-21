import "@/styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <div>
      {/* <SessionProvider session={session}> */}
      <Head>
        <title>Pitch, don't kill my vibe.</title>
        <meta name="description" content="Pitch, don't kill my vibe homepage" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
        ></link>
      </Head>
      <section class="hero is-fullheight has-background-info">
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </section>

      {/* </SessionProvider> */}
    </div>
  );
}
