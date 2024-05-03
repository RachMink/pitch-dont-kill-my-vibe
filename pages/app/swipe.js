import Pitch from "@/components/Pitch";
import { useState, useEffect } from "react";
import * as db from "../../database";
import { Hourglass } from "react-loader-spinner";
import { Antonio, Anybody } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const antonio = Antonio({  subsets: ["latin"] });
const anybody = Anybody({ weight: "300", subsets: ["latin"] });

export default function SwipePage(props) {
  const [pitches, setPitches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

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

    // Set submission success state to true
    setSubmissionSuccess(true);

    // Reset submission success state after 3 seconds
    setTimeout(() => {
      setSubmissionSuccess(false);
    }, 3000);
  };

  return (
    <div>
      <div
        className={`title has-text-white has-text-centered mt-4 ${antonio.className}`}
      >
        Swipe
      </div>
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
                  user={props.user?.email}
                  getUnreadPitches={getUnreadPitches}
                />
                {/* <div className="subtitle has-text-white has-text-centered mt-4 mb-2">
                  You can leave feedback before you swipe.
                </div> */}
                <div className="columns m-0 mt-2">
                  <form
                    onSubmit={(e) => onSubmit(e, pitches[0].id)}
                    style={{ display: "contents" }}
                  >
                    <input
                      className="input is-four-fifths column"
                      type="text"
                      placeholder="leave a comment before you swipe"
                      name="pitch-comment"
                    />
                    <button
                      className={`button ml-1 is-hovered ${anybody.className}`}
                    >
                      Submit
                    </button>
                  </form>
                </div>
                {submissionSuccess ? (
                  <p className="has-text-light mt-1">Comment Added</p>
                ) : (
                  <p className="mt-1">&nbsp;</p>
                )}
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
