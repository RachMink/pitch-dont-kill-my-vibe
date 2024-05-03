import Link from "next/link";
import Sparkles from "react-sparkle";
import { Antonio } from "next/font/google";
import { useRef } from "react";

const antonio = Antonio({ subsets: ["latin"] });

export default function Home(props) {
  const secondSectionRef = useRef(null);
  const getRoute = (userType) => {
    switch (userType) {
      case "":
        return "/login";
      case "Venture Capital":
        return "/app/swipe";
      case "Pitcher":
        return "app/pitches";
      default:
        return "/login";
    }
  };

  const renderButtonText = (userType) => {
    switch (userType) {
      case "":
        return "Start Here";
      case "Venture Capital":
        return "Start Swiping";
      case "Pitcher":
        return "Make A Pitch";
      default:
        return "Start Here";
    }
  };

  return (
    <>
      <div className="hero is-fullheight columns is-vcentered is-centered">
        <div className="has-text-centered">
          <p
            className={`title has-text-white ${antonio.className}`}
            style={{ position: "relative", letterSpacing: "-1px" }}
          >
            <span className="container">
              Welcome to Pitch, don't kill my vibe.
            </span>
            <Sparkles
              color={"#f5c984"}
              minSize={15}
              fadeOutSpeed={15}
              flicker={false}
            />
          </p>
          <p className="subtitle has-text-white">
            A place for founders and investors to level ideas.
          </p>
          <Link href={getRoute(props.userType)}>
            <button className={`button is-secondary mb-4 ${antonio.className}`}>
              {renderButtonText(props.userType)}
            </button>
          </Link>

          <div
            onClick={() => {
              secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
            }}
            className="has-text-white mt-2 is-clickable"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <span className="button is-ghost has-text-white pb-0">
              Read More
            </span>
            <span className="icon is-small">
              <i className="fas fa-arrow-down"></i>
            </span>
          </div>
        </div>
      </div>
      <div
        ref={secondSectionRef}
        className="section hero is-fullheight has-background-white"
      >
        <div className="columns is-vcentered is-centered">
          <div className="column container">
            <div className="columns is-multiline is-centered is-fullheight">
              <div className="column is-half">
                <div className="card is-fullheight p-5 m-4">
                  <div className="card-content has-text-centered">
                    <div className="columns is-centered is-multiline m-4">
                      <div className="column is-one-third">
                        <img className="is-128x128" src="/192-heart.png" />
                      </div>
                      <div className="column is-one-third">
                        <img className="is-128x128" src="/192-x.png" />
                      </div>
                    </div>
                    <p className="title">
                      If you're someone in{" "}<br/>
                      <span className="title" style={{ color: "#f5c984" }}>
                        Venture Capital
                      </span>...
                    </p>

                    <p className="subtitle p-2">Find Potential Investments</p>
                    <p>
                      With Pitch, dont kill my vibe, you can now discover
                      innovative startup ideas and engage with founders. Like
                      ideas that catch your interest and leave valuable
                      feedback. You can also view previous pitches that you have
                      liked and update any comments you see fit. Reach out to
                      promising entrepreneurs early on and build connections.{" "}
                    </p>
                    {props.userType === "" && (
                      <Link href="/login">
                        <button
                          className={`button mt-4 ${antonio.className}`}
                          style={{ color: "#f5c984" }}
                        >
                          Pitch, betta have my money
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="card is-fullheight p-5 m-4">
                  <div className="card-content has-text-centered">
                    <div className="columns is-centered is-multiline m-4">
                      <div className="column is-one-third">
                        <img className="is-128x128" src="/192-lightbulb.png" />
                      </div>
                      <div className="column is-one-third">
                        <img className="is-128x128" src="/192-lightbulb.png" />
                      </div>
                      <div className="column is-one-third">
                        <img className="is-128x128" src="/192-lightbulb.png" />
                      </div>
                    </div>
                    <p className="title">
                      If you're someone with <br />
                      <span style={{ color: "#f5c984" }}>good ideas</span>
                      ...
                    </p>
                    <p className="subtitle p-2">
                      Pitch your ideas to investors
                    </p>
                    <p>
                      With Pitch, dont kill my vibe, you can pitch your
                      innovative ideas and receive feedback from venture
                      capitalists at low stakes. Seamlessly connect with
                      potential investors and gauge interest in your startup
                      based on likes and dislikes. Read detailed feedback from
                      investors and use that to make informed decisions about
                      your business direction.
                    </p>
                    {props.userType === "" && (
                      <Link href="/login">
                        <button
                          className={`button is-secondary mt-4 ${antonio.className}`}
                          style={{ color: "#f5c984" }}
                        >
                          Pitch, please
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
