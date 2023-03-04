import React, { useState } from 'react'
import {
  Dimensions, FlatList,
  Image,
  ImageStyle, Modal,
  SafeAreaView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { colors } from '../theme'
import { PickItem } from './PickItem'


const screenWidth = Dimensions.get('window').width
export enum UorG  {
  university= 'university',
  group= 'group'
}
export const ModalPicker = ({
                              data,
                              modalVisible, setModalVisible, type, setSelected
                            }:
                              {
                                data: any,
                                modalVisible: boolean,
                                setModalVisible: any,
                                type: UorG,
                                setSelected:any
                              }) => {

  const onPress = (item:any) => {
    setSelected(item)
    setModalVisible(false)
  }

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={$container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <PickItem item={item} type={type} onPress={onPress}/>}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Modal>
  )
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.background
}
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
