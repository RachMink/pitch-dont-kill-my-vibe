import Link from "next/link";

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
    <div className="hero-body columns is-vcentered is-centered">
      <div className="has-text-centered">
        <p className="title has-text-white">
          Welcome to <i>Pitch, don't kill my vibe</i>.
        </p>
        <p className="subtitle has-text-white">
          A place for founders and investors to level ideas.
        </p>
        <Link href={getRoute(props.userType)}>
          <button className="button">{renderButtonText(props.userType)}</button>
        </Link>
      </div>
    </div>
  );
}
