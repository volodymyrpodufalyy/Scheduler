import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { getUser, updateUser } from "./action"

export type User = {
  selectedUniversity: any,
  selectedGroup: any,
}

type State = {
  dataStatus: DataStatus
  error: any
  user: User | null
}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  user: null
}

const reducer = createReducer(initialState, builder => {
  builder.addCase(getUser.fulfilled, (state, action) => {
    state.user = action.payload
    state.dataStatus = DataStatus.FULFILLED
  })
  builder.addCase(getUser.pending, (state, action) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(updateUser.pending, (state, action) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(getUser.rejected, (state, action) => {
    state.dataStatus = DataStatus.REJECTED
  })
  builder.addCase(updateUser.rejected, (state, action) => {
    state.dataStatus = DataStatus.REJECTED
  })
  builder.addCase(updateUser.fulfilled, (state, action) => {
    state.user = action.payload
    state.dataStatus = DataStatus.FULFILLED
  })
})

export { reducer }
