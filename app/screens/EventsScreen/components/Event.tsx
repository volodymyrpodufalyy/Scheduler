import React from 'react'
import {  Dimensions, Text, TextStyle, View, ViewStyle } from 'react-native'
import { colors } from '../../../theme'
import { EventType } from '../../../common/types/event.type'

const screenWidth = Dimensions.get('window').width

export const Event= ({event}:{event:EventType}) => {
  return (
      <View style={$event}>
        <Text style={$title}>{event.eventName}</Text>
        <Text style={$description}>{event.description}</Text>
        <Text style={$addInfo}>⏰Коли? {event.date.toLocaleDateString()} </Text>
        <Text style={$addInfo}>📍Де? {event.location}</Text>
      </View>
  )
}


const $event: ViewStyle = {
  width: screenWidth - 32,

  backgroundColor: colors.text,
  marginVertical: 7,
  borderRadius: 10,
  padding: 10
}
const $title: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 24,
  fontWeight: '500'
}

const $description: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 18
}

const $addInfo: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 18,
  marginTop:20
}
