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
      accessToken_time: expireFromNow(3000),
      refreshToken: `refresh-token-${user.role}`,
      refreshToken_time: expireFromNow(3000 * 2),
    },
    loggedInAt: Date.now(),
  })

  setResponseStatus(event, 204)
  return send(event, null)
})
