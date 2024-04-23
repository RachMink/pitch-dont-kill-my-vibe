import Pitch from "@/components/Pitch";
import { useState, useEffect } from "react";
import * as db from "../../database";

export default function SwipePage(props) {
  const [pitches, setPitches] = useState([]);

  const getUnreadPitches = async () => {
    const allPitches = await db.getAllPitches();
    setPitches(allPitches);
  };

  useEffect(() => {
    getUnreadPitches();
  }, []);

  let pitchText =
    "A flying car which can transport you from point A to point B";
  let pitchAuthor = "Smarty Pants Johnson";
  //   let words = pitchText.split(" ");
  //   let result = words.join("+");
  const samplePitch = {
    pitchDescription: pitchText,
    pitchCreatorName: pitchAuthor,
  };

  return (
    <div>
      <div className="title has-text-white has-text-centered">Swipe</div>
      <div className="subtitle has-text-white has-text-centered">
        Like, dislike, or comment on new ideas.
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {pitches.length > 0 ? (
          <div className="has-text-centered">
            <Pitch pitch={pitches[0]} user={props.user.email} />
            <div className="columns m-0 mt-4">
              <input
                className="input is-four-fifths column"
                type="text"
                placeholder="Enter comment"
              />
              <button className="button is-primary ml-1">Submit</button>
            </div>
          </div>
        ) : (
          <p>Loading pitches</p>
        )}
      </div>
    </div>
  );
}
