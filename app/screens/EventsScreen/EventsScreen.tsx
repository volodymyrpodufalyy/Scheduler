import React from 'react'
import { SafeAreaView, ScrollView, ViewStyle } from 'react-native'
import { colors } from '../../theme'
import { Event } from './components/Event'
import { EventType } from '../../common/types/event.type'


export const EventsScreen = () => {

  const events:Array<EventType> = [
    {
      id:'1',
      eventName:'Хто має рацію?',
      description:'Почався новий семестр, пора познайомитись із новими заходами. \n' +
        'Перший із них: «Хто має рацію?» (для ознайомлення з форматом пропонуємо переглянути на ютуб-каналі «Леви на джипі» серію відео «Срач».🤌🏻)\n' +
        '\n' +
        'Суть формату: 6 учасників, питання на яке можна відповісти «так» або «ні» (наприклад: купувати роботи чи ні?), учасники діляться на команди «за» та «проти» по 3 людини у кожній. Перемагає та команда, якій вдалось переконати аудиторію аплодувати за свою позицію гучніше.',
      date:new Date(),
      location:'аудиторія 210 IV н.к.'
    }
  ]

  return (
    <SafeAreaView style={$container}>
      <ScrollView>
        {events.map(event=>(<Event key={event.id} event={event}/>))}
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
