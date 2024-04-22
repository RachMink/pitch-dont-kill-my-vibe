const PitchCard = (props) => {
  const { samplePitch } = props;
  return (
    <div className="box columns m-2 is-vcentered">
      <div className="column is-1 is-size-3">{samplePitch.score}</div>
      <div className="column has-text-left">
        <div className="has-text-weight-bold is-size-4">
          {samplePitch.title}
        </div>
        <div className="is-size-5">{samplePitch.description}</div>
        <div className="pt-2">Pitched on {samplePitch.date}</div>
      </div>
      <div className="column has-text-right">
        <button
          className="button is-danger"
          onClick={(event) => console.log("test")}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default PitchCard;
