const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

const listener = async (change, context) => {
  const groupId = change?.params?.groupId
  console.warn(groupId, "groupId")
  console.warn(change, "change")
  try {
    const group = await admin.firestore().collectionGroup("groups").where("id", "==", groupId).get()
    // const group = await admin.firestore().collection("universities").doc(university?.id).collection("groups").doc(groupId).get()

    console.warn(group, "group")
    // console.log(university, "university")
    // console.log(group, "group")
    //
    // await admin.messaging().sendToDevice(
    //   group.subscribedUsers,
    //   {
    //     data: {
    //       title: "Schedule updated",
    //     },
    //   },
    //   {
    //     // Required for background/quit data-only messages on iOS
    //     contentAvailable: true,
    //     // Required for background/quit data-only messages on Android
    //     priority: "high",
    //   },
    // )
  } catch (error) {
    console.log(error, "error")
  }
}

exports.onUpdateGroup = functions.firestore.document("universities/{universityId}/{groups}/{groupId}").onUpdate(listener)
exports.onCreateGroup = functions.firestore.document("universities/{universityId}/{groups}/{groupId}").onCreate(listener)
exports.onDeleteGroup = functions.firestore.document("universities/{universityId}/{groups}/{groupId}").onDelete(listener)

exports.listenSchedule = functions.firestore.document("universities/{universityId}/{groups}/{groupId}").onWrite(async (change, context) => {
  // Get the group details
  const groupId = change?.params?.groupId
  console.warn(groupId, "groupId")
  console.warn(change?.params, "change.params")
  try {
    const group = await admin.firestore().collectionGroup("groups").where("id", "==", groupId).get()
    // const group = await admin.firestore().collection("universities").doc(university?.id).collection("groups").doc(groupId).get()

    console.warn(group, "group")
    // console.log(university, "university")
    // console.log(group, "group")
    //
    // await admin.messaging().sendToDevice(
    //   group.subscribedUsers,
    // notification: {
    //   body: 'This is an FCM notification that displays an image!',
    //     title: 'FCM Notification',
    // },
    //   },
    //   {
    //     // Required for background/quit data-only messages on iOS
    //     contentAvailable: true,
    //     // Required for background/quit data-only messages on Android
    //     priority: "high",
    //   },
    // )
  } catch (error) {
    console.log(error, "error")
  }
})
