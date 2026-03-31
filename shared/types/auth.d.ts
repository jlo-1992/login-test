declare module '#auth-utils' {
  interface User {
    id: number | string
    name: string
    email: string
    avatar: string
  }

  interface UserSession {
    token?: {
      accessToken: string
      accessToken_expiredAt: number
      refreshToken: string
      refreshToken_expiredAt: number
    }
    loggedInAt: number
  }

  // interface SecureSessionData {}
}

export {}
