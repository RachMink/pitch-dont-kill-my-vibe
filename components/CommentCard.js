import * as db from "../database";

export default function CommentCard({ comment, userType }) {
  const formatDate = (now) => {
    const current = new Date(now);
    const yyyy = current.getFullYear();
    let mm = current.getMonth() + 1;
    let dd = current.getDate();
    let suffix = current.getHours() >= 12 ? "PM" : "AM";
    let hr = ((current.getHours() + 11) % 12) + 1;
    let min = current.getMinutes();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (min < 10) min = "0" + min;

    const formattedToday =
      mm + "/" + dd + "/" + yyyy + ", " + hr + ":" + min + " " + suffix;
    return formattedToday;
  };

  return (
    <div className="box columns m-2 is-vcentered p-5">
      <div
        className={`column ${userType === "Pitcher" && "is-four-fifths"} has-text-left p-0`}
      >
        <div className="is-size-5">
          <i>"{comment.commentBody}"</i>
        </div>
        <div className="pt-2">
          Commented by <strong>{comment.commenterName}</strong> on{" "}
          {formatDate(comment.commentDate)}
        </div>
      </div>

      {userType === "Pitcher" && (
        <div className="column has-text-right">
          <button
            className="button is-warning mr-2"
            onClick={async (event) => {
              //   await db.deleteComment(pitch.id);
              //   await getPitches();
              console.log(event);
            }}
          >
            <span class="icon">
              <i class="fas fa-edit"></i>
            </span>
          </button>
          <button
            className="button is-danger"
            onClick={async (event) => {
              //   await db.deleteComment(pitch.id);
              //   await getPitches();
              console.log(event);
            }}
          >
            <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
