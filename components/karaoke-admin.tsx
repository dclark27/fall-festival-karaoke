"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MusicIcon, GripVertical, XIcon } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { deleteSignup } from "@/app/actions";

interface Signup {
  id: string;
  name: string;
  song: string;
  artist: string;
  order: number;
}

interface KaraokeAdminProps {
  initialSignups: Signup[];
}

export default function KaraokeAdmin({ initialSignups }: KaraokeAdminProps) {
  const [signups, setSignups] = useState<Signup[]>(initialSignups);

  useEffect(() => {
    setSignups(initialSignups);
  }, [initialSignups]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(signups);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSignups(items);

    // Update the order in the database
    const updatedSignups = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    await fetch("/api/signups", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSignups),
    });
    // onUpdate();
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
            <p className="text-center ">No signups in the queue.</p>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="signups">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {signups.map((signup, index) => (
                      <Draggable
                        key={signup.id}
                        draggableId={signup.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center justify-between p-2 bg-primary rounded-md"
                          >
                            <div className="flex items-center space-x-2">
                              <span {...provided.dragHandleProps}>
                                <GripVertical className="h-4 w-4 cursor-move" />
                              </span>
                              <MusicIcon className="h-4 w-4 " />
                              <span>{signup.name}</span>
                              <span>-</span>
                              <span>{signup.song}</span>
                              <span>by</span>
                              <span>{signup.artist}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteSignup(signup.id)}
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
