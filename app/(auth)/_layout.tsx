import React from 'react'
import { Slot } from 'expo-router'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { images } from '@/constants'

const _layout = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        className='bg-white'
        keyboardShouldPersistTaps='handled'
      >
        <View
          className='w-full'
          style={{
            height: Dimensions.get('screen').height/2.25
          }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className='size-full rounded-full rounded-b-lg'
            resizeMode='stretch'
          />

          <Image
            source={images.logo}
            className='self-center size-48 absolute -bottom-16 z-10'
          />
        </View>
      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  )
}

export default _layout