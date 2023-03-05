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


  // useEffect(() => {
  //   requestUserPermissions(selectedGroup, selectedUniversity)
  // }, [])

  const confirmSelection = (updatedUser: any) => {
    dispatch(updateUser({
      ...user,
      ...updatedUser
    }))
  }

  const selectUniversity = (selectedUniversity: any) => {
    confirmSelection({ selectedUniversity })
  }

  const selectGroup = (selectedGroup: any) => {
    confirmSelection({ selectedGroup })
  }


  const openUniversities = () => {
    dispatch(getUniversity([]))
    setModalVisibleUniversities(true)
  }

  const openGroups = () => {
    if (user?.selectedUniversity) {
      dispatch(getGroupsByUni(user.selectedUniversity))
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
        user?.selectedUniversity ?
          <PickItem item={user.selectedUniversity}
                    type={UorG.university}
                    onPress={openUniversities} />
          :
          <PickItem item={{ name: "Обрати університет" }}
                    type={UorG.university}
                    onPress={openUniversities} />
      }
      {
        user?.selectedGroup ?
          <PickItem item={user.selectedGroup}
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
