import React from "react"
import { Platform, Text, TextStyle, View, ViewStyle } from "react-native"
import { colors } from "../theme"

export const Header = ({ title }: { title: any }) => {
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
  backgroundColor: colors.background,
  paddingTop: Platform.OS === "ios" ? 32 : 0
}

const $title: TextStyle = {
  fontSize: 20,
  color: colors.text,
  fontWeight: "bold"
}
