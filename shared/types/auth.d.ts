import { User } from "./../../node_modules/mlly/dist/index.d";
declare module "#auth-utils" {
  interface User {
    id: number | string;
    name: string;
    email: string;
  }

  interface UserSession {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    token?: {
      accessToken: string;
      accessToken_expiredAt: number;
      refreshToken: string;
      refreshToken_expiredAt: number;
    };
    loggedInAt: number;
  }

  // interface SecureSessionData {}
}

export {};
