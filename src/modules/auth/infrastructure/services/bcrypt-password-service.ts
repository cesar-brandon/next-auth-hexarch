import * as bcrypt from "bcryptjs";

export function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
