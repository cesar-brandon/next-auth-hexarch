import { buttonVariants } from "@/components/ui/button";
import { KeyRoundIcon } from "lucide-react";
import Link from "next/link";

export default function LobbyPage() {
  return (
    <div className="w-dvw h-dvh flex flex-col gap-4 items-center justify-center">
      <img className="w-32" src="/icon-hexarch.png" alt="logo" />
      <h1 className="text-xl">Next Authentication - Hexagonal Architecture</h1>
      <Link href="/sign-in" className={buttonVariants({ size: "lg" })}>
        Signin
        <KeyRoundIcon className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
}
