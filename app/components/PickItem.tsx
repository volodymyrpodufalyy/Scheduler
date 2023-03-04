import React from 'react'
import { Dimensions, Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors } from '../theme'
import { UorG } from './ModalPicker'

const group = require('../../assets/images/groups.png')
const university = require('../../assets/images/university.png')
const screenWidth = Dimensions.get('window').width
export const PickItem = ({ item, type, onPress }: { item: any, type: UorG, onPress: any }) => {
  return (
    <View style={$pickContainer}>
      <TouchableOpacity style={$pickInnerContainer} onPress={() => onPress(item)}>
        <Image
          source={item.image ? { uri: item.image } : type === UorG.university ? university : group}
          style={[$image, !item.image ?
            { tintColor: colors.palette.secondary100 } : null]}
        />
        <View>
          <Text style={$name}>{item.name} </Text>
        </View>
      </TouchableOpacity>
    </View>
  )}

const $pickContainer: ViewStyle = {
  paddingVertical: 10,
  width: '100%',
  backgroundColor: colors.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  flexDirection: 'row',
  alignItems: 'center'

}
const $pickInnerContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center'
}

const $image: ImageStyle = {
  width: 50,
  height: 50,
  marginHorizontal: 15
}

const $name: TextStyle = {
  width: screenWidth - 75,
  color: 'white',
  fontSize: 18,
  flexWrap: 'wrap'
}
