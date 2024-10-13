"use client";

import { ArrowDownIcon, ArrowUpIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteSignup, replaceAllSignups, updateSignup } from "@/app/actions";
import { Signup } from "@prisma/client";

export const EditSongsButton = ({
  rowId,
  signups,
}: {
  rowId: string;
  signups: Signup[];
}) => {
  const remove = async () => {
    await deleteSignup(rowId);
  };

  const moveUp = async () => {
    const index = signups.findIndex((signup) => signup.id === rowId);

    const order = signups[index].order;

    if (index === 0) return;

    const newSignups = [...signups];
    const temp = newSignups[index];
    newSignups[index] = newSignups[index - 1];
    newSignups[index - 1] = temp;

    updateSignup(rowId, { order: newSignups[index].order });
  };

  const moveDown = async () => {
    const index = signups.findIndex((signup) => signup.id === rowId);
    if (index === signups.length - 1) return;

    const newSignups = [...signups];
    const temp = newSignups[index];
    newSignups[index] = newSignups[index + 1];
    newSignups[index + 1] = temp;

    await replaceAllSignups(newSignups);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button size="sm" variant="outline" onClick={() => moveUp()}>
        <ArrowUpIcon className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={() => moveDown()}>
        <ArrowDownIcon className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="destructive" onClick={remove}>
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
