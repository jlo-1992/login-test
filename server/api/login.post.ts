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
  const user = users.find(
    (user) => user.email === email && user.password === password,
  )

  if (!user) {
    throw invalidCredentialsError
  }

  // 模擬取得 token
  const token = {
    access_token: `access-token-${user.name}`,
    expires_in: 3000,
    refresh_token: `refresh-token-${user.name}`,
  }

  // 把 user 資料寫入 session
  await setUserSession(event, {
    user: { ...user },
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
