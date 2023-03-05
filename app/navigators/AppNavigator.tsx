import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, useColorScheme, View, ViewStyle } from "react-native"
import { HomeNavigator } from "./HomeNavigator"
import { useAppDispatch, useAppSelector } from "../store/store"
import { getUser } from "../store/app/action"
import { WelcomeScreen } from "../screens/WelcomeScreen"
import { colors } from "../theme"

const Stack = createNativeStackNavigator()

const LoadingScreen = () => (
  <View style={$loader}>
    <ActivityIndicator />
  </View>
)

const AppStack = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.AppReducer)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      await dispatch(getUser([]))
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false
        }
      }}
    >
      {user !== null ? (
        <Stack.Group>
          {console.log("render home")}
          <Stack.Screen name="HomeNavigation" component={HomeNavigator} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          {console.log("render welcome")}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export const AppNavigator = () => {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppStack />
    </NavigationContainer>
  )
}

const $loader: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.background,
  alignItems: "center",
  justifyContent: "center"
}
