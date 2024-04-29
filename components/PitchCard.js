import * as db from "../database";
import Link from "next/link";

export default function PitchCard({ pitch, getPitches, viewOnly, userType }) {
  const pitchScore = pitch.likes?.length - pitch.dislikes?.length;

  const formatDate = (now) => {
    const current = new Date(now);
    const yyyy = current.getFullYear();
    let mm = current.getMonth() + 1;
    let dd = current.getDate();
    let suffix = current.getHours() >= 12 ? "PM" : "AM";
    let hr = ((current.getHours() + 11) % 12) + 1;
    let min = current.getMinutes();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (min < 10) min = "0" + min;

    const formattedToday =
      mm + "/" + dd + "/" + yyyy + ", " + hr + ":" + min + " " + suffix;
    return formattedToday;
  };
  return (
    <div className="box columns m-2 is-vcentered">
      {userType === "Pitcher" && !viewOnly && (
        <div className="column is-1 is-size-3">{pitchScore}</div>
      )}
      <div
        className={`column ${userType === "Pitcher" && "is-three-quarters"} has-text-left`}
      >
        <Link href={`/app/pitches/${pitch.id}`}>
          <div className="has-text-weight-bold is-size-4">
            {pitch.pitchTitle}
          </div>
          <div className="is-size-5">{pitch.pitchDescription}</div>
          <div className="pt-2">
            Pitched by <strong>{pitch.pitchCreatorName}</strong> on{" "}
            {formatDate(pitch.pitchDate)}
          </div>
        </Link>
      </div>

      {userType === "Pitcher" && !viewOnly && (
        <div className="column has-text-right">
          <button
            className="button is-warning mr-2"
            onClick={async (event) => {
              //   await db.deleteComment(pitch.id);
              await getPitches();
            }}
          >
            <span class="icon">
              <i class="fas fa-edit"></i>
            </span>
          </button>
          <button
            className="button is-danger"
            onClick={async (event) => {
              await db.deletePitch(pitch.id);
              await getPitches();
            }}
          >
            <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
