const ua = {
  lecture: 'Лекція',
  practice: 'Практика',
  laboratory: 'Лабороторна',
  first: 'Перша підгрупа',
  second: 'Друга підгрупа',
  numerator: 'Чисельник',
  denominator: 'Знаменик',
}

export const translateToUa = (word: keyof typeof ua) => {
  return ua[word]
}
