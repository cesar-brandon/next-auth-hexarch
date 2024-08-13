import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "@/auth";
import { XIcon } from "lucide-react";
import { GoogleSignInForm } from "./google-form";
import { CredentialsSignInForm } from "./credentials-form";
import { Separator } from "@/components/ui/separator";

export function SignInCard() {
  const googleAction = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <Card className="md:w-96">
      <Link
        href="/"
        className={buttonVariants({ variant: "secondary", size: "icon" })}
      >
        <XIcon className="stroke-primary/30 hover:stroke-primary transition-all duration-300" />
      </Link>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
          Sign in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <GoogleSignInForm googleAction={googleAction} />
        <div className="grid grid-cols-3 items-center justify-between my-4">
          <Separator />
          <span className="text-sm text-center text-border">or email</span>
          <Separator />
        </div>
        <CredentialsSignInForm />
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full">
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
