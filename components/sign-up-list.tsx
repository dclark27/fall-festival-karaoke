import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Signup } from "@prisma/client";
import { MusicIcon } from "lucide-react";

export const SignUpList = ({ signups }: { signups: Signup[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Current Signups</CardTitle>
      </CardHeader>
      <CardContent>
        {signups.length === 0 ? (
          <p className="text-center">No signups yet. Be the first!</p>
        ) : (
          <ul className="space-y-2">
            {signups.map((signup) => (
              <li
                key={signup.id}
                className="flex items-center space-x-2 p-2 bg-primary rounded-md text-white font-bold"
              >
                <MusicIcon className="size-6" />
                <span>{signup.name}</span>
                <span>-</span>
                <span className="italic">{signup.song}</span>
                <span>by</span>
                <span>{signup.artist}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
