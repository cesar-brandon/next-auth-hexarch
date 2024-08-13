import GoogleIcon from "@/components/icon/google-icon";
import { Button } from "@/components/ui/button";

export function GoogleSignInForm({
  googleAction,
}: {
  googleAction: () => Promise<void>;
}) {
  return (
    <form action={googleAction}>
      <Button size="lg" variant="outline" className="w-full">
        <GoogleIcon className="w-4 h-4" />
        Sign in with Google
      </Button>
    </form>
  );
}
