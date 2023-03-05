import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionType } from './common'
import { AsyncThunkConfig } from '../store'
import { StorageKey } from '../../common/enums/enums'

const getUser = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.GET_USER,
  async (payload, { extra }) => {
    const { storage } = extra

    const user = await storage.load(StorageKey.USER)

    if (!user) {
      // generate token
      await storage.save(StorageKey.USER, {
        selectedUniversity: null,
        selectedGroup: null,
        token: ''
      })

    }
    return user
  }
)
const updateUser = createAsyncThunk<any, {
  selectedUniversity: any,
  selectedGroup: any
} | null, AsyncThunkConfig>(
  ActionType.UPDATE_USER,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const oldUser = getState().AppReducer.user

    const user = {
      selectedUniversity: payload?.selectedUniversity,
      selectedGroup: payload?.selectedGroup,
      token: oldUser?.token
    }

    await storage.save(StorageKey.USER, user)

    return user
  }
)
export { getUser, updateUser }
