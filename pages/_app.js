import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseApp from "../firebase";
import "@/styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // We track the auth state to reset firebaseUi if the user signs out.
    return onAuthStateChanged(getAuth(firebaseApp), (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Pitch, don't kill my vibe.</title>
        <meta name="description" content="Pitch, don't kill my vibe homepage" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
        ></link>
      </Head>
      <section class="hero is-fullheight has-background-info">
        <NavBar user={user}/>
        <Component {...pageProps} />
        <Footer />
      </section>
    </div>
  );
}
