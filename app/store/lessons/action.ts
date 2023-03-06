import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionType } from './common'
import { AsyncThunkConfig } from '../store'

import { getUniGroups, getUniGroupSchedule, getUnis } from '../../services/api/uniApi'
import { filterLessons } from '../../utils/filterLessons'

const getUniversity = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_UNIVERSITY,
  async (payload, { extra }) => {
    const { storage } = extra
    const uni = await getUnis()

    return uni
  }
)

const getGroupsByUni = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_GROUPS,
  async (payload, { extra }) => {
    const { storage } = extra
    return await getUniGroups(payload.id)
  }
)

const getLessonsByGroup = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_LESSONS,
  async (payload, { extra }) => {


    if (payload) {
      const data = await getUniGroupSchedule(payload.selectedUniversity.id, payload.selectedGroup.id)

      return filterLessons(data)
    }
    return null
  }
)

const getLectors = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_LECTORS,
  async (payload, { extra, getState }) => {

    const user = getState().AppReducer.user
    let groups = getState().LessonsReducer.groups

    if (!user?.selectedUniversity) return null

    if (!groups) {
      groups = await getUniGroups(user.selectedUniversity.id)
    }

    let lessons = []

    for (let i = 0; i < groups.length; i++) {
      const groupLessons = await getUniGroupSchedule(user.selectedUniversity.id, groups[i].id)
      lessons = [...groupLessons, ...lessons]
    }

    const lectors = lessons.map(l=> l.lector)

    return Array.from(new Set(lectors)).map(l=>({name:l}))
  }
)


export { getUniversity, getGroupsByUni, getLessonsByGroup, getLectors }
