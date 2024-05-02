import PitchCard from "@/components/PitchCard";
import * as db from "../../../database";
import { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import { Antonio } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const antonio = Antonio({ weight: ["300", "400"], subsets: ["latin"] });

export default function PitchPage(props) {
  const [pitches, setPitches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let currentEmail;

  const getPitches = async () => {
    setIsLoading(true);
    const allPitches = await db.getAllPitches();

    currentEmail = currentEmail
      ? currentEmail
      : localStorage.getItem("storedUserEmail");

    const pitchesExcludingCurrentUser = allPitches.filter(
      (pitch) => pitch.pitchCreatorEmail === currentEmail
    );

    const pitchesSortedByHighest = pitchesExcludingCurrentUser.sort(
      (a, b) =>
        b.likes.length -
        b.dislikes.length -
        (a.likes.length - a.dislikes.length)
    );

    setPitches(pitchesSortedByHighest);
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

  const onSubmit = async (e) => {
    e.preventDefault();

    await db.createPitch({
      pitchCreatorEmail: props.user.email,
      pitchCreatorName: props.user.displayName,
      pitchTitle: e.target["pitch-title"].value,
      pitchDescription: e.target["pitch-description"].value,
      pitchColor: e.target["pitch-color"].value,
      pitchFontColor: e.target["pitch-font-color"].value,
      pitchDate: Date.now(),
      likes: [],
      dislikes: [],
      viewedBy: [],
      comments: [],
    });

    await getPitches();
    e.target["pitch-title"].value = "";
    e.target["pitch-description"].value = "";
  };

  return (
    <div>
      <div
        className={`title has-text-white has-text-centered mt-6 ${antonio.className}`}
      >
        My Pitches
      </div>
      <div className="subtitle has-text-white has-text-centered mt-1">
        Add ➕ , edit ✏️ and delete 🗑️ pitches <br /> Click on pitch to view 👀
        comments
      </div>

      {isLoading ? (
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
        <>
          <div className="columns m-5">
            <div className="column has-text-centered is-three-fifths">
              <p
                className={`is-size-4 has-text-white has-text-weight-semibold pb-2 ${antonio.className}`}
              >
                My live pitches
              </p>
              {pitches.length > 0 ? (
                pitches.map((pitch, index) => (
                  <PitchCard
                    pitch={pitch}
                    getPitches={getPitches}
                    userType={props.userType}
                    key={index}
                  />
                ))
              ) : (
                <p className="mt-6 subtitle has-text-white">
                  There are no pitches to display.
                </p>
              )}
            </div>
            <div
              className="column has-text-centered"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid white",
              }}
            >
              <p
                className={`is-size-4 has-text-white has-text-weight-semibold	pb-2 ${antonio.className}`}
              >
                💡 Pitch a new idea
              </p>
              <form onSubmit={onSubmit}>
                <input
                  className="input is-medium control mt-2"
                  type="text"
                  placeholder="Title"
                  name="pitch-title"
                />
                <textarea
                  className="textarea is-medium control mt-4"
                  type="text"
                  placeholder="Description"
                  name="pitch-description"
                />

                <div className="field mt-4">
                  <div className="is-flex is-align-items-center">
                    <label
                      className={`label has-text-white mt-4 mr-4 ${antonio.className}`}
                      style={{ fontWeight: "300" }}
                    >
                      Choose Pitch Background Color:
                    </label>
                    <div className="control">
                      <input
                        defaultValue="#ffffff"
                        className="color is-medium control"
                        type="color"
                        name="pitch-color"
                        style={{ width: "100px", height: "50px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="is-flex is-align-items-center">
                    <label
                      className={`label has-text-white mt-4 mr-4 ${antonio.className}`}
                      style={{ fontWeight: "300" }}
                    >
                      Choose Pitch Font Color:
                    </label>
                    <div className="control">
                      <input
                        defaultValue="#ffffff"
                        className="color is-medium control"
                        type="color"
                        name="pitch-font-color"
                        style={{ width: "100px", height: "50px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="has-text-centered pt-4 pb-4 control">
                  <button
                    className={`button ${antonio.className}`}
                    // style={{ color: "#f5c984" }}
                  >
                    Pitch Idea
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
