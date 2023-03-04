import React from 'react'
import { Dimensions, SafeAreaView, Text, TextStyle, View, ViewStyle } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '../theme'

const Tab = createMaterialTopTabNavigator()

const screenWidth = Dimensions.get('window').width
const Day = ({ route }: { route: any }) => {

  const { item } = route.params

  return <SafeAreaView style={$container}>
    <View style={$lesson}>
      <Text>{item.day}</Text>
    </View>
    <View style={$lesson}>
      <Text>{item.day}</Text>
    </View>
  </SafeAreaView>
}

const $lesson:ViewStyle = {
  width:screenWidth-32,
  height: 120,
  backgroundColor:colors.palette.primary200,
  marginTop: 15,
  borderRadius:10,
  padding:5,
}

const $container: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: colors.background,
  alignItems:'center'
}


export const ScheduleScreen = () => {

  const schedule = [
    { day: 'ПН' },
    { day: 'ВТ' },
    { day: 'СР' },
    { day: 'ЧТ' },
    { day: 'ПТ' }
  ]

  const screenOptions = {
    tabBarLabelStyle: $tabBarLabel,

    tabBarStyle: { backgroundColor: colors.background },
    tabBarIndicatorStyle: {backgroundColor: colors.textDim}
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {schedule.map(item => <Tab.Screen
          name={item.day}
          key={item.day}
          component={Day}
          initialParams={{ item: item }}
        />
      )}

    </Tab.Navigator>
  )
}


const $tabBarLabel: TextStyle = {
  fontSize: 12,
  color: colors.text,
  fontWeight: '500'
}
