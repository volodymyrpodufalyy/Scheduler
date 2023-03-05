import React, { Dispatch, SetStateAction } from 'react'
import { FlatList, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors } from '../theme'
import { PickItem } from './PickItem'
import Modal from 'react-native-modal'

export enum UorG {
  university = 'university',
  group = 'group',
}

export const ModalPicker = ({
                              data,
                              modalVisible,
                              setModalVisible,
                              type,
                              setSelected
                            }: {
  data: any
  modalVisible: boolean
  setModalVisible: (v: boolean) => void
  type: UorG
  setSelected: Dispatch<SetStateAction<any>>
}) => {
  const onPress = (item: any) => {
    setSelected(item)
    setModalVisible(false)
  }

  return (
    <Modal
      backdropOpacity={0.6}
      propagateSwipe
      style={{
        ...$container,
        borderRadius: 12
      }}
      isVisible={modalVisible}>
      <View style={$pickContainer}>
        {
          data ? <FlatList
            data={data}
            renderItem={({ item }) => <PickItem item={item} type={type} onPress={onPress} />}
            keyExtractor={(item,index) => index.toString()}
          /> : <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{
            color: 'white',
            marginTop: 20,
            fontSize: 20
          }}>Спочатку університет</Text>
          </TouchableOpacity>
        }

      </View>
    </Modal>
  )
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.background,
  marginTop: 50
}
const $pickContainer: ViewStyle = {
  flex: 1,
  borderRadius: 12,
  overflow: 'hidden'
}
