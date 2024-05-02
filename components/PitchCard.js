import * as db from "../database";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PitchCard({ pitch, getPitches, viewOnly, userType }) {
  const [editMode, setEditMode] = useState(false);
  const [editedPitch, setEditedPitch] = useState({});
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

  const handleEdit = () => {
    setEditedPitch({
      pitchTitle: pitch.pitchTitle,
      pitchDescription: pitch.pitchDescription,
    });
    setEditMode(true);
  };

  const handleSubmitEdit = async () => {
    await db.editPitch(pitch.id, editedPitch);
    setEditMode(false);
    await getPitches();
  };

  return (
    <div
      className="box columns m-2 is-vcentered"
      style={{
        // border: `8px solid ${pitch.pitchColor}` || "white",
        background: `${pitch.pitchColor}` || "white",
        color: `${pitch.pitchFontColor}` || "black",
      }}
    >
      {userType === "Pitcher" && !viewOnly && (
        <div className="column is-1 is-size-3">{pitchScore}</div>
      )}
      <div
        className={`column ${userType === "Pitcher" && "is-three-quarters"} has-text-left`}
      >
        {editMode ? (
          <>
            <input
              className="input"
              type="text"
              value={editedPitch.pitchTitle}
              onChange={(e) =>
                setEditedPitch({ ...editedPitch, pitchTitle: e.target.value })
              }
            />
            <textarea
              className="textarea"
              rows="1"
              value={editedPitch.pitchDescription}
              onChange={(e) =>
                setEditedPitch({
                  ...editedPitch,
                  pitchDescription: e.target.value,
                })
              }
            />
          </>
        ) : (
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
        )}
      </div>

      {userType === "Pitcher" && !viewOnly && (
        <div className="column has-text-right">
          {editMode ? (
            <button
              className="button is-success mr-2"
              onClick={handleSubmitEdit}
            >
              <span className="icon">✅</span>
            </button>
          ) : (
            <button className="button is-warning mr-2" onClick={handleEdit}>
              <span className="icon">✏️</span>
            </button>
          )}

          <button
            className="button is-danger"
            onClick={async (event) => {
              await db.deletePitch(pitch.id);
              await getPitches();
            }}
          >
            <span className="icon">🗑️</span>
          </button>
        </div>
      )}
    </div>
  );
}