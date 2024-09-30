"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MusicIcon, ArrowUpIcon, ArrowDownIcon, XIcon } from "lucide-react";

interface Signup {
  id: string;
  name: string;
  song: string;
  artist: string;
  order: number;
}

export default function KaraokeAdmin() {
  const [signups, setSignups] = useState<Signup[]>([]);

  const fetchSignups = async () => {
    const response = await fetch("/api/signups");
    const data: Signup[] = await response.json();
    setSignups(data);
  };

  useEffect(() => {
    fetchSignups();
  }, []);

  const moveSignup = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < signups.length - 1)
    ) {
      const newSignups = [...signups];
      const temp = newSignups[index];
      newSignups[index] = newSignups[index + (direction === "up" ? -1 : 1)];
      newSignups[index + (direction === "up" ? -1 : 1)] = temp;
      setSignups(newSignups);

      await fetch("/api/signups", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSignups),
      });
      fetchSignups();
    }
  };

  const removeSignup = async (id: string) => {
    await fetch("/api/signups", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchSignups();
  };

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
              {signups.map((signup, index) => (
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
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveSignup(index, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveSignup(index, "down")}
                      disabled={index === signups.length - 1}
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeSignup(signup.id)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
