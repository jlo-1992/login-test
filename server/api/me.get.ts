export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  await setUserSession(event, {
    ...session,
  })

  setResponseStatus(event, 204)
  return send(event, null)
})
