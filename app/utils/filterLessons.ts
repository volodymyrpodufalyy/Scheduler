function getDayOfWeekUa(dayNumber: number) {
  switch (dayNumber) {
    case 1:
      return 'ПН'
    case 2:
      return 'ВТ'
    case 3:
      return 'СР'
    case 4:
      return 'ЧТ'
    case 5:
      return 'ПТ'
    case 6:
      return 'СБ'
    case 7:
      return 'НД'
    default:
      return ''
  }
}

export const filterLessons = (data: any) => {
  const schedule = []

  for (let i = 1; i < 6; i++) {
    const lessons = data.filter((item: any) => item.dayOfWeek === i)

    const item = { day: getDayOfWeekUa(i),
      lessons: lessons.sort((a:any,b:any)=>a.numberLesson - b.numberLesson) }

    schedule.push(item)
  }

  return schedule
}
