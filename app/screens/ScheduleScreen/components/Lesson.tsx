import React from 'react'
import { Dimensions, Text, TextStyle, View, ViewStyle } from 'react-native'
import { colors } from '../../../theme'
import { LessonType } from '../../../common/types/lesson.type'
import { translateToUa } from '../../../utils/translator'
import { getTime } from '../../../utils/timeFormater'

const screenWidth = Dimensions.get('window').width
export const Lesson = ({ lesson }: { lesson: LessonType }) => {
  const [startTime, endTime] = getTime(lesson.timeStart)
  return <View style={$lesson}>
    <View style={$leftContainer}>
      <View>
        <Text style={$lessonNumber}>{lesson.numberLesson}</Text>
      </View>
      <View>
        <Text style={$time}>{startTime}</Text>
        <Text style={$time}>{endTime}</Text>
      </View>
    </View>
    <View style={$rightContainer}>
      <Text style={$lessonName}>{lesson.name}</Text>
      <Text style={$addInfo}>{lesson.lector}</Text>
      <Text style={$addInfo}>{translateToUa(lesson.lessonType)}</Text>
      <View style={$location}>
        <Text>{lesson.location}</Text>
      </View>
    </View>

  </View>

}

const $lesson: ViewStyle = {
  width: screenWidth - 32,
  height: 130,

  marginTop: 15,
  borderRadius: 10,
  flexDirection: 'row'
}

const $leftContainer: ViewStyle = {
  width: '25%',
  height: '100%',
  backgroundColor: colors.palette.secondary200,

  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  alignItems: 'center',
  justifyContent: 'center'

}
const $rightContainer: ViewStyle = {
  width: '75%',
  height: '100%',

  backgroundColor: colors.palette.secondary100,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  alignItems: 'center',
  justifyContent: 'center'

}

const $lessonNumber: TextStyle = {
  color: colors.text,
  fontSize: 40,
  fontWeight: '200'
}
const $lessonName: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 15,
  fontWeight: '500'
}

const $time: TextStyle = {
  color: colors.palette.neutral800,
  fontSize: 15
}
const $addInfo: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 15
}

const $location: ViewStyle = {
  backgroundColor: colors.palette.secondary200,
  marginTop: 8,
  borderRadius: 15,
  paddingVertical: 3,
  paddingHorizontal: 8
}

