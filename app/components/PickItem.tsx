import React from "react"
import { Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { UorG } from "./ModalPicker"

const group = require("../../assets/images/groups.png")
const university = require("../../assets/images/university.png")
export const PickItem = ({ item, type, onPress }: { item: any; type: UorG; onPress: any }) => {

  return (
    <View style={$pickContainer}>
      <TouchableOpacity style={$pickInnerContainer} onPress={() => onPress(item)}>
        <Image
          source={item.img ? { uri: item.img } : type === UorG.university ? university : group}
          style={[$image, !item.img ? { tintColor: colors.palette.secondary100 } : null]}
        />
        <View style={$nameContainer}>
          <Text style={$name}>{item.name} </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const $pickContainer: ViewStyle = {
  paddingVertical: 10,
  width: "100%",
  backgroundColor: colors.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  flexDirection: "row",
  alignItems: "center"
}
const $pickInnerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center"
}

const $image: ImageStyle = {
  width: 32,
  height: 32,
  marginHorizontal: 20
}

const $nameContainer: ViewStyle = {
  width: 0,
  flexGrow: 1,
  flex: 1
}

const $name: TextStyle = {
  color: "white",
  fontSize: 18,
  flexWrap: "wrap",
  flexShrink: 1
}
