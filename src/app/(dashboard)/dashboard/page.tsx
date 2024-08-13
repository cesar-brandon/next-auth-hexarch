import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return (
    <div className="w-dvw h-dvh grid place-items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            Welcome, {session.user.name}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/",
              });
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
