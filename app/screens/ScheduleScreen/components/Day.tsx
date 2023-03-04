import React from 'react'
import { Dimensions, SafeAreaView, Text, View, ViewStyle } from 'react-native'
import { colors } from '../../../theme'
import { Lesson } from './Lesson'

export const Day = ({ route }: { route: any }) => {

  const { item } = route.params

  return <SafeAreaView style={$container}>
    {item?.lessons?.map((el:any, index:number)=>(
        <Lesson key={index} lesson={el}/>
      ))
    }
  </SafeAreaView>
}

const $container: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: colors.background,
  alignItems: 'center'
}

