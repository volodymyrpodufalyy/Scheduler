import {combineReducers} from '@reduxjs/toolkit'
import {reducer as AppReducer} from './app/reducer'
import {reducer as LessonsReducer} from './lessons/reducer'

export const rootReducer = combineReducers({
  AppReducer,
  LessonsReducer
})
