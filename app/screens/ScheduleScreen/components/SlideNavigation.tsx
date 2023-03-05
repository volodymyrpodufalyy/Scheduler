import React from "react"
import { TextStyle } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { colors } from "../../../theme"
import { Day } from "./Day"


const Tab = createMaterialTopTabNavigator()

export const SlideNavigation = ({ data }: { data: any }) => {

  const screenOptions = {
    tabBarLabelStyle: $tabBarLabel,
    tabBarStyle: { backgroundColor: colors.background },
    tabBarIndicatorStyle: { backgroundColor: colors.textDim }
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {/*@ts-ignore*/}
      {data.map(item => <Tab.Screen
          name={item.day}
          key={item.day}
          component={Day}
          initialParams={{ item: item, day: item.day }}
        />
      )}

    </Tab.Navigator>
  )
}


const $tabBarLabel: TextStyle = {
  fontSize: 12,
  color: colors.text,
  fontWeight: "500"
}
