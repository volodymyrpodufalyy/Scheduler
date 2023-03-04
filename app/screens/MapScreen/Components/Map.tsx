import { StyleSheet, View, ViewStyle } from "react-native"
import MapView, { Marker } from "react-native-maps"
import React, { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"

interface Building {
  location: {
    latitude: number
    longitude: number
  };
  address: string;
  name: string;
}

export const Map = () => {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const subscriber = firestore()
      .collection("universities")
      .doc("LPNU")
      .collection("buildings")
      .onSnapshot(querySnapshot => {
        const result: Building[] = []

        if (querySnapshot) {
          querySnapshot.forEach(documentSnapshot => {
            result.push({
              ...(documentSnapshot.data() as Building)
            })
          })

          setBuildings(result)
          setLoading(false)
        }
      })

    // Unsubscribe from events when no longer in use
    return () => subscriber()
  }, [])


  if (loading) {
    return null
  }


  return (
    <View style={$mapContainer}>
      <MapView
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        showsPointsOfInterest={true}
        style={$map}
        zoomControlEnabled={false}
        zoomEnabled={false}
        zoomTapEnabled={false}
        initialRegion={{
          latitude: 49.835674465548955,
          longitude: 24.014427562445892,
          latitudeDelta: 0.00622,
          longitudeDelta: 0.00421
        }}>
        {buildings.map(({ location, address, name }) => {
          const { latitude, longitude } = location
          return (
            <Marker
              key={longitude + latitude}
              coordinate={{
                longitude: longitude ? Number(longitude) : 0,
                latitude: latitude ? Number(latitude) : 0
              }}
              title={name}
              description={address}
            />
          )
        })}
      </MapView>
    </View>
  )
}

const $mapContainer: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "flex-end",
  alignItems: "center"
}

const $map: ViewStyle = {
  ...StyleSheet.absoluteFillObject
}
