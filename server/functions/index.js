const functions = require("firebase-functions")
const admin = require("firebase-admin")

const query = "universities/${universityId}/groups/${groupId}"
exports.listenSchedule = functions.firestore.document(query).onWrite((change, context) => {
 
})
