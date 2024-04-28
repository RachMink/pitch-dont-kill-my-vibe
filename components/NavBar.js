import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function NavBar(props) {
  // const session = useSession();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <div className="hero-head has-background-info-light">
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ borderBottom: "1px solid lightgrey" }}
      >
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-brand">
              <Link className="navbar-item" href="/">
                <strong>Pitch, don't kill my vibe.</strong>
              </Link>
            </div>
            <Link className="navbar-item" href="/app/swipe">
              Swipe
            </Link>
            <Link className="navbar-item" href="/app/pitches">
              Pitch
            </Link>
            <Link className="navbar-item" href="/app/likes">
              Likes
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <div className="buttons">
                  {props.user ? (
                    <>
                      <span className="mr-2 mb-3">
                        {/* TODO: displayName does not update right when signing up 
                            TODO: handle sign in as previously signed up user
                        */}
                        Welcome, {props.user.displayName}
                      </span>
                      <button
                        className="button is-secondary mb-4"
                        onClick={() => signOut(getAuth())}
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
