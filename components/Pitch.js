export default function Pitch({ pitchBody, pitchAuthor }) {
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
        <p className="title">“{pitchBody}”</p>
        <p className="subtitle mt-2">{pitchAuthor}</p>
      </div>
      <footer
        className="card-footer"
        style={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <a href="#" className="card-footer-item has-background-danger">
          <img
            src="/cross-small.svg"
            style={{ height: "100%", width: "20%" }}
          ></img>
        </a>
        <a href="#" className="card-footer-item has-background-success">
          <img src="/heart.svg" style={{ height: "100%", width: "15%" }}></img>
        </a>
      </footer>
    </div>
  );
}
