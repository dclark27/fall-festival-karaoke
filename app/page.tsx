import { SignUpForm } from "@/components/sign-up-form";
import { SignUpList } from "@/components/sign-up-list";
import Image from "next/image";
import { getSignups } from "./actions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default async function Page() {
  const signups = await getSignups();

  return (
    <div className="container mx-auto max-w-md px-2 flex flex-col min-h-dvh">
      <nav className="p-2 flex justify-end">
        <ModeToggle />
      </nav>
      <main className="flex-grow">
        <Image
          src="/pumpkin.png"
          alt="Fall Festival Logo"
          width="0"
          height="0"
          sizes="100vw"
          className="w-20 mb-2 mx-auto h-auto bg-emerald-600 rounded-full p-4"
        />
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-orange font-serif tracking-wide">
          Fall Festival Karaoke Signup
        </h1>
        <SignUpForm />
      </main>
      <SignUpList signups={signups} />
    </div>
  );
}
