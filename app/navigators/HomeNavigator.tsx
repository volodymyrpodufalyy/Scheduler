import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, Text, View, ViewStyle } from 'react-native'
import { EventsScreen, MapScreen, MenuScreen, ScheduleScreen } from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, IconTypes } from '../components'
import { colors } from '../theme'
import { Header } from '../components/Header'
import { useAppSelector } from '../store/store'


const Tab = createBottomTabNavigator()

export function HomeNavigator() {

  const user = useAppSelector(state => state.AppReducer.user)
  const [currUser, setCurrUser] = useState(null)

  useEffect(() => {
    // @ts-ignore
    setCurrUser(user)
  }, [user])

  const tabNavigationOption = ({ route }: any) => ({
    tabBarShowLabel: false,
    header: ({ route }: any) => (
      <Header title={route.name} />
    ),
    tabBarActiveTintColor: "",
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

      return (
        <View style={$icon}>
          <Icon icon={iconName} color={focused ? colors.textDim : colors.text} size={24} />
        </View>
      )
    }
  })

  return (<>
      {currUser !== null ?
        <Tab.Navigator initialRouteName={currUser ? 'Schedule' : 'Menu'} screenOptions={tabNavigationOption}>
          <Tab.Screen name="Schedule" component={ScheduleScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Events" component={EventsScreen} />
          <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator> : <View style={$container}>
          <ActivityIndicator/>
        </View>}
    </>
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

const $icon: ViewStyle = {
  top: Platform.OS === 'ios' ? 8 : 0
}
const $container: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: colors.background,
  alignItems: 'center',
  justifyContent: 'center'
}
