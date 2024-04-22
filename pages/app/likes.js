export default function LikesPage() {
  return (
    <div>
      <div class="title has-text-white has-text-centered mt-6">My Likes</div>
      <div class="subtitle has-text-white has-text-centered">
        Pitches you've reacted to.
      </div>
      <div class="columns mt-4 ml-6 mr-6 mb-6">
        <div className="column has-text-centered mt-2 ml-6 mr-6 mb-6">
          <p class="is-size-4 has-text-white has-text-weight-semibold pb-2">
            Liked Pitches
          </p>
          {sampleLikes.map((samplePitch, index) => (
            <PitchCard samplePitch={samplePitch} />
          ))}
        </div>
        <div className="column has-text-centered">
          <p>Column 2</p>
        </div>
      </div>
    </div>
  );
}
