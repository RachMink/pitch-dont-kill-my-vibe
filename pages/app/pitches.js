import PitchCard from "@/components/PitchCard";
import * as db from "../../database";
import { useState, useEffect } from "react";

export default function PitchPage(props) {
  const [pitches, setPitches] = useState([]);

  const getPitches = async () => {
    const allPitches = await db.getAllPitches();
    setPitches(allPitches);
  };

  useEffect(() => {
    getPitches();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await db.createPitch({
      // TODO: store id with pitch?
      pitchCreatorEmail: props.user.email,
      pitchCreatorName: props.user.displayName,
      pitchTitle: e.target["pitch-title"].value,
      pitchDescription: e.target["pitch-description"].value,
      pitchDate: Date.now(),
      likes: [],
      dislikes: [],
      viewedBy: [],
      comments: [],
    });

    await getPitches();
  };

  return (
    <div>
      <div className="title has-text-white has-text-centered mt-6">
        My Pitches
      </div>
      <div className="subtitle has-text-white has-text-centered">
        Create new pitches or view old ones.
      </div>
      <div className="columns m-5">
        <div className="column has-text-centered is-three-fifths">
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            My current pitches
          </p>
          {pitches.length > 0 ? (
            pitches.map((pitch, index) => (
              <PitchCard
                pitch={pitch}
                getPitches={getPitches}
                userType={props.userType}
                key={index}
              />
            ))
          ) : (
            <p className="mt-6 subtitle has-text-white">
              There are no pitches to display.
            </p>
          )}
        </div>
        <div className="column has-text-centered">
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            Pitch a new idea
          </p>
          <form onSubmit={onSubmit}>
            {/* <div className="is-size-5 pt-2">
              Enter a name for your idea (optional)
            </div> */}
            <input
              className="input is-medium control mt-2"
              type="text"
              placeholder="Title"
              name="pitch-title"
            />
            <div className="pt-2"></div>
            {/* <div className="is-size-5 pt-2">Describe your idea in few lines</div> */}
            <textarea
              className="textarea is-medium control"
              type="text"
              placeholder="Description"
              name="pitch-description"
            />
            <div className="has-text-centered pt-4 pb-4 control">
              <button className="button is-primary">Pitch Idea</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
