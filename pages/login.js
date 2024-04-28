import firebaseApp from "./../firebase";
import StyledFirebaseAuth from "./../components/StyledFirebaseAuth";
// import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useState } from "react";
import { handleSignup } from "../firebase"; // Importing the signup function
import { useRouter } from "next/router";


// Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: "popup",
//   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: "/",
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
// };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userType, setUserType] = useState(""); // New state for user type

  const router = useRouter();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the handleSignup function passing email, password, and userType
      await handleSignup(email, password, displayName, userType);
      router.push('/');
      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  // return (
  //   <div>
  //     {/* <StyledFirebaseAuth
  //       uiConfig={uiConfig}
  //       firebaseAuth={getAuth(firebaseApp)}
  //       uiCallback={() => console.log("Logged in!")}
  //     /> */}
  //   </div>
  // );

  return (
    <div>
      <section className="container">
        <div className="columns is-centered">
          <div className="column is-6">
            <div className="box">
              <h1 className="title is-4 has-text-centered">Sign up</h1>
              <form onSubmit={handleSignupSubmit}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="First & Last Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <div className="select is-medium is-fullwidth">
                      <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                      >
                        <option value="">Select User Type</option>
                        <option value="Venture Capital">Venture Capital</option>
                        <option value="Pitcher">Pitcher</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  className="button is-block is-link is-fullwidth"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
