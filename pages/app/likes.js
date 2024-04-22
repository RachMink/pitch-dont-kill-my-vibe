import PitchCard from "@/components/PitchCard";

export default function LikesPage() {
  let sampleLikes = [
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
  let sampleDislikes = [
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
        My Likes
      </div>
      <div className="subtitle has-text-white has-text-centered">
        Pitches you've reacted to.
      </div>
      <div className="columns mt-4 ml-6 mr-6 mb-6">
        <div className="column has-text-centered mt-2 ml-6 mr-6 mb-6">
          <p className="is-size-4 has-text-white has-text-weight-semibold pb-2">
            Liked Pitches
          </p>
          {sampleLikes.map((samplePitch, index) => (
            <PitchCard samplePitch={samplePitch} key={index} />
          ))}
        </div>
        <div className="column has-text-centered mt-2 ml-6 mr-6 mb-6">
          <p className="is-size-4 has-text-white has-text-weight-semibold pb-2">
            Disliked Pitches
          </p>
          {sampleDislikes.map((samplePitch, index) => (
            <PitchCard samplePitch={samplePitch} key={index} />
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
