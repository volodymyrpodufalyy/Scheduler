import {SafeAreaView, StyleSheet, Text, View, ViewStyle} from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

export const MapScreen = () => {
  return (
    <SafeAreaView style={$container}>
      <Text>MapScreen</Text>
      <View style={$mapContainer}>
        <MapView
          provider="google"
          style={$map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: '#ffffff',
}

const $mapContainer: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  height: 400,
  width: 400,
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: 80,
}

const $map: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
}
