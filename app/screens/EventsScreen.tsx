import React from "react"
import { Button, SafeAreaView, Text, ViewStyle } from 'react-native'

export const EventsScreen = () => {

  const onPressHandler = () => {
    console.log('on press')
  }

  return (
    <SafeAreaView style={$container}>
      <Button title={'title'} onPress={onPressHandler}/>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
}
