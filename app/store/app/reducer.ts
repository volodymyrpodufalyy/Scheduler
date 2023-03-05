import { createReducer } from '@reduxjs/toolkit'
import { DataStatus } from '../../common/enums/enums'

import { getEvents, getUser, updateUser } from './action'

type User = {
  selectedUniversity: any,
  selectedGroup: any,
  token: string,
}

type State = {
  dataStatus: DataStatus
  error: any
  user: User | null,
  events:any,
}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  user: null,
  events:[]
}

const reducer = createReducer(initialState, builder => {
  builder.addCase(getUser.fulfilled, (state, action) => {
    state.user = action.payload
  })
  builder.addCase(updateUser.fulfilled, (state, action) => {
    state.user = action.payload
  })
  builder.addCase(getEvents.fulfilled, (state, action) => {
    state.events = action.payload
  })
})

export { reducer }
