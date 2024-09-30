"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, MusicIcon } from "lucide-react";
import Image from "next/image";

interface Signup {
  id: string;
  name: string;
  song: string;
  artist: string;
  order: number;
}

export default function KaraokeSignup() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [name, setName] = useState("");
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    const response = await fetch("/api/signups");
    const data: Signup[] = await response.json();
    setSignups(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && song && artist) {
      const newSignup = {
        name,
        song,
        artist,
      };
      const response = await fetch("/api/signups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSignup),
      });
      if (response.ok) {
        fetchSignups();
        setName("");
        setSong("");
        setArtist("");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Image
        src="/pumpkin.png"
        alt="Fall Festival Logo"
        width={100}
        height={50}
        className="mx-auto"
      />
      <h1 className="text-2xl font-bold text-center mb-8">
        Fall Festival Karaoke Signup
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="song"
                className="block text-sm font-medium text-gray-700"
              >
                Song Title
              </label>
              <Input
                id="song"
                type="text"
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Enter song title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="artist"
                className="block text-sm font-medium text-gray-700"
              >
                Artist Name
              </label>
              <Input
                id="artist"
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!name || !song || !artist}
            >
              <MicIcon className="mr-2 h-4 w-4" /> Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Signups</CardTitle>
        </CardHeader>
        <CardContent>
          {signups.length === 0 ? (
            <p className="text-center text-gray-500">
              No signups yet. Be the first!
            </p>
          ) : (
            <ul className="space-y-2">
              {signups.map((signup) => (
                <li
                  key={signup.id}
                  className="flex items-center space-x-2 p-2 bg-gray-100 rounded"
                >
                  <MusicIcon className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{signup.name}</span>
                  <span className="text-gray-600">-</span>
                  <span className="italic">{signup.song}</span>
                  <span className="text-gray-600">by</span>
                  <span>{signup.artist}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
