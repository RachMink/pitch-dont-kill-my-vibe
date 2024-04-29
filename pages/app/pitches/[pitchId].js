import { useRouter } from "next/router";

export default function PitchSpecificPage() {
  const router = useRouter();

  return <div>{router.query.pitchId}</div>;
}
