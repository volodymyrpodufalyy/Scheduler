import { SafeAreaView, ViewStyle } from "react-native"
import React from "react"
import { Map } from "./Components/Map"
import { colors } from "../../theme"

export const MapScreen = () => {
  return (
    <SafeAreaView style={$container}>
      <Map />
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.background
}
