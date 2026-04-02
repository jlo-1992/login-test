export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  // 如果沒有 token，取消執行
  if (!session.token) return

  const books = [
    {
      id: 1,
      title: 'ㄅㄆㄇ',
    },
    { id: 2, title: '123' },
    { id: 3, title: 'abc' },
  ]

  const randomIndex = Math.floor(Math.random() * books.length)
  const book = books[randomIndex]

  return book
})
