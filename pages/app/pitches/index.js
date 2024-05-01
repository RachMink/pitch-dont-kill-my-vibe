import PitchCard from "@/components/PitchCard";
import * as db from "../../../database";
import { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";

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
      <div className="title has-text-white has-text-centered mt-6">
        My Pitches
      </div>
      <div className="subtitle has-text-white has-text-centered">
        Add, edit, or delete pitches. Click on pitch to add, edit, delete, or
        view comments.
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
              <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
                My current pitches
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
            <div className="column has-text-centered">
              <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
                Pitch a new idea
              </p>
              <form onSubmit={onSubmit}>
                <input
                  className="input is-medium control mt-2"
                  type="text"
                  placeholder="Title"
                  name="pitch-title"
                />
                <div className="pt-2"></div>
                <textarea
                  className="textarea is-medium control"
                  type="text"
                  placeholder="Description"
                  name="pitch-description"
                />
                <div className="field">
                  <label className="label has-text-white mt-2">
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
                <div className="has-text-centered pt-4 pb-4 control">
                  <button className="button is-primary">Pitch Idea</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
