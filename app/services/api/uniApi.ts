import firestore from "@react-native-firebase/firestore"

export async function getUnis(){
    const snapshot = await firestore().collection('universities').get()

    return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
            id: doc.id,
            name: data?.name,
            img: data?.img,
        }
    })
}

export async function getUniGroups(uniId: string){

    const snapshot = await firestore()
                            .collection('universities')
                            .doc(uniId)
                            .collection('groups')
                            .get()

    return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
            id: doc.id,
            name: data?.name,
        }}
    )
}

export async function getUniBuildings(uniId: string){
    const snapshot = await firestore()
                            .collection('universities')
                            .doc(uniId)
                            .collection('buildings')
                            .get()

    return snapshot.docs.map(doc => doc.data())
}

export async function getUniEvents(uniId: string){
    const snapshot = await firestore()
                            .collection('universities')
                            .doc(uniId)
                            .collection('events')
                            .get()

    return snapshot.docs.map(doc => doc.data())
}

export async function getUniGroupSchedule(uniId: string, groupId: string){
    const snapshot = await firestore()
                            .collection('universities')
                            .doc(uniId)
                            .collection('groups')
                            .doc(groupId)
                            .collection('lessons')
                            .get()

    return snapshot.docs.map(doc => doc.data())
}
