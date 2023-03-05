import React, { useEffect } from "react"

import { SlideNavigation } from "./components/SlideNavigation"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { colors } from "../../theme"
import { getLessonsByGroup } from "../../store/lessons/action"

export const ScheduleScreen = () => {

  const user = useAppSelector(state => state.AppReducer.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getLessonsByGroup({
      selectedGroup: user?.selectedGroup, selectedUniversity: user?.selectedUniversity
    }))
  }, [user])

  const schedule = useAppSelector(state => state.LessonsReducer.lessons)
  
  return (
    <>
      {schedule ? <SlideNavigation data={schedule} /> :
        <View style={$container}>
          <Text style={$title}>Не вибрана група</Text>
        </View>}
    </>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.background,
  alignItems: "center",
  justifyContent: "center"
}

const $title: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 20,
  fontWeight: "400"
}
