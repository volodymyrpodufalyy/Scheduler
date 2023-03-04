import React from "react"
import { SafeAreaView, Text, ViewStyle } from "react-native"
import { colors } from '../theme'

export const MenuScreen = () => {
  return (
    <SafeAreaView style={$container}>
      <Text>Menu</Text>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.background
}
