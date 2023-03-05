import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionType } from './common'
import { AsyncThunkConfig } from '../store'
import { StorageKey } from '../../common/enums/enums'
import { LessonType } from '../../common/types/lesson.type'

const university = [
  {
    id: '1',
    name: 'Національний університет «Львівська політехніка»',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Nulp_logo_ukr.jpg'
  }

]

const groups = [
  { id: '1', name: 'IOT-32', image: '' },
  { id: '2', name: 'IOT-31', image: '' },
  { id: '3', name: 'IOT-33', image: '' }
]

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

const getUniversity = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_UNIVERSITY,
  async (payload, { extra }) => {
    const { storage } = extra

    return university
  }
)

const getGroupsByUni = createAsyncThunk<any, { uni: any }, AsyncThunkConfig>(
  ActionType.GET_GROUPS,
  async (payload, { extra }) => {
    const { storage } = extra

    return groups
  }
)

const getLessonsByGroup = createAsyncThunk<any, { group: any }, AsyncThunkConfig>(
  ActionType.GET_LESSONS,
  async (payload, { extra }) => {
    const { storage } = extra

    if(payload){

      return schedule
    }
    return null
  }
)


export { getUniversity, getGroupsByUni, getLessonsByGroup }
