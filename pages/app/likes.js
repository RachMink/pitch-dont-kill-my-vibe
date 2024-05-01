import PitchCard from "@/components/PitchCard";
import { useState, useEffect } from "react";
import * as db from "../../database";
import { Hourglass } from "react-loader-spinner";

export default function LikesPage(props) {
  const [likedPitches, setLikedPitches] = useState([]);
  const [dislikedPitches, setDislikedPitches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let currentEmail;

  const getPitches = async () => {
    setIsLoading(true);
    const allPitches = await db.getAllPitches();

    currentEmail = currentEmail
      ? currentEmail
      : localStorage.getItem("storedUserEmail");

    const onlyLikedPitches = allPitches.filter((pitch) =>
      pitch.likes.includes(currentEmail)
    );

    const onlyDislikedPitches = allPitches.filter((pitch) =>
      pitch.dislikes.includes(currentEmail)
    );

    setLikedPitches(onlyLikedPitches);
    setDislikedPitches(onlyDislikedPitches);
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.user?.email) {
      localStorage.setItem("storedUserEmail", props.user.email);
      currentEmail = props.user.email;
    } else if (props.user?.email === undefined) {
      currentEmail = localStorage.getItem("storedUserEmail");
    }
    getPitches();
  }, []);

  return (
    <div>
      <div>
        <div className="title has-text-white has-text-centered mt-6">
          My Likes
        </div>
        <div className="subtitle has-text-white has-text-centered">
          Click on pitch to add, edit, delete, or view comments.
        </div>
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
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          </div>
        ) : (
          <div className="columns mt-4 ml-4 mr-4 mb-6">
            <div className="column has-text-centered mt-2 ml-5 mr-5 mb-6">
              <p className="is-size-4 has-text-white has-text-weight-semibold pb-2">
                Liked Pitches
              </p>
              {likedPitches.length > 0 ? (
                likedPitches.map((pitch, index) => (
                  <PitchCard
                    pitch={pitch}
                    key={index}
                    getPitches={getPitches}
                  />
                ))
              ) : (
                <p className="mt-6 subtitle has-text-white">
                  There are no liked pitches to display.
                </p>
              )}
            </div>
            <div className="column has-text-centered mt-2 ml-5 mr-5 mb-6">
              <p className="is-size-4 has-text-white has-text-weight-semibold pb-2">
                Disliked Pitches
              </p>
              {dislikedPitches.length > 0 ? (
                dislikedPitches.map((pitch, index) => (
                  <PitchCard
                    pitch={pitch}
                    key={index}
                    getPitches={getPitches}
                  />
                ))
              ) : (
                <p className="mt-6 subtitle has-text-white">
                  There are no disliked pitches to display.
                </p>
              )}{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
