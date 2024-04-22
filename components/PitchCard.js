const PitchCard = (props) => {
  const { samplePitch } = props;
  return (
    <div class="box columns m-2 is-vcentered">
      <div class="column is-1 is-size-3">{samplePitch.score}</div>
      <div class="column has-text-left">
        <div class="has-text-weight-bold is-size-4">{samplePitch.title}</div>
        <div class="is-size-5">{samplePitch.description}</div>
        <div class="pt-2">Pitched on {samplePitch.date}</div>
      </div>
      <div class="column has-text-right">
        <button
          class="button is-danger"
          onClick={(event) => console.log("test")}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default PitchCard;
