export const getTime = (startTime: string) => {

  const date = new Date(`2000-01-01T${startTime}:00`)

  date.setTime(date.getTime() + 1.5 * 60 * 60 * 1000)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const endTime = `${hours}:${minutes}`

  const [hoursStart, minutesStart] = startTime.split(':')

  const formattedHours = hoursStart.padStart(2, '0')
  const formattedMinutes = minutesStart.padStart(2, '0')
  const startTimeFormatted = `${formattedHours}:${formattedMinutes}`

  return [startTimeFormatted, endTime]
}
