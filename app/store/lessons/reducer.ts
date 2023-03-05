import { createReducer } from '@reduxjs/toolkit'
import { DataStatus } from '../../common/enums/enums'

import { getGroupsByUni, getLectors, getLessonsByGroup, getUniversity } from './action'


type State = {
  dataStatus: DataStatus
  error: any
  universities: Array<any> | null
  groups: Array<any> | null
  lessons: Array<any> | null,
  lectors: Array<any> | null,

}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  universities: null,
  groups: null,
  lessons: null,
  lectors: null
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
  builder.addCase(getLectors.fulfilled, (state, action) => {
    state.lectors = action.payload
  })
})

export { reducer }
