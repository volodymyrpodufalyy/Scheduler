import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect } from "react"
import { ActivityIndicator, useColorScheme, View, ViewStyle } from "react-native"
import { HomeNavigator } from "./HomeNavigator"
import { useAppDispatch, useAppSelector } from "../store/store"
import { getUser } from "../store/app/action"
import { WelcomeScreen } from "../screens/WelcomeScreen"
import { isNotEmpty } from "../utils"
import { DataStatus } from "../common/enums/data-status.enum"
import { colors } from "../theme"

const Stack = createNativeStackNavigator()

const AppStack = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const { dataStatus, user } = useAppSelector(state => state.AppReducer)
  const loading = dataStatus === DataStatus.PENDING

  useEffect(() => {
    dispatch(getUser([]))
  }, [])

  useEffect(() => {
    if (user === null) {
      navigation.navigate("WelcomeScreen")
    } else if (isNotEmpty(user)) {
      navigation.navigate("HomeNavigation")
    }
  }, [user])


  console.log(loading, "loading")

  if (loading) {
    return (
      <View style={$loader}>
        <ActivityIndicator />
      </View>
    )
  }


  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false
        }
      }}
    >
      {isNotEmpty(user) ? (
        <>
          <Stack.Group>
            {console.log("render home")}
            <Stack.Screen name="HomeNavigation" component={HomeNavigator} />
          </Stack.Group>
        </>) : (
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
