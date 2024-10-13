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
        <ModeToggle className="top-0 right-0" />
      </nav>
      <div className="container mx-auto p-4">
        <Image
          src="/pumpkin.png"
          alt="Fall Festival Logo"
          width={100}
          height={50}
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold text-center mb-8 dark:text-orange">
          Fall Festival Karaoke Signup
        </h1>
        <SignUpForm />
        <SignUpList signups={signups} />
      </div>
    </>
  );
}
