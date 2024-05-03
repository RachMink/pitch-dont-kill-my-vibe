import * as db from "../database";
import { useReward } from "react-rewards";
import { Antonio, IBM_Plex_Sans, Lora } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const antonio = Antonio({ subsets: ["latin"] });
const ibm_sans = IBM_Plex_Sans({ weight: "300", subsets: ["latin"] });
const lora = Lora({weight: "500", subsets: ["latin"] });


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
        height: "440px",
        width: "450px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `${pitch.pitchColor}` || "white",
        color: `${pitch.pitchFontColor}` || "black",
      }}
    >
      <div
        className={`card-content ${ibm_sans.className} `}
        style={{ height: "50%" }}
      >
        <p className="is-size-5">{pitch.pitchTitle}:</p>
        <p className={`is-size-2`}>{pitch.pitchDescription}</p>
        <p className="is-size-6 mt-2">@{pitch.pitchCreatorName}</p>
      </div>
      <footer
        className="card-footer p-3"
        style={{
          border: "0",
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
      >
        <button
          href="#"
          className="button m-1 mr-2 card-footer-item is-large"
          disabled={isDislikeAnimating}
          style={{ boxShadow: "0px 0px 30px 2px #ffffff" }}
          onClick={() => {
            onPitchDisliked();
            dislikeReward();
          }}
        >
          <span id="dislikeRewardsId" className="icon" />
          👎
        </button>
        <button
          href="#"
          className="button m-1 ml-2 card-footer-item is-large is-outlined"
          disabled={isLikeAnimating}
          style={{ boxShadow: "0px 0px 30px 2px #ffffff" }}
          onClick={() => {
            onPitchLiked();
            likeReward();
          }}
        >
          <span id="likeRewardsId" className="icon" />
          ❤️
        </button>
      </footer>
    </div>
  );
}
