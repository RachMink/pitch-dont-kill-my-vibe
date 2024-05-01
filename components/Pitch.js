import * as db from "../database";

export default function Pitch({ pitch, user, getUnreadPitches }) {
  const onPitchLiked = async () => {
    await db.likePitch(pitch.id, user);
    // load next pitch
    getUnreadPitches();
  };

  const onPitchDisliked = async () => {
    await db.dislikePitch(pitch.id, user);
    // load next pitch
    getUnreadPitches();
  };

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
        background: `${pitch.pitchColor}` || "white",
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
          onClick={() => onPitchDisliked()}
        >
          <img
            src="/cross-small.svg"
            style={{ height: "100%", width: "15%" }}
          ></img>
        </button>
        <button
          href="#"
          className="button card-footer-item has-background-success p-0"
          onClick={() => onPitchLiked()}
        >
          <img src="/heart.svg" style={{ height: "100%", width: "13%" }}></img>
        </button>
      </footer>
    </div>
  );
}
