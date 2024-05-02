import { useRouter } from "next/router";
import PitchCard from "@/components/PitchCard";
import CommentCard from "@/components/CommentCard";
import * as db from "../../../database";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Hourglass } from "react-loader-spinner";
import { Antonio, Anybody } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const antonio = Antonio({ subsets: ["latin"] });

export default function PitchSpecificPage(props) {
  const router = useRouter();
  const [currentPitch, setCurrentPitch] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let currentPitchId;

  const getCurrentPitch = async () => {
    setIsLoading(true);
    currentPitchId = currentPitchId
      ? currentPitchId
      : localStorage.getItem("storedPitchId");

    const current = await db.getSpecificPitch(currentPitchId);

    current.comments.sort((a, b) => b.commentDate - a.commentDate);
    setCurrentPitch(current);
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.query.pitchId) {
      localStorage.setItem("storedPitchId", router.query.pitchId);
      currentPitchId = router.query.pitchId;
    } else if (router.query.pitchId === undefined) {
      currentPitchId = localStorage.getItem("storedPitchId");
    }
    getCurrentPitch();
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

    await getCurrentPitch();
    // Clear the input field value
    e.target["pitch-comment"].value = "";
  };

  return (
    <>
      {isLoading ? ( // Render Spinner if loading, else render content
        <div className="columns mt-4 ml-4 mr-4 mb-6">
          <div className="column has-text-centered mt-2 ml-5 mr-5 mb-6">
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#ffffff", "#f5c984"]}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="title has-text-white has-text-centered mt-6">
            <span className={`${antonio.className}`}> Title: </span>
            <i>{currentPitch.pitchTitle}</i>
          </div>
          {props.userType === "Pitcher" && (
            <div className="has-text-centered">
              <Link href="/app/pitches">
                <button className="button">View All Pitches</button>
              </Link>
            </div>
          )}
          {props.userType === "Venture Capital" && (
            <div className="has-text-centered">
              <Link href="/app/likes">
                <button className={`button is-secondary ${antonio.className}`}>
                  Back To Your Likes
                </button>
              </Link>
            </div>
          )}

          <div className="columns m-5">
            <div
              className={`column has-text-centered is-three-fifths ${props.userType === "Pitcher" ? "is-offset-one-fifth" : ""}`}
            >
              <div
                style={{
                  background: "rgba(255,255,255, 0.2)",
                  padding: "30px",
                  borderRadius: "10px",
                  border: "3px solid rgba(251,226,91)",
                }}
              >
                <p
                  className={`is-size-4 has-text-white has-text-weight-semibold	pb-2 ${antonio.className}`}
                >
                  About This Pitch
                </p>
                <PitchCard
                  pitch={currentPitch}
                  viewOnly={true}
                  userType={props.userType}
                ></PitchCard>
              </div>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  padding: "30px",
                  borderRadius: "10px",
                  // border: "1px solid white",
                }}
                className="mt-4"
              >
                <p
                  className={`is-size-4 has-text-white has-text-weight-semibold mt-4 pb-2 ${antonio.className}`}
                >
                  💬 Comments
                </p>
                {currentPitch.comments && currentPitch.comments.length > 0 ? (
                  currentPitch.comments.map((comment) => (
                    <CommentCard
                      comment={comment}
                      user={props.user}
                      userType={props.userType}
                      pitchId={router.query.pitchId}
                      getCurrentPitch={getCurrentPitch}
                      key={comment.commentId}
                    />
                  ))
                ) : (
                  <p>There are no comments yet</p>
                )}
              </div>
            </div>
            {props.userType === "Venture Capital" && (
              <div className="column has-text-centered">
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    padding: "30px",
                    borderRadius: "10px",
                    border: "1px solid white",
                  }}
                >
                  <p
                    className={`is-size-4 has-text-white has-text-weight-semibold pb-2 ${antonio.className}`}
                  >
                    ➕ Add a comment
                  </p>
                  <form onSubmit={(e) => onSubmit(e, currentPitch.id)}>
                    <textarea
                      className="textarea is-medium control mt-2"
                      type="text"
                      placeholder="Enter comment"
                      name="pitch-comment"
                      style={{ height: "400px" }}
                    />
                    <div className="pt-2"></div>
                    <div className="has-text-centered pt-4 pb-4 control">
                      <button
                        className={`button ${antonio.className}`}
                        style={{
                          color: "#f5c984",
                          border: "2px solid #f5c984",
                        }}
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
