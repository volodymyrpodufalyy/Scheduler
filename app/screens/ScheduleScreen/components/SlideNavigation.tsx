import React from 'react'
import { TextStyle } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { colors } from '../../../theme'
import { Day } from './Day'

const Tab = createMaterialTopTabNavigator()

export const SlideNavigation = () => {

  const schedule = [
    { day: 'ПН', lessons:[{name:'Комп’ютерні мережі'}] },
    { day: 'ВТ', lessons:[{name:'second name'}] },
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
