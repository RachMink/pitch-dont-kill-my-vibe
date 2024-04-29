import Pitch from "@/components/Pitch";
import { useState, useEffect } from "react";
import * as db from "../../database";

export default function SwipePage(props) {
  const [pitches, setPitches] = useState([]);

  const getUnreadPitches = async () => {
    const allPitches = await db.getAllPitches();
    const unreadPitches = allPitches.filter(
      (pitch) => !pitch.viewedBy.includes(props.user.email)
    );
    // console.log(unreadPitches);
    setPitches(unreadPitches);
  };

  useEffect(() => {
    props.userType === "Venture Capital" && getUnreadPitches();
  }, []);

  const onSubmit = async (e, pitchId) => {
    e.preventDefault();

    await db.addComment(pitchId, {
      // TODO: add unique id for deleting?
      commentId: Math.floor(Math.random() * 100000000),
      commenterEmail: props.user.email,
      commenterName: props.user.displayName,
      commentBody: e.target["pitch-comment"].value,
      commentDate: Date.now(),
    });

    // Clear the input field value
    e.target["pitch-comment"].value = "";
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
            <Pitch
              pitch={pitches[0]}
              user={props.user.email}
              getUnreadPitches={getUnreadPitches}
            />
            <div className="columns m-0 mt-4">
              <form
                onSubmit={(e) => onSubmit(e, pitches[0].id)}
                style={{ display: "contents" }}
              >
                <input
                  className="input is-four-fifths column"
                  type="text"
                  placeholder="Enter comment"
                  name="pitch-comment"
                />
                <button className="button is-primary ml-1">Submit</button>
              </form>
            </div>
          </div>
        ) : (
          <p>There are no pitches to display.</p>
        )}
      </div>
    </div>
  );
}
