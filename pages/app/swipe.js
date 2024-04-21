export default function SwipePage() {
  //   let pitchText =
  //     "A flying car which can transport you from point A to point B";
  //   let words = pitchText.split(" ");
  //   let result = words.join("+");

  return (
    <div>
      <div class="title has-text-white has-text-centered">Swipe</div>
      <div class="subtitle has-text-white has-text-centered">
        Like, dislike, or comment on new ideas.
      </div>

      <div class="hero-body columns is-vcentered is-centered">
        <div className="column has-text-centered">
          <figure>
            <img
              //   src={`https://dummyimage.com/450x450/ffffff/030303&text=${result}`}
              src="https://dummyimage.com/400x400/ffffff/030303&text=This+is+a+pitch."
            ></img>
          </figure>
        </div>
        <div className="column has-text-centered">
          <p>Column 2</p>
        </div>
      </div>
    </div>
  );
}
