import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MusicIcon } from "lucide-react";
import { getSignups } from "../actions";
import { EditSongsButton } from "@/components/edit-songs-buttons";

export default async function KaraokeAdmin() {
  const signups = await getSignups();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Karaoke Admin</h1>

      <Card>
        <CardHeader>
          <CardTitle>Manage Signup Queue</CardTitle>
        </CardHeader>
        <CardContent>
          {signups.length === 0 ? (
            <p className="text-center text-gray-500">
              No signups in the queue.
            </p>
          ) : (
            <ul className="space-y-2">
              {signups.map((signup) => (
                <li
                  key={signup.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <MusicIcon className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{signup.name}</span>
                    <span className="text-gray-600">-</span>
                    <span className="italic">{signup.song}</span>
                    <span className="text-gray-600">by</span>
                    <span>{signup.artist}</span>
                  </div>
                  <EditSongsButton rowId={signup.id} signups={signups} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
