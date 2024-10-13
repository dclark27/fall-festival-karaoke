import { getSignups } from "../actions";
import KaraokeAdmin from "@/components/karaoke-admin";

export default async function Page() {
  const signups = await getSignups();

  return <KaraokeAdmin initialSignups={signups} />;
}
