import { findByEmail } from "@/modules/auth/infrastructure/repositories";
import {
  verifyPassword,
  signToken,
} from "@/modules/auth/infrastructure/services";

export async function signInForCredentials(
  identifier: string,
  password: string,
) {
  const user = await findByEmail(identifier);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const { password: _, ...userWithoutPassword } = user;
  const accessToken = signToken(userWithoutPassword);
  const result = {
    ...userWithoutPassword,
    accessToken,
  };

  return result;
}
