import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, ViewStyle } from 'react-native'
import { colors } from '../../theme'
import { Event } from './components/Event'
import { EventType } from '../../common/types/event.type'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getEvents } from '../../store/app/action'


export const EventsScreen = () => {
  const events = useAppSelector(state => state.AppReducer.events)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getEvents([]))
  },[])



  return (
    <SafeAreaView style={$container}>
      <ScrollView>
        {events.map((event:any)=>(<Event key={event.id} event={event}/>))}
      </ScrollView>

    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: colors.background,
  alignItems: 'center',
  paddingVertical: 5

}
