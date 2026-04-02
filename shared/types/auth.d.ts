declare module '#auth-utils' {
  interface User {
    id: string | number
    email: string
    password: string
    role: string
    avatar: string
  }

  interface UserSession {
    token?: {
      accessToken: string
      accessToken_time: number
      refreshToken: string
      refreshToken_time: number
    }
    loggedInAt: number
  }

  // interface SecureSessionData {}
}

export {}
