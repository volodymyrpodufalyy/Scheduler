import React, { useState } from "react"
import { SafeAreaView, Text, TextStyle, ViewStyle } from "react-native"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { updateUser } from "../../store/app/action"
import { getGroupsByUni, getUniversity } from "../../store/lessons/action"
import { ModalPicker, UorG } from "../../components/ModalPicker"
import { PickItem } from "../../components/PickItem"
import { colors } from "../../theme"


export const WelcomeScreen = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.AppReducer.user)
  const { groups, universities } = useAppSelector(state => state.LessonsReducer)

  const [modalVisibleGroups, setModalVisibleGroups] = useState(false)
  const [modalVisibleUniversities, setModalVisibleUniversities] = useState(false)

  const [selection, setSelection] = useState({
    selectedUniversity: null,
    selectedGroup: null
  })

  const selectUniversity = (selectedUniversity: any) => {
    setSelection({
      ...selection,
      selectedUniversity: selectedUniversity
    })
  }

  const selectGroup = async (selectedGroup: any) => {
    await dispatch(updateUser({
      selectedUniversity: selection.selectedUniversity,
      selectedGroup: selectedGroup
    }))
    setSelection({
      ...selection,
      selectedGroup: selectedGroup
    })
  }


  const openUniversities = () => {
    dispatch(getUniversity([]))
    setModalVisibleUniversities(true)
  }

  const openGroups = () => {
    if (selection?.selectedUniversity) {
      dispatch(getGroupsByUni(selection.selectedUniversity))
      setModalVisibleGroups(true)
    }
  }

  return (
    <SafeAreaView style={$container}>
      <Text style={$title}>Welcome!</Text>
      <ModalPicker modalVisible={modalVisibleUniversities}
                   setModalVisible={setModalVisibleUniversities}
                   data={universities}
                   type={UorG.university}
                   setSelected={selectUniversity}
      />
      <ModalPicker modalVisible={modalVisibleGroups}
                   setModalVisible={setModalVisibleGroups}
                   data={groups}
                   type={UorG.group}
                   setSelected={selectGroup}
      />
      {
        selection?.selectedUniversity ?
          <PickItem item={selection.selectedUniversity}
                    type={UorG.university}
                    onPress={openUniversities} />
          :
          <PickItem item={{ name: "Обрати університет" }}
                    type={UorG.university}
                    onPress={openUniversities} />
      }
      {
        selection?.selectedGroup ?
          <PickItem item={selection.selectedGroup}
                    type={UorG.group}
                    onPress={openGroups} />
          :
          <PickItem item={{ name: "Обрати групу" }}
                    type={UorG.group}
                    onPress={openGroups} />
      }


    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.background
}

const $title: TextStyle = {
  fontSize: 40,
  color: colors.text,
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: 16,
  paddingBottom: 4
}
