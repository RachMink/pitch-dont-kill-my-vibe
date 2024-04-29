import { useState } from "react";
import { handleSignup, handleLogin } from "../firebase";
import { useRouter } from "next/router";

export default function LoginPage({ userType, setUserType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userTypeSelection, setUserTypeSelection] = useState("");
  const [existingUser, setExistingUser] = useState(false); // State to track if user exists
  const [error, setError] = useState(""); // State to hold error message
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingUser) {
        // If existing user, handle login
        await handleLogin(email, password);
        router.push("/");
        console.log("User logged in successfully!");
      } else {
        // If new user, handle signup
        await handleSignup(email, password, displayName, userTypeSelection);
        // wait until sign up is clicked to change user type
        // this is to prevent nav bar from changing before signed in
        setUserType(userTypeSelection);
        localStorage.setItem("storedUserType", userTypeSelection);
        localStorage.setItem("storeUserEmail", email);
        router.push("/");
        console.log("User signed up successfully!");
      }
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  const toggleForm = () => {
    setExistingUser(!existingUser); // Toggle existingUser state
    // Clear form fields when switching between signup and login
    setEmail("");
    setPassword("");
    setDisplayName("");
    setUserType("");
    setError("");
  };

  return (
    <div>
      <section className="container">
        <div className="columns is-centered">
          <div className="column is-6">
            <div className="box">
              <h1 className="title is-4 has-text-centered">
                {existingUser ? "Login" : "Sign up"}
              </h1>
              {error && ( // Render error notification if error state is not empty
                <div className="notification is-danger is-light">{error}</div>
              )}
              <form onSubmit={handleFormSubmit}>
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
                {!existingUser && (
                  <>
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
                            value={userTypeSelection}
                            onChange={(e) =>
                              setUserTypeSelection(e.target.value)
                            }
                            required
                          >
                            <option value="">Select User Type</option>
                            <option value="Venture Capital">
                              Venture Capital
                            </option>
                            <option value="Pitcher">Pitcher</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <button
                  className="button is-block is-link is-fullwidth"
                  type="submit"
                >
                  {existingUser ? "Login" : "Sign Up"}
                </button>
              </form>

              {existingUser ? (
                <p className="has-text-centered mt-3">
                  <span>{"Don't have an account? "}</span>{" "}
                  <span
                    className="is-underlined"
                    style={{ cursor: "pointer" }}
                    onClick={toggleForm}
                  >
                    Sign Up
                  </span>
                </p>
              ) : (
                <p className="has-text-centered mt-3">
                  <span>
                    {"Already have an account? "}{" "}
                    <span
                      className="is-underlined"
                      style={{ cursor: "pointer" }}
                      onClick={toggleForm}
                    >
                      Login
                    </span>
                  </span>{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
