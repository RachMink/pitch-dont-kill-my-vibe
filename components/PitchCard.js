import * as db from "../database";

export default function PitchCard({ pitch, getPitches }) {
  const pitchScore = pitch.likes?.length - pitch.dislikes?.length;

  return (
    <div className="box columns m-2 is-vcentered">
      <div className="column is-1 is-size-3">{pitchScore}</div>
      <div className="column has-text-left">
        <div className="has-text-weight-bold is-size-4">{pitch.pitchTitle}</div>
        <div className="is-size-5">{pitch.pitchDescription}</div>
        <div className="pt-2">Pitched on {pitch.pitchDate}</div>
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
