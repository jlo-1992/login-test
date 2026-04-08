import { z } from 'zod'
import users from '#shared/data/users.json'
import { expireFromNow } from '#shared/utils/auth.ts'

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    z.object({
      email: z.email(),
      password: z.string().min(8),
    }).parse,
  )

  // 判斷登入資訊是否正確
  const user = users.find(
    (user) => user.email === email && user.password === password,
  )

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials',
    })
  }

  // 把使用者資料輸入 session
  await setUserSession(event, {
    user: { ...user },
    token: {
      accessToken: `access-token-${user.role}`,
      // 一週
      accessToken_time: expireFromNow(7 * 86400),
      refreshToken: `refresh-token-${user.role}`,
      // 兩週
      refreshToken_time: expireFromNow(7 * 86400 * 2),
    },
    loggedInAt: Date.now(),
  })

  setResponseStatus(event, 204)
  return send(event, null)
})
