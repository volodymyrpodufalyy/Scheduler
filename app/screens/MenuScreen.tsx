import React, { useEffect, useState } from "react"
import { Dimensions, ImageStyle, PermissionsAndroid, Platform, SafeAreaView, TextStyle, ViewStyle } from "react-native"
import { colors } from "../theme"
import { ModalPicker, UorG } from "../components/ModalPicker"
import { PickItem } from "../components/PickItem"
import messaging from "@react-native-firebase/messaging"

const groups = [
  { name: "IOT-32", image: "" },
  { name: "IOT-31", image: "" },
  { name: "IOT-33", image: "" }
]

const university = [
  {
    name: "Національний університет «Львівська політехніка»",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Nulp_logo_ukr.jpg"
  },
  { name: "2", image: "" },
  { name: "3", image: "" }
]

const screenWidth = Dimensions.get("window").width
export const MenuScreen = () => {

  const [modalVisibleGroups, setModalVisibleGroups] = useState(false)
  const [modalVisibleUniversities, setModalVisibleUniversities] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)

  useEffect(() => {
    async function registerDevice() {
      const token = await messaging().getToken()
      console.log(token, "token")
    }

    async function requestUserPermission() {
      Platform.OS === "android" && await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
        await registerDevice()
      }
    }


    requestUserPermission()
  }, [])


  return (
    <SafeAreaView style={$container}>

      <ModalPicker modalVisible={modalVisibleUniversities}
                   setModalVisible={setModalVisibleUniversities}
                   data={university}
                   type={UorG.university}
                   setSelected={setSelectedUniversity}
      />
      <ModalPicker modalVisible={modalVisibleGroups}
                   setModalVisible={setModalVisibleGroups}
                   data={groups}
                   type={UorG.group}
                   setSelected={setSelectedGroup}
      />
      {
        selectedUniversity ?
          <PickItem item={selectedUniversity}
                    type={UorG.university}
                    onPress={() => setModalVisibleUniversities(true)} />
          :
          <PickItem item={{ name: "Університет" }}
                    type={UorG.university}
                    onPress={() => setModalVisibleUniversities(true)} />
      }
      {
        selectedGroup ?
          <PickItem item={selectedGroup}
                    type={UorG.group}
                    onPress={() => setModalVisibleGroups(true)} />
          :
          <PickItem item={{ name: "Група" }}
                    type={UorG.group}
                    onPress={() => setModalVisibleGroups(true)} />
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
  width: 50,
  height: 50,
  marginHorizontal: 15

}

const $name: TextStyle = {
  width: screenWidth - 75,
  color: "white",
  fontSize: 18,
  flexWrap: "wrap"
}
