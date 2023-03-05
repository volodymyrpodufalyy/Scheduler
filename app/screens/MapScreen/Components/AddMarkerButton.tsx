import { ImageStyle, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import React, { useContext, useState } from "react"
import { Icon } from "../../../components"
import { colors, spacing } from "../../../theme"
import Modal from "react-native-modal"
import { MapContext } from "./Map"
import { storage } from "../../../services/api"


export const AddMarkerButton = ({ onAddMarker }: { onAddMarker: (location: { latitude: number, longitude: number }) => void }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { newMarker, setNewMarker, editing, setEditing } = useContext(MapContext)

  const onPress = () => {
    setEditing(true)
    setModalVisible(true)
  }

  const onConfirm = async () => {
    setEditing(false)
    const markers = await storage.load("markers")
    if (markers !== null) {
      await storage.save("markers", JSON.stringify([...markers, newMarker]))
    } else {
      await storage.save("markers", JSON.stringify([newMarker]))
    }
  }

  return (
    <>
      <View style={$container}>
        {editing ? (
          <Icon onPress={onConfirm} icon={"check"} size={60} />
        ) : (
          <Icon onPress={onPress} icon={"plus"} size={60} />
        )}
      </View>
      <Modal
        backdropOpacity={0.6}
        style={{
          ...$modal,
          borderRadius: 12,
          zIndex: 10
        }}
        isVisible={modalVisible}>
        <View style={$confirmContainer}>
          <TouchableOpacity
            style={{ ...$closeIcon, position: "absolute" }}
            hitSlop={{ right: 30, top: 30, bottom: 30, left: 30 }}
            onPress={() => {
              setModalVisible(false)
              setEditing(false)
            }}>
            <Icon icon={"close"} size={24} />
          </TouchableOpacity>
          <View style={$titleContainer}>
            <Text style={$title}>Add new marker</Text>
          </View>
          <TextInput
            autoFocus
            value={newMarker.name}
            onChangeText={(e) => setNewMarker({ ...newMarker, name: e })}
            style={$input}
            placeholder={"Name of the place"}
            placeholderTextColor={colors.palette.neutral400}
          />
          <TextInput
            value={newMarker.address}
            onChangeText={(e) => setNewMarker({ ...newMarker, address: e })}
            style={$input}
            placeholder={"Description"}
            placeholderTextColor={colors.palette.neutral400}
          />
          <TouchableOpacity onPress={() => {
            onAddMarker(newMarker.location)
            setModalVisible(false)
          }}>
            <Text
              style={{
                ...$input,
                color: colors.palette.secondary100
              }}
            >
              Location (pick on the map)
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}

const $container: ImageStyle = {
  position: "absolute",
  bottom: 32,
  left: 16,
  borderRadius: 30,
  backgroundColor: colors.background,
  zIndex: 2
}

const $modal: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  marginTop: 70
}

const $confirmContainer: ViewStyle = {
  flex: 1
}

const $title: TextStyle = {
  fontSize: 20,
  color: colors.text,
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: 16,
  paddingBottom: 4,
  bottom: 4
}

const $input: TextStyle = {
  padding: spacing.medium,
  color: colors.palette.neutral100,
  fontSize: 18
}

const $titleContainer: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: "#fff",
  borderStyle: "solid"
}

const $closeIcon: ImageStyle = {
  left: 16,
  top: 16,
  zIndex: 12
}
