import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { signInForCredentials } from "@/sections/auth/actions/sign-in";
import { findByEmail } from "@/modules/auth/infrastructure/repositories";
import { nanoid } from "nanoid";
import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    email: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize({ identifier, password }) {
        try {
          ("use server");
          const user = await signInForCredentials(
            identifier as string,
            password as string,
          );
          if (!user) return null;
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await findByEmail(token.email);
      if (!dbUser) {
        token.id = user.id;
        return token;
      }
      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in/error",
  },
});
