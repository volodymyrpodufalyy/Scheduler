import React, { Dispatch, SetStateAction } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { PickItem } from "./PickItem"
import Modal from "react-native-modal"

export enum UorG {
  university = "university",
  group = "group",
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
  setSelected: Dispatch<SetStateAction<null>>
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
        <FlatList
          data={data}
          renderItem={({ item }) => <PickItem item={item} type={type} onPress={onPress} />}
          keyExtractor={item => item.name}
        />
      </View>
    </Modal>
  )
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.background,
  marginTop: 50
}
const $pickContainer: ViewStyle = {
  flex: 1,
  borderRadius: 12,
  overflow: "hidden"
}
