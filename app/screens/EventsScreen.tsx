import React from "react"
import { SafeAreaView, Text, ViewStyle } from "react-native"

export const EventsScreen = () => {
  return (
    <SafeAreaView style={$container}>
      <Text>EventsScreen</Text>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
}