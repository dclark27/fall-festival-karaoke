"use client";

import { useState } from "react";
import { ChevronUp, MicIcon } from "lucide-react";
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
            <div className="flex flex-col items-start flex-grow">
              <div className="flex flex-row justify-between w-full items-center font-bold text-lg">
                <span>Up Now</span>
                <span>{currentSong.name}</span>
              </div>

              <ScrollingText
                text={`${currentSong.song} by ${currentSong.artist}`}
              />
            </div>
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
          {upcomingSongs.map((signup) => (
            <div key={signup.id} className="mb-4 p-4 border rounded-lg">
              <h3 className="font-semibold flex flex-row gap-1 items-center">
                <MicIcon className="size-4" />
                {signup.name}
              </h3>
              <ScrollingText text={`${signup.song} by ${signup.artist}`} />
            </div>
          ))}
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
