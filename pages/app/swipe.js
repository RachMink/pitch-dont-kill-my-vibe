import Pitch from "@/components/Pitch";

export default function SwipePage() {
  let pitchText =
    "A flying car which can transport you from point A to point B";
  let pitchAuthor = "Smarty Pants Johnson";
  //   let words = pitchText.split(" ");
  //   let result = words.join("+");

  return (
    <div>
      <div className="title has-text-white has-text-centered">Swipe</div>
      <div className="subtitle has-text-white has-text-centered">
        Like, dislike, or comment on new ideas.
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="has-text-centered">
          <Pitch pitchBody={pitchText} pitchAuthor={pitchAuthor} />
          <div className="columns m-0 mt-4">
            <input
              className="input is-four-fifths column"
              type="text"
              placeholder="Enter comment"
            />
            <button className="button is-primary ml-1">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
