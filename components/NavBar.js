import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { Mukta } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Mukta({ weight: "700", subsets: ["latin"] });

export default function NavBar(props) {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(getAuth())
      .then(() => {
        router.push("/"); // Redirect to homepage
        props.setUserType("");
        localStorage.setItem("storedUserType", "");
        localStorage.setItem("storeUserEmail", "");
      })
  };

  return (
    <div className="hero-head has-background-white">
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ borderBottom: "1px solid lightgrey" }}
      >
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-brand">
              <Link href="/" className="navbar-item">
                <img
                  src="/pitch_logo.png" // Specify the path to your PNG logo
                  alt="Logo"
                />
                <strong className={`is-size-5 ${inter.className}`}>
                  {" "}
                  &nbsp; Pitch, don't kill my vibe.
                </strong>
              </Link>
            </div>
            {props.userType === "Venture Capital" && (
              <Link className="navbar-item" href="/app/swipe">
                Swipe
              </Link>
            )}
            {props.userType === "Pitcher" && (
              <Link className="navbar-item" href="/app/pitches">
                Pitch
              </Link>
            )}
            {props.userType === "Venture Capital" && (
              <Link className="navbar-item" href="/app/likes">
                Likes
              </Link>
            )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <div className="buttons">
                  {props.user ? (
                    <>
                      <span className="mr-2 mb-3">
                        Welcome, {props.user.displayName}
                      </span>
                      <button
                        className="button is-secondary mb-4"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      className="navbar-item button is-secondary ml-3  mb-4"
                      href="/login"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </nav>{" "}
    </div>
  );
}
