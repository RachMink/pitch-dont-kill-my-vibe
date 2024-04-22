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
          Dislike
        </a>
        <a href="#" class="card-footer-item has-background-success">
          Like
        </a>
      </footer>
    </div>
  );
};

export default Pitch;
