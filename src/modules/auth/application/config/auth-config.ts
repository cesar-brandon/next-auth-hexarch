export interface SignOptions {
  expiresIn: string | number;
}

export const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1h",
};
