import { StyleSheet, View, ViewStyle } from "react-native"
import MapView, { Marker } from "react-native-maps"
import React, { useEffect, useRef, useState } from "react"
import { AddMarkerButton } from "./AddMarkerButton"
import { colors } from "../../../theme"
import { getUniBuildings } from "../../../services/api/uniApi"
import { storage } from "../../../services/api"
import { useAppSelector } from "../../../store/store"
import { useRoute } from "@react-navigation/native"

interface Location {
  latitude: number;
  longitude: number;
}

interface Building {
  location: Location;
  address: string;
  name: string;
  type?: "custom" | "uni";
}

export const MapContext = React.createContext(null)

export const Map = () => {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  const user = useAppSelector(state => state.AppReducer.user)

  const route = useRoute()

  const [building, setBuilding] = useState({
    latitude: 49.835674465548955,
    longitude: 24.014427562445892,
    latitudeDelta: 0.00622,
    longitudeDelta: 0.00421
  })

  const ref = useRef<MapView | null>(null)


  useEffect(() => {
    const fetchInitialLocation = async () => {
      if (route.params) {
        const location = route.params?.location
        const address = route.params?.address
        setBuilding({
          ...building,
          latitude: location.latitude,
          longitude: location.longitude
        })
        ref?.current?.animateToRegion({
          ...building
        })
      }
    }
    fetchInitialLocation()
  }, [])

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true)
        const buildings = await getUniBuildings(user?.selectedUniversity.id) as Building[]
        const customMarkers = await storage.load("markers")
        const parsedMarkers = customMarkers !== null ? JSON.parse(customMarkers) : []
        setBuildings([...buildings, ...parsedMarkers.map((marker: Building) => ({ ...marker, type: "custom" }))])
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.warn(err)
      }
    }

    fetchBuildings()
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


  console.log(building, "building")


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
          ref={ref}
          zoomTapEnabled={false}
          initialRegion={building}>
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
          {buildings.map(({ location, address, name, type }) => {
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
                {...(type === "custom" && { pinColor: colors.palette.secondary100 })}
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
