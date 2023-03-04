import React from 'react'
import { ViewStyle } from 'react-native'
import { EventsScreen, HomeScreen, MenuScreen, ScheduleScreen, MapScreen } from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, IconTypes } from '../components'
import { colors } from '../theme'

const Tab = createBottomTabNavigator()

export function HomeNavigator() {

  const tabNavigationOption = ({ route }: any) => ({

    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: '',
    tabBarStyle: $tabBar,

    tabBarVisible: true,
    tabBarIcon: ({ focused }: any) => {
      let iconName: IconTypes = 'map'

      if (route.name === 'Schedule') {
        iconName = 'schedule'
      }
      if (route.name === 'Map') {
        iconName = 'map'
      }
      if (route.name === 'Events') {
        iconName = 'event'
      }
      if (route.name === 'Menu') {
        iconName = 'menu'
      }

      return <Icon icon={iconName} color={focused ? colors.textDim : colors.text} size={32} />
    }
  })

  return (
    <Tab.Navigator
      initialRouteName={'Menu'}
      screenOptions={tabNavigationOption}
      >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Map" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Маp" component={MapScreen} />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  height: 60,
  borderColor: colors.border,
  borderWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
  shadowColor: colors.border
}
