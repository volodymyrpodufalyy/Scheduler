import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionType } from './common'
import { AsyncThunkConfig } from '../store'
import { StorageKey } from '../../common/enums/enums'
import { getUniEvents } from '../../services/api/uniApi'


const getUser = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_USER,
  async (payload, { extra }) => {
    const { storage } = extra

    let user = await storage.load(StorageKey.USER)

    return user
  }
)

const updateUser = createAsyncThunk<any, {
  selectedUniversity: any,
  selectedGroup: any
} | null, AsyncThunkConfig>(
  ActionType.UPDATE_USER,
  async (payload, { extra }) => {
    const { storage } = extra

    const user = {
      selectedUniversity: payload?.selectedUniversity,
      selectedGroup: payload?.selectedGroup
    }

    await storage.save(StorageKey.USER, user)

    return user
  }
)

const getEvents = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_EVENTS,
  async (payload, { extra, getState }) => {

    const user = getState().AppReducer.user

    const events = await getUniEvents(user?.selectedUniversity.id)

    return events
  }
)

export { getUser, updateUser, getEvents }
