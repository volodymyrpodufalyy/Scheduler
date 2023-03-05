export const isEmpty = (obj: any) => {
  return Object.values(obj).every(o => o === null)
}

export const isNotEmpty = (obj: any) => {
  if (!obj) return false
  return Object.values(obj).every(o => o !== null)
}
