import PitchCard from "@/components/PitchCard";

export default function PitchPage() {
  let samplePitches = [
    {
      title: "This is a test",
      description: "This is the body",
      date: "01/02/2024",
      score: "6",
    },
    {
      title: "This is a test",
      description: "This is the body",
      date: "01/02/2024",
      score: "-1",
    },
  ];

  return (
    <div>
      <div className="title has-text-white has-text-centered mt-6">
        My Pitches
      </div>
      <div className="subtitle has-text-white has-text-centered">
        Create new pitches or view old ones.
      </div>
      <div className="hero-body columns is-vcentered is-centered">
        <div className="column has-text-centered is-three-fifths">
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            My current pitches
          </p>
          {samplePitches.map((samplePitch, index) => (
            <PitchCard samplePitch={samplePitch} key={index} />
          ))}
        </div>
        <div className="column has-text-centered has-background-link-dark box m-2">
          <p className="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            Pitch a new idea
          </p>
          <form onSubmit={(event) => console.log("test")}>
            {/* <div className="is-size-5 pt-2">
              Enter a name for your idea (optional)
            </div> */}
            <input
              className="input is-medium control"
              type="text"
              placeholder="Title"
              name="pitchName"
            />
            <div className="pt-2"></div>
            {/* <div className="is-size-5 pt-2">Describe your idea in few lines</div> */}
            <textarea
              className="textarea is-medium control"
              type="text"
              placeholder="Description"
              name="pitchDescription"
            />
            <div className="has-text-centered pt-4 pb-4 control">
              <button className="button is-primary">Pitch Idea</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
