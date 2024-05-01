import { useRouter } from "next/router";
import PitchCard from "@/components/PitchCard";
import CommentCard from "@/components/CommentCard";
import * as db from "../../../database";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PitchSpecificPage(props) {
  const router = useRouter();
  const [currentPitch, setCurrentPitch] = useState({});
  let currentPitchId;

  const getCurrentPitch = async () => {
    currentPitchId = currentPitchId
      ? currentPitchId
      : localStorage.getItem("storedPitchId");

    const current = await db.getSpecificPitch(currentPitchId);

    current.comments.sort((a, b) => b.commentDate - a.commentDate);
    setCurrentPitch(current);
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
    <div>
      <div className="title has-text-white has-text-centered mt-6">
        Viewing <i>{currentPitch.pitchTitle}</i>
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
            <button className="button">Back To Your Likes</button>
          </Link>
        </div>
      )}

      <div className="columns m-5">
        <div
          className={`column has-text-centered ${props.userType === "Venture Capital" ? "is-three-fifths" : "is-full"}`}
        >
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            Highlighted Pitch
          </p>
          <PitchCard
            pitch={currentPitch}
            viewOnly={true}
            userType={props.userType}
          ></PitchCard>
          <p className="is-size-4 has-text-white has-text-weight-semibold mt-4 pb-2">
            Comments
          </p>
          {currentPitch.comments && currentPitch.comments.length > 0 ? (
            currentPitch.comments.map((comment) => (
              <CommentCard
                comment={comment}
                user={props.user}
                userType={props.userType}
                pitchId={router.query.pitchId}
                getCurrentPitch={getCurrentPitch}
              />
            ))
          ) : (
            <p>There are no comments to display.</p>
          )}
        </div>
        {props.userType === "Venture Capital" && (
          <div className="column has-text-centered">
            <p className="is-size-4 has-text-white has-text-weight-semibold pb-2">
              Add a comment
            </p>
            <form onSubmit={(e) => onSubmit(e, currentPitch.id)}>
              <textarea
                className="textarea is-medium control mt-2"
                type="text"
                placeholder="Enter comment"
                name="pitch-comment"
              />
              <div className="pt-2"></div>
              <div className="has-text-centered pt-4 pb-4 control">
                <button className="button is-primary">Comment</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
