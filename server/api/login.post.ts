import { z } from 'zod'
import { getExpiredAt } from '#shared/utils/auth'
import users from '#shared/data/users.json'

const invalidCredentialsError = createError({
  statusCode: 401,
  message: 'Invalid credentials',
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    z.object({
      email: z.email(),
      password: z.string().min(8),
    }).parse,
  )

  // 輸入的資訊要符合使用者的
  const userData = users.find(
    (user) => user.email === email && user.password === password,
  )

  if (!userData) {
    throw invalidCredentialsError
  }

  // 模擬取得 token
  const token = {
    access_token: `mock-token-${userData.role}`,
    expires_in: 3600,
    refresh_token: `mock-refresh-token-${userData.role}`,
  }

  // 把 user 資料寫入 session
  await setUserSession(event, {
    user: { ...userData },
    token: {
      accessToken: token.access_token,
      accessToken_expiredAt: getExpiredAt(token.expires_in),
      refreshToken: token.refresh_token,
      refreshToken_expiredAt: getExpiredAt(token.expires_in * 2),
    },
    loggedInAt: Date.now(),
  })

  return setResponseStatus(event, 201)
})
