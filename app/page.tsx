import { SignUpForm } from "@/components/sign-up-form";
import { SignUpList } from "@/components/sign-up-list";
import Image from "next/image";
import { getSignups } from "./actions";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function Page() {
  const signups = await getSignups();

  return (
    <>
      <nav className="p-2 flex justify-end">
        <ModeToggle />
      </nav>
      <main className="container mx-auto max-w-md px-2">
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
        <SignUpList signups={signups} />
      </main>
    </>
  );
}
