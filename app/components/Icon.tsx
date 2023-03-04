import * as React from 'react'
import {ComponentType} from 'react'
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps['onPress']
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 20,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}>
      {/*@ts-ignore*/}
      <Image
        style={[
          $imageStyle,
          color && {tintColor: color},
          size && {width: size, height: size},
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  schedule: require('../../assets/icons/Schedule.png'),
  map: require('../../assets/icons/Map.png'),
  event: require('../../assets/icons/event.png'),
  menu: require('../../assets/icons/Menu.png'),
}

const $imageStyle: ImageStyle = {
  resizeMode: 'contain',
}
