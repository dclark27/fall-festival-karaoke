"use client";

import { useState } from "react";
import { ChevronUp, MicIcon, MusicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Signup } from "@prisma/client";
import { ScrollingText } from "./scrolling-text";
import Image from "next/image";

export const SignUpList = ({ signups }: { signups: Signup[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentSong = signups[0];
  const upcomingSongs = signups.slice(1);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full p-4 h-24 rounded-none border-t"
        >
          <div className="flex flex-row justify-between w-full items-center gap-4">
            {currentSong && (
              <div className="flex flex-col items-start flex-grow">
                <div className="animate-pulse flex flex-row gap-2 w-full items-center font-bold text-lg">
                  <MusicIcon />
                  <span>{currentSong.name}</span>
                </div>

                <ScrollingText
                  className="animate-pulse"
                  text={`${currentSong.song} by ${currentSong.artist}`}
                />
              </div>
            )}
            {!currentSong && (
              <>
                <span> {"It's just cobwebs here"}</span>
                <Image
                  src={"/spiderweb.png"}
                  width={96}
                  height={96}
                  className="object-cover"
                  alt="spiderweb"
                />
              </>
            )}
            <ChevronUp className="ml-2 h-4 w-4" />
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Upcoming Karaoke Songs</DrawerTitle>
          <DrawerDescription>
            Scroll to see all upcoming performances
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[50vh] px-4">
          {upcomingSongs.length > 0 &&
            upcomingSongs.map((signup) => (
              <div key={signup.id} className="mb-4 p-4 border rounded-lg">
                <h3 className="font-semibold flex flex-row gap-1 items-center">
                  <MicIcon className="size-4" />
                  {signup.name}
                </h3>
                <ScrollingText text={`${signup.song} by ${signup.artist}`} />
              </div>
            ))}
          {upcomingSongs.length === 0 && (
            <div className="flex flex-col justify-center items-center">
              <span>No signups, be the first!</span>
              <Image
                src={"/spiderweb.png"}
                width={384}
                height={384}
                className="size-96"
                alt="spiderweb"
              />
            </div>
          )}
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
