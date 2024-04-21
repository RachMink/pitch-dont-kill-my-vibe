import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  // const session = useSession();

  return (
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ borderBottom: "1px solid lightgrey" }}
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Pitch, don't kill my vibe.
        </a>
      </div>
      <Link className="navbar-item" href="/">
        Home
      </Link>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
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
      </div>
    </nav>
  );
};

export default NavBar;
