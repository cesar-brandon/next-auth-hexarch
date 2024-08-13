import { db } from "@/lib/prisma";
import { User } from "../../domain/entities/user";

export async function findByEmail(identifier: string): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name ?? user.username,
    username: user.username,
    email: user.email,
    image: user.image ?? "",
    password: user.password ?? "",
  };
}
