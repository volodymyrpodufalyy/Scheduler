import { StyleSheet, View, ViewStyle } from "react-native"
import React from "react"


export const AddMarkerButton = () => {


  return (
    <View style={$mapContainer}>

    </View>
  )
}

const $mapContainer: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "flex-end",
  alignItems: "center"
}

const $map: ViewStyle = {
  ...StyleSheet.absoluteFillObject
}
