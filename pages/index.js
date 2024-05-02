import Link from "next/link";
import Sparkles from 'react-sparkle';
import { Antonio } from "next/font/google";

const antonio = Antonio({ subsets: ["latin"] });

export default function Home(props) {
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
          <p className={`title has-text-white ${antonio.className}`}style={{ position: "relative" , letterSpacing: "-1px"}}>
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
            <button className="button">
              {renderButtonText(props.userType)}
            </button>
          </Link>
        </div>
      </div>
      <div className="section hero is-fullheight is-vcentered has-background-white">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <p className="title">Find Potential Investments</p>
                <p>Discover promising startups and investment opportunities.</p>
              </div>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <p className="title">Pitch Your Ideas</p>
                <p>
                  Showcase your innovative ideas and get feedback from
                  investors.
                </p>
              </div>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <p className="title">Network with Professionals</p>
                <p>
                  Connect with like-minded entrepreneurs and industry experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
