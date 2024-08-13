import { db } from "@/lib/prisma";
import { User } from "../../domain/entities/user";

export async function findByEmail(identifier: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      email: identifier,
      or: {
        username: identifier,
      },
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
  };
}
