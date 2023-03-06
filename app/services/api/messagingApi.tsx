import { PermissionsAndroid, Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"
import firestore from "@react-native-firebase/firestore"


export async function requestUserPermissions(uniId: string, groupId: string) {
  try {
    Platform.OS === "android" && Platform.Version > 32 && await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      await registerDevice(uniId, groupId)
    }
  } catch (err) {
    console.warn(err, "Error in requestUserPermission")
  }
}

async function registerDevice(uniId: string, groupId: string) {
  const token = await messaging().getToken()
  console.log("token", token)
  await firestore().collection("universities").doc(uniId).collection("groups").doc(groupId).update({
    subscribedUsers: firestore.FieldValue.arrayUnion(token)
  })
}
