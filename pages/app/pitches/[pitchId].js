import { useRouter } from "next/router";
import PitchCard from "@/components/PitchCard";
import * as db from "../../../database";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PitchSpecificPage(props) {
  const router = useRouter();
  const [currentPitch, setCurrentPitch] = useState({});

  const getCurrentPitch = async () => {
    // console.log(router.query.pitchId);
    const current = await db.getSpecificPitch(router.query.pitchId);
    // console.log(current);
    setCurrentPitch(current);
    // console.log(current);
  };

  useEffect(() => {
    getCurrentPitch();
  }, []);

  //   console.log(currentPitch);

  return (
    <div>
      <div className="title has-text-white has-text-centered">
        Viewing <i>{currentPitch.pitchTitle}</i>
      </div>
      <div className="has-text-centered">
        <Link href="/app/pitches">
          <button className="button">View All Pitches</button>
        </Link>
      </div>

      <div className="columns m-5">
        <div className="column has-text-centered is-three-fifths">
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            Highlighted Pitch
          </p>
          <PitchCard
            pitch={currentPitch}
            viewOnly={true}
            userType={props.userType}
          ></PitchCard>
        </div>
        <div className="column has-text-centered">
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            Add a comment
          </p>
          <form onSubmit={(e) => console.log(e)}>
            {/* <div className="is-size-5 pt-2">
              Enter a name for your idea (optional)
            </div> */}
            <input
              className="input is-medium control mt-2"
              type="text"
              placeholder="Enter comment..."
              name="pitch-comment"
            />
            <div className="pt-2"></div>
            <div className="has-text-centered pt-4 pb-4 control">
              <button className="button is-primary">Comment</button>
            </div>
          </form>
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            View comments
          </p>
          {currentPitch.comments && currentPitch.comments.length > 0 ? (
            currentPitch.comments.map((comment) => (
              <div className="mb-5">
                <p>
                  {JSON.stringify(comment.commenterName)} said{" "}
                  {JSON.stringify(comment.commentBody)}
                </p>
                <p></p>
              </div>
            ))
          ) : (
            <p>There are no comments to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}
