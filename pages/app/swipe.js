import Pitch from "@/components/Pitch";
import { useState, useEffect } from "react";
import * as db from "../../database";
import { Hourglass } from "react-loader-spinner";

export default function SwipePage(props) {
  const [pitches, setPitches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let currentEmail;

  const getUnreadPitches = async () => {
    setIsLoading(true);
    const allPitches = await db.getAllPitches();

    currentEmail = currentEmail
      ? currentEmail
      : localStorage.getItem("storedUserEmail");

    const unreadPitches = allPitches.filter(
      (pitch) => !pitch.viewedBy.includes(currentEmail)
    );

    setPitches(unreadPitches);
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.user?.email) {
      localStorage.setItem("storedUserEmail", props.user.email);
      currentEmail = props.user.email;
    } else if (props.user?.email === undefined) {
      currentEmail = localStorage.getItem("storedUserEmail");
    }
    getUnreadPitches();
  }, []);

  const onSubmit = async (e, pitchId) => {
    e.preventDefault();

    await db.addComment(pitchId, {
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
        {isLoading ? (
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#ffffff", "#f5c984"]}
          />
        ) : (
          <>
            {pitches.length > 0 ? (
              <div className="has-text-centered">
                <Pitch
                  pitch={pitches[0]}
                  user={currentEmail}
                  getUnreadPitches={getUnreadPitches}
                />
                <div className="subtitle has-text-white has-text-centered mt-4 mb-2">
                  You can leave feedback before you swipe.
                </div>
                <div className="columns m-0">
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
          </>
        )}
      </div>
    </div>
  );
}
