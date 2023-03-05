import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import {useColorScheme} from 'react-native'
import {HomeNavigator} from './HomeNavigator'
import { useAppDispatch } from '../store/store'
import { getUser } from '../store/app/action'

const Stack = createNativeStackNavigator()

const AppStack = () => {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getUser([]))
  },[])

  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        }
      }}
      initialRouteName={'Home'}>
      <Stack.Group>
        <Stack.Screen name="HomeNavigation" component={HomeNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export const AppNavigator = () => {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppStack/>
    </NavigationContainer>
  )
}
