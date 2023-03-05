import React, { useEffect, useState } from 'react'
import { Dimensions, ImageStyle, SafeAreaView, TextStyle, ViewStyle } from 'react-native'
import { colors } from '../theme'
import { ModalPicker, UorG } from '../components/ModalPicker'
import { PickItem } from '../components/PickItem'
import { useAppDispatch, useAppSelector } from '../store/store'
import { updateUser } from '../store/app/action'
import { getGroupsByUni, getUniversity } from '../store/lessons/action'


export const MenuScreen = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.AppReducer.user)
  const { groups, universities } = useAppSelector(state => state.LessonsReducer)

  const [modalVisibleGroups, setModalVisibleGroups] = useState(false)
  const [modalVisibleUniversities, setModalVisibleUniversities] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState(user?.selectedUniversity)
  const [selectedGroup, setSelectedGroup] = useState(user?.selectedGroup)
  const [allUniversities, setAllUniversities] = useState(universities)
  const [allGroups, setAllGroups] = useState(groups)

  useEffect(() => {
    setSelectedGroup(user?.selectedGroup)
    setSelectedUniversity(user?.selectedUniversity)
  }, [user])

  const openUniversities = () => {
    dispatch(getUniversity([]))
    setModalVisibleUniversities(true)
  }

  const openGroups = () => {
    if (selectedUniversity) {
      dispatch(getGroupsByUni(selectedUniversity))
      setModalVisibleGroups(true)
    }
  }

  useEffect(() => {
    setAllUniversities(universities)
  }, [universities])

  useEffect(() => {
    setAllGroups(groups)
  }, [groups])




  useEffect(() => {
    if (selectedUniversity) {
      dispatch(updateUser({
        selectedUniversity: selectedUniversity,
        selectedGroup: null
      }))
      setSelectedGroup(null)
    }
  }, [ selectedUniversity])

  useEffect(() => {
    if (selectedGroup && selectedUniversity) {
      dispatch(updateUser({
        selectedUniversity: selectedUniversity,
        selectedGroup: selectedGroup
      }))
    }
  }, [selectedGroup])

  // useEffect(() => {
  //   async function registerDevice() {
  //     const token = await messaging().getToken()
  //     console.log(token, "token")
  //   }
  //
  //   async function requestUserPermission() {
  //     Platform.OS === "android" && await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
  //     const authStatus = await messaging().requestPermission()
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //
  //     if (enabled) {
  //       await registerDevice()
  //     }
  //   }
  //
  //
  //   requestUserPermission()
  // }, [])


  return (
    <SafeAreaView style={$container}>

      <ModalPicker modalVisible={modalVisibleUniversities}
                   setModalVisible={setModalVisibleUniversities}
                   data={allUniversities}
                   type={UorG.university}
                   setSelected={setSelectedUniversity}
      />
      <ModalPicker modalVisible={modalVisibleGroups}
                   setModalVisible={setModalVisibleGroups}
                   data={allGroups}
                   type={UorG.group}
                   setSelected={setSelectedGroup}
      />
      {
        selectedUniversity ?
          <PickItem item={selectedUniversity}
                    type={UorG.university}
                    onPress={openUniversities} />
          :
          <PickItem item={{ name: "Університет" }}
                    type={UorG.university}
                    onPress={openUniversities} />
      }
      {
        selectedGroup ?
          <PickItem item={selectedGroup}
                    type={UorG.group}
                    onPress={openGroups} />
          :
          <PickItem item={{ name: "Група" }}
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
