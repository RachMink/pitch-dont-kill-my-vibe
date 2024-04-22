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
      <div class="title has-text-white has-text-centered mt-6">My Pitches</div>
      <div class="subtitle has-text-white has-text-centered">
        Create new pitches or view old ones.
      </div>
      <div class="columns m-5">
        <div className="column has-text-centered is-three-fifths">
          <p class="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            My current pitches
          </p>
          {samplePitches.map((samplePitch, index) => (
            <PitchCard samplePitch={samplePitch} />
          ))}
        </div>
        <div className="column has-text-centered">
          <p class="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            Pitch a new idea
          </p>
          <form onSubmit={(event) => console.log("test")}>
            {/* <div class="is-size-5 pt-2">
              Enter a name for your idea (optional)
            </div> */}
            <input
              class="input is-medium control mt-2"
              type="text"
              placeholder="Title"
              name="pitchName"
            />
            <div class="pt-2"></div>
            {/* <div class="is-size-5 pt-2">Describe your idea in few lines</div> */}
            <textarea
              class="textarea is-medium control"
              type="text"
              placeholder="Description"
              name="pitchDescription"
            />
            <div class="has-text-centered pt-4 pb-4 control">
              <button class="button is-primary">Pitch Idea</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
