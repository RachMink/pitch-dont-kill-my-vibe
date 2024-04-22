const Pitch = ({ pitchBody, pitchAuthor }) => {
  return (
    <div
      class="card"
      style={{
        height: "450px",
        width: "450px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="card-content">
        <p class="title">“{pitchBody}”</p>
        <p class="subtitle mt-2">{pitchAuthor}</p>
      </div>
      <footer
        class="card-footer"
        style={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <a href="#" class="card-footer-item has-background-danger">
          <img
            src="/cross-small.svg"
            style={{ height: "100%", width: "20%" }}
          ></img>
        </a>
        <a href="#" class="card-footer-item has-background-success">
          <img src="/heart.svg" style={{ height: "100%", width: "15%" }}></img>
        </a>
      </footer>
    </div>
  );
};

export default Pitch;
