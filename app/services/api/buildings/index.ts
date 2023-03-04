import firestore from "@react-native-firebase/firestore"
import { UniversityType } from "../../../common/types/university.type"

export const addBuilding = (university: UniversityType) => {
  firestore().collection("universities").doc(university.id)
}
