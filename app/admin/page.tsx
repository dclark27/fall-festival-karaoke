import { ModeToggle } from "@/components/ui/mode-toggle";
import { getSignups, updateAllSignups, updateSignup } from "../actions";
import { MicIcon, MoreVertical, SkipForwardIcon } from "lucide-react";
import { ScrollingText } from "@/components/scrolling-text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSignup } from "../actions";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const signups = await getSignups();

  if (signups.length === 0) {
    return (
      <div className="container mx-auto max-w-md px-2 flex flex-col min-h-screen">
        <nav className="p-2 flex justify-end">
          <ModeToggle />
        </nav>
        <main className="flex-grow">
          <h1 className="text-3xl font-bold text-center mb-8 dark:text-orange font-serif tracking-wide">
            Karaoke Admin
          </h1>
          <div className="p-4 border rounded-lg text-center">
            No signups yet
          </div>
        </main>
      </div>
    );
  }

  const minOrder = signups[0].order;
  const maxOrder = signups[signups.length - 1].order;

  async function playNext(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    const updatedSignup = signups.find((signup) => signup.id === id);

    if (!updatedSignup) {
      return;
    }

    updatedSignup.order = minOrder - 1;

    if (id) {
      await updateSignup(id, updatedSignup);
    }

    revalidatePath("/");
  }

  async function playLast(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    const updatedSignup = signups.find((signup) => signup.id === id);

    if (!updatedSignup) {
      return;
    }

    updatedSignup.order = maxOrder + 1;

    if (id) {
      await updateSignup(id, updatedSignup);
    }

    revalidatePath("/");
  }

  async function deleteSong(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    if (id) {
      await deleteSignup(id);
    }

    revalidatePath("/");
  }

  async function moveUp(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    const currentSignup = signups.find((signup) => signup.id === id);

    if (!currentSignup) {
      return;
    }

    const newSignups = signups.map((signup) => {
      if (signup.id === id) {
        return {
          ...signup,
          order: signup.order - 1,
        };
      }
      if (signup.order === currentSignup.order - 1) {
        return {
          ...signup,
          order: signup.order + 1,
        };
      }
      return signup;
    });

    await updateAllSignups(newSignups);

    revalidatePath("/");
  }

  async function moveDown(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    const currentSignup = signups.find((signup) => signup.id === id);

    if (!currentSignup) {
      return;
    }

    const newSignups = signups.map((signup) => {
      if (signup.id === id) {
        return {
          ...signup,
          order: signup.order + 1,
        };
      }
      if (signup.order === currentSignup.order + 1) {
        return {
          ...signup,
          order: signup.order - 1,
        };
      }
      return signup;
    });

    await updateAllSignups(newSignups);

    revalidatePath("/");
  }

  return (
    <div className="container mx-auto max-w-md px-2 flex flex-col min-h-screen">
      <nav className="p-2 flex justify-end">
        <ModeToggle />
      </nav>
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-center  dark:text-orange font-serif tracking-wide">
            Karaoke Admin
          </h1>
          <Link href="/">Go Home</Link>
        </div>
        {signups.map((signup, index) => (
          <div key={signup.id} className="mb-4 p-4 border rounded-lg">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <h3 className="font-semibold flex flex-row gap-1 items-center">
                  <MicIcon className="size-4" />
                  {signup.name}
                </h3>
                <ScrollingText text={`${signup.song} by ${signup.artist}`} />
                {index === 0 && (
                  <form action={deleteSong}>
                    <input type="hidden" name="id" value={signup.id} />
                    <Button type="submit">
                      <SkipForwardIcon className="size-4 mr-2" />
                      Next Song
                    </Button>
                  </form>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <form action={deleteSong}>
                      <input type="hidden" name="id" value={signup.id} />
                      <button type="submit">Delete</button>
                    </form>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={playNext}>
                      <input type="hidden" name="id" value={signup.id} />
                      <button type="submit">Play next</button>
                    </form>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={playLast}>
                      <input type="hidden" name="id" value={signup.id} />
                      <button type="submit">Play last</button>
                    </form>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={moveUp}>
                      <input type="hidden" name="id" value={signup.id} />
                      <button type="submit">Move up</button>
                    </form>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={moveDown}>
                      <input type="hidden" name="id" value={signup.id} />
                      <button type="submit">Move down</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
