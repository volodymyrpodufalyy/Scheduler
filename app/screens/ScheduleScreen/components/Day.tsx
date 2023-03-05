import React from "react"
import { SafeAreaView, ScrollView, ViewStyle } from "react-native"
import { colors } from "../../../theme"
import { Lesson } from "./Lesson"
import { useAppSelector } from "../../../store/store"

export const Day = ({ route }: { route: any }) => {

  const { day } = route.params


  const schedule = useAppSelector(state => state.LessonsReducer.lessons)


  const item = schedule?.find((el: any) => el.day === day)

  return <SafeAreaView style={$container}>
    <ScrollView>


      {item?.lessons?.map((el: any, index: number) => (
        <Lesson key={index} lesson={el} />
      ))
      }
    </ScrollView>
  </SafeAreaView>
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.background,
  alignItems: "center"
}

