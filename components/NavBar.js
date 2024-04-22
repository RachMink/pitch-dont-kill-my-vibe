import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  // const session = useSession();

  return (
    <div class="hero-head has-background-info-light">
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ borderBottom: "1px solid lightgrey" }}
      >
        <div className="navbar-menu">
          <div className="navbar-start">
            <div class="navbar-brand">
              <Link class="navbar-item" href="/">
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
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                {/* {session.data ? (
              <>
                Signed in as&nbsp;<i>{session.data?.user?.email}</i>
                <button
                  class="button is-primary ml-3"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                Signed out.
                <button class="button is-primary ml-3" onClick={() => signIn()}>
                  Sign in
                </button>
              </>
            )} */}
              </div>
            </div>
          </div>{" "}
        </div>
      </nav>{" "}
    </div>
  );
};

export default NavBar;
