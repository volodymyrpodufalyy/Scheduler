import { createReducer } from '@reduxjs/toolkit'
import { DataStatus } from '../../common/enums/enums'

import { getGroupsByUni, getLessonsByGroup, getUniversity } from './action'


type State = {
  dataStatus: DataStatus
  error: any
  universities: Array<any> | null
  groups: Array<any> | null
  lessons: Array<any> | null
}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  universities: null,
  groups: null,
  lessons: null
}

const reducer = createReducer(initialState, builder => {
  builder.addCase(getUniversity.fulfilled, (state, action) => {
    state.universities = action.payload
  })
  builder.addCase(getGroupsByUni.fulfilled, (state, action) => {
    state.groups = action.payload
  })
  builder.addCase(getLessonsByGroup.fulfilled, (state, action) => {
    state.lessons = action.payload
  })
})

export { reducer }
