import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"

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
export { getUser, updateUser }
