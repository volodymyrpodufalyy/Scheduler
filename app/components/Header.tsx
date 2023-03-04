import React from 'react'
import {  Text, TextStyle,  View, ViewStyle } from 'react-native'
import { colors } from '../theme'

export const Header = ({title}:{title:any}) => {
  return (
    <View style={$header}>
      <Text style={$title}>{title}</Text>
    </View>
  )
}

const $header: ViewStyle = {
  borderBottomColor: colors.border,
  padding: 16,

  borderBottomWidth: 1,
  backgroundColor: colors.background

}

const $title: TextStyle = {
  fontSize: 20,
  color:colors.text,
  fontWeight: 'bold'
}
