import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseApp from "../firebase";
import "@/styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import { Archivo } from "next/font/google";

const inter = Archivo({ subsets: ["latin"] });

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
      </Head>
      <section
        className={`hero is-fullheight ${inter.className}`}
        style={{ backgroundColor: "#24248b" }}
      >
        <NavBar user={user} />
        <Component {...pageProps} user={user} />
        <Footer />
      </section>
    </div>
  );
}
