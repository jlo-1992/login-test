import { z } from "zod";
import { getUser, getToken } from "#shared/utils/auth";

const invalidCredentialsError = createError({
  statusCode: 401,
  // This message is intentionally vague to prevent user enumeration attacks.
  message: "Invalid credentials",
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    z.object({
      email: z.email(),
      password: z.string().min(8),
    }).parse,
  );

  // 先 verify 登入資訊
  if (email !== "user01@gmail.com" || password !== "123456") {
    throw createError({
      statusCode: 401,
      message: "Wrong password",
    });
  }

  // 取得 token
  const token = await getToken({
    email,
    password,
  })
    .then((data) => {
      return data;
    })
    .catch(() => {
      throw invalidCredentialsError;
    });

  // 再用 token 取得 user 資料
  const user = await getUser(token.access_token).then((data) => {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  });

  await setUserSession(event, {
    user: { ...user },
    token: {
      accessToken: token.access_token,
      accessToken_expiredAt: 0,
      refreshToken: "",
      refreshToken_expiredAt: 0,
    },
    loggedInAt: Date.now(),
  });

  return setResponseStatus(event, 201);
});
