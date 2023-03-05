import { StyleSheet, View, ViewStyle } from "react-native"
import MapView, { Marker } from "react-native-maps"
import React, { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { AddMarkerButton } from "./AddMarkerButton"
import { colors } from "../../../theme"

interface Location {
  latitude: number;
  longitude: number;
}

interface Building {
  location: Location;
  address: string;
  name: string;
}

export const MapContext = React.createContext(null)

export const Map = () => {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)


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

  const [newMarker, setNewMarker] = useState({
    name: "",
    address: "",
    location: {
      latitude: 49.836183,
      longitude: 24.014068
    }
  })

  if (loading) {
    return null
  }


  return (
    <MapContext.Provider value={{
      setNewMarker,
      newMarker,
      buildings,
      editing,
      setEditing
    }}>
      <View style={$mapContainer}>
        <MapView
          userInterfaceStyle={"dark"}
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
          <Marker
            pinColor={colors.palette.secondary100}
            draggable
            isPreselected
            coordinate={{
              latitude: newMarker.name ? newMarker.location.latitude : 0,
              longitude: newMarker.name ? newMarker.location.longitude : 0
            }}
            title={newMarker.name}
            description={newMarker.address}
            onDragEnd={(e) => setNewMarker({ ...newMarker, location: e.nativeEvent.coordinate })}
          />
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
      <AddMarkerButton onAddMarker={(v) => setNewMarker({ ...newMarker, location: v })} />
    </MapContext.Provider>
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
