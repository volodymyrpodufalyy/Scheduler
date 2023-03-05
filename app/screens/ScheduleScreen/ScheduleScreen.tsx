import React, { useEffect, useState } from 'react'

import { SlideNavigation } from './components/SlideNavigation'
import { LessonType } from '../../common/types/lesson.type'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { colors } from '../../theme'
import { getLessonsByGroup } from '../../store/lessons/action'

export const ScheduleScreen = () => {

  const user = useAppSelector(state => state.AppReducer.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getLessonsByGroup(user?.selectedGroup))
  }, [user])

  const schedule = useAppSelector(state => state.LessonsReducer.lessons)

  const [lessons, setLessons] = useState(null)

  useEffect(()=>{
    // @ts-ignore
    setLessons(schedule)
  },[schedule])

  return (
    <>
      {lessons ? <SlideNavigation data={lessons} /> :
        <View style={$container}>
          <Text style={$title}>Не вибрана група</Text>
        </View>}
    </>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: colors.background,
  alignItems: 'center',
  justifyContent: 'center'
}

const $title: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 20,
  fontWeight: '400'
}
