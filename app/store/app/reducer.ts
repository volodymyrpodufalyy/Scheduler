import { createReducer } from '@reduxjs/toolkit'
import { DataStatus } from '../../common/enums/enums'

import { getUser, updateUser } from './action'

type User = {
  selectedUniversity: any,
  selectedGroup: any,
  token: string,
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
  })
  builder.addCase(updateUser.fulfilled, (state, action) => {
    state.user = action.payload
  })
})

export { reducer }
