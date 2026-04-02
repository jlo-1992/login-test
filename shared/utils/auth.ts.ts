export const isExpired = (second: number = 0) => {
  return Date.now() > second
}

export const expireFromNow = (second: number = 7 * 86400) => {
  return Date.now() + second
}
