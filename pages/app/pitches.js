export default function PitchPage() {
  return (
    <div>
      <div class="title has-text-white has-text-centered">My Pitches</div>
      <div class="subtitle has-text-white has-text-centered">
        Create new pitches or view old ones.
      </div>
      <div class="hero-body columns is-vcentered is-centered">
        <div className="column has-text-centered is-three-fifths">
          <p>Column 1</p>
        </div>
        <div className="column has-text-centered has-background-link-dark box m-2">
          <p class="is-size-4 has-text-white has-text-weight-semibold	pb-2">
            Pitch a new idea
          </p>
          <form onSubmit={(event) => console.log("test")}>
            {/* <div class="is-size-5 pt-2">
              Enter a name for your idea (optional)
            </div> */}
            <input
              class="input is-medium control"
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
