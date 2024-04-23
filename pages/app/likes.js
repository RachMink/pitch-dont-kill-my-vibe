import PitchCard from "@/components/PitchCard";
import { useState, useEffect } from "react";
import * as db from "../../database";

export default function LikesPage(props) {
  const [likedPitches, setLikedPitches] = useState([]);
  const [dislikedPitches, setDislikedPitches] = useState([]);

  const getPitches = async () => {
    const allPitches = await db.getAllPitches();

    const onlyLikedPitches = allPitches.filter((pitch) =>
      pitch.likes.includes(props.user.email)
    );
    const onlyDislikedPitches = allPitches.filter((pitch) =>
      pitch.dislikes.includes(props.user.email)
    );
    setLikedPitches(onlyLikedPitches);
    setDislikedPitches(onlyDislikedPitches);
  };

  useEffect(() => {
    getPitches();
  }, []);

  return (
    <div>
      <div className="title has-text-white has-text-centered mt-6">
        My Likes
      </div>
      <div className="subtitle has-text-white has-text-centered">
        Pitches you've reacted to.
      </div>
      <div className="columns mt-4 ml-6 mr-6 mb-6">
        <div className="column has-text-centered mt-2 ml-6 mr-6 mb-6">
          <p className="is-size-4 has-text-white has-text-weight-semibold pb-2">
            Liked Pitches
          </p>
          {likedPitches.length > 0 ? (
            likedPitches.map((pitch, index) => (
              <PitchCard pitch={pitch} key={index} getPitches={getPitches} />
            ))
          ) : (
            <p className="mt-6 subtitle has-text-white">
              There are no liked pitches to display.
            </p>
          )}
        </div>
        <div className="column has-text-centered mt-2 ml-6 mr-6 mb-6">
          <p className="is-size-4 has-text-white has-text-weight-semibold pb-2">
            Disliked Pitches
          </p>
          {dislikedPitches.length > 0 ? (
            dislikedPitches.map((pitch, index) => (
              <PitchCard pitch={pitch} key={index} getPitches={getPitches} />
            ))
          ) : (
            <p className="mt-6 subtitle has-text-white">
              There are no disliked pitches to display.
            </p>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
