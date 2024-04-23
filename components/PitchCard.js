import * as db from "../database";

export default function PitchCard({ pitch, getPitches }) {
  const pitchScore = pitch.likes?.length - pitch.dislikes?.length;

  // TODO: Don't show score and delete button as VC role

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
      <div className="column is-1 is-size-3">{pitchScore}</div>
      <div className="column is-four-fifths has-text-left">
        <div className="has-text-weight-bold is-size-4">{pitch.pitchTitle}</div>
        <div className="is-size-5">{pitch.pitchDescription}</div>
        <div className="pt-2">
          Pitched by <strong>{pitch.pitchCreatorName}</strong> on{" "}
          {formatDate(pitch.pitchDate)}
        </div>
      </div>
      <div className="column has-text-right">
        <button
          className="button is-danger"
          onClick={async (event) => {
            await db.deletePitch(pitch.id);
            await getPitches();
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}
