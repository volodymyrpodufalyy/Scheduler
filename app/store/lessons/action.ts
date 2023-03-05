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


    if(payload){
      const data = await getUniGroupSchedule( payload.selectedUniversity.id, payload.selectedGroup.id)

      return filterLessons(data)
    }
    return null
  }
)


export { getUniversity, getGroupsByUni, getLessonsByGroup }
