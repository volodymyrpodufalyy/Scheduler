import React from 'react'

import { SlideNavigation } from './components/SlideNavigation'
import { LessonType } from '../../common/types/lesson.type'

export const ScheduleScreen = () => {

  const schedule:Array<{day:string, lessons?:Array<LessonType>}> = [
    { day: 'ПН', lessons:[
        {
          id:'1',
          name:'Комп’ютерні мережі',
          lector:'Торубка Т.В.',
          location:'5 корпус 404к.',
          dayOfWeek: 1,
          numberLesson: 1,
          timeStart: '8:30',
          lessonType: 'lecture',
          groupTurn: 'all',
          weekTurn: 'always'
        },
        {
          id:'2',
          name:'Комп’ютерні мережі',
          lector:'Торубка Т.В.',
          location:'5 корпус 404к.',
          dayOfWeek: 2,
          numberLesson: 2,
          timeStart: '10:20',
          lessonType: 'lecture',
          groupTurn: 'all',
          weekTurn: 'always'

        },
      ] },
    { day: 'ВТ' },
    { day: 'СР' },
    { day: 'ЧТ' },
    { day: 'ПТ' }
  ]


  return (
    <SlideNavigation data={schedule}/>
  )
}


