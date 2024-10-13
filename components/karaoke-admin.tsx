"use client";
import { useSortable } from "@dnd-kit/sortable";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import {
  GripVerticalIcon,
  LoaderCircle,
  SaveIcon,
  TrashIcon,
} from "lucide-react";
import { deleteSignup, updateAllSignups } from "@/app/actions";
import { Signup } from "@prisma/client";
import { cn } from "@/lib/utils";

interface KaraokeAdminProps {
  initialSignups: Signup[];
}

type Props = {
  item: Signup;
};

export const SortableItem = ({ item }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, startTransition] = useTransition();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "border p-2 rounded-sm flex-grow flex flex-row justify-between cursor-grab",
          isDragging && "cursor-grabbing"
        )}
        {...attributes}
        {...listeners}
      >
        {`${item.name} - ${item.song} - ${item.artist}`}
        <GripVerticalIcon />
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <TrashIcon className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form
            onSubmit={async (event) => {
              startTransition(async () => {
                await deleteSignup(item.id);
                event.preventDefault();
              });
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>
                {`Delete ${item.name}'s entry of ${item.song} by ${item.artist}`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">
                {isDeleting && (
                  <LoaderCircle className="size-4 animate-spin mr-2" />
                )}
                {!isDeleting && <TrashIcon className="size-4 mr-2" />}
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default function KaraokeAdmin({ initialSignups }: KaraokeAdminProps) {
  const [signups, setSignups] = useState<Signup[]>(initialSignups);
  const [isSaving, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = signups.findIndex((v) => v.id === active.id);
      const newIndex = signups.findIndex((v) => v.id === over.id);
      setSignups(arrayMove(signups, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    startTransition(async () => {
      await updateAllSignups(signups);
    });
  };

  return (
    <>
      <nav className="flex justify-between items-center">
        <Link href="/">Home</Link>
        <ModeToggle />
      </nav>
      <main>
        <h1 className="text-3xl font-bold text-center mb-8">Karaoke Admin</h1>

        <Card>
          <CardHeader>
            <CardTitle>Manage Signup Queue</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {signups.length === 0 ? (
              <p className="text-center ">No signups in the queue.</p>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={signups}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-2">
                    {signups.map((item) => (
                      <SortableItem key={item.id} item={item} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
            <div className="flex flex-row gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSignups(initialSignups);
                }}
              >
                Reset
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && (
                  <LoaderCircle className="size-4 animate-spin mr-2" />
                )}
                {!isSaving && <SaveIcon className="size-4 mr-2" />}
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
