import * as db from "../database";
import { useReward } from "react-rewards";

export default function Pitch({ pitch, user, getUnreadPitches }) {
  // const { reward, isAnimating } = useReward("rewardId", "confetti");
  const { reward: likeReward, isAnimating: isLikeAnimating } = useReward(
    "likeRewardsId",
    "emoji",
    { lifetime: 1000, elementCount: 4, emoji: ["❤️"] }
  );
  const { reward: dislikeReward, isAnimating: isDislikeAnimating } = useReward(
    "dislikeRewardsId",
    "emoji",
    { lifetime: 1000, elementCount: 4, emoji: ["👎"] }
  );

  const onPitchLiked = async () => {
    await db.likePitch(pitch.id, user);
    // load next pitch
    getUnreadPitches();
  };

  const onPitchDisliked = async () => {
    await db.dislikePitch(pitch.id, user);
    // load next pitch
    getUnreadPitches();
  };

  return (
    <div
      className="card"
      style={{
        height: "450px",
        width: "450px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `${pitch.pitchColor}` || "white",
      }}
    >
      <div className="card-content">
        <p className="title is-5">{pitch.pitchTitle}</p>
        <p className="title">{pitch.pitchDescription}</p>
        <p className="subtitle is-6 mt-2">@{pitch.pitchCreatorName}</p>
      </div>
      <footer
        className="card-footer"
        style={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <button
          href="#"
          className="button card-footer-item has-background-danger p-0"
          disabled={isDislikeAnimating}
          onClick={() => {
            onPitchDisliked();
            dislikeReward();
          }}
        >
          <span id="dislikeRewardsId" />
          <img
            src="/cross-small.svg"
            style={{ height: "100%", width: "15%" }}
          ></img>
        </button>
        <button
          href="#"
          className="button card-footer-item has-background-success p-0"
          disabled={isLikeAnimating}
          onClick={() => {
            onPitchLiked();
            likeReward();
          }}
        >
          <span id="likeRewardsId" />
          <img src="/heart.svg" style={{ height: "100%", width: "13%" }}></img>
        </button>
      </footer>
    </div>
  );
}
