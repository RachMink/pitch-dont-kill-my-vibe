export default function Pitch({ pitch }) {
  return (
    <div
      className="card"
      style={{
        height: "450px",
        width: "450px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card-content">
        <p className="title">“{pitch.pitchDescription}”</p>
        <p className="subtitle mt-2">{pitch.pitchCreatorName}</p>
      </div>
      <footer
        className="card-footer"
        style={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <button
          href="#"
          className="button card-footer-item has-background-danger p-0"
          onClick={(event) => console.log("disliked")}
        >
          <img
            src="/cross-small.svg"
            style={{ height: "100%", width: "15%" }}
          ></img>
        </button>
        <button
          href="#"
          className="button card-footer-item has-background-success p-0"
          onClick={(event) => console.log("liked")}
        >
          <img src="/heart.svg" style={{ height: "100%", width: "13%" }}></img>
        </button>
      </footer>
    </div>
  );
}
