import React from "react"
import { Button, SafeAreaView, ViewStyle } from 'react-native'
import { getUnis, getUniGroups, getUniBuildings, getUniEvents, getUniGroupSchedule} from "../services/api/uniApi"

export const EventsScreen = () => {

  const logUnis = async () => {
    console.log(await getUnis())
    // qqq()
  }

  const logUniGroupInfo = async () => {
    console.log(await getUniGroups('LPNU'))
  }

  const logUniBuildingsInfo = async () => {
    console.log(await getUniBuildings('LPNU'))
  }

  const logUniEventsInfo = async () => {
    console.log(await getUniEvents('LPNU'))
  }

  const logUniGroupSchedule = async () => {
    console.log(await getUniGroupSchedule('LPNU', 'CE35'))
  }

  return (  
    <SafeAreaView style={$container}>
      <Button title={'List of unis'} onPress={logUnis}/>
      <Button title={'Info about UniGroup'} onPress={logUniGroupInfo}/>
      <Button title={'Info about UniBuilding'} onPress={logUniBuildingsInfo}/>
      <Button title={'Info about UniEvent'} onPress={logUniEventsInfo}/>
      <Button title={'Info about Schedule'} onPress={logUniGroupSchedule}/>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
}
