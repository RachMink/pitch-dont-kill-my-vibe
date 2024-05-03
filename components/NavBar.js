import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { Antonio } from "next/font/google";

const antonio = Antonio({ subsets: ["latin"] });

export default function NavBar(props) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut(getAuth()).then(() => {
      router.push("/"); // Redirect to homepage
      props.setUserType("");
      localStorage.setItem("storedUserType", "");
      localStorage.setItem("storeUserEmail", "");
      setIsMenuOpen(false); // Close menu after sign out
    });
  };

  return (
    <div className="hero-head has-background-white">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item">
            <img src="/512-logo.png" alt="Logo" />
            <strong
              className={`is-size-5 ${antonio.className}`}
              style={{ letterSpacing: "-1px" }}
            >
              &nbsp; Pitch, don't kill my vibe.
            </strong>
          </Link>
          <button
            className={`navbar-burger ${isMenuOpen ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}>
          <div className="navbar-start">
            {props.userType === "Venture Capital" && (
              <Link className="navbar-item pb-1" href="/app/swipe">
                Swipe
              </Link>
            )}
            {props.userType === "Pitcher" && (
              <Link className="navbar-item pb-1" href="/app/pitches">
                Pitch
              </Link>
            )}
            {props.userType === "Venture Capital" && (
              <Link className="navbar-item pb-1" href="/app/likes">
                Likes
              </Link>
            )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {props.user ? (
                  <>
                    <span className="mr-2 mb-3">
                      👋 Hey, {props.user.displayName}
                    </span>
                    <button
                      className={`button is-secondary mb-4 ${antonio.className}`}
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link href="/login">
                    <button
                      className={`button is-secondary ml-3 mb-4 ${antonio.className}`}
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

