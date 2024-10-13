import { getSignups } from "../actions";
import KaraokeAdmin from "@/components/karaoke-admin";

export default async function Page() {
  const signups = await getSignups();

  return (
    <div className="container mx-auto max-w-md px-2">
      <KaraokeAdmin initialSignups={signups} />
    </div>
  );
}
