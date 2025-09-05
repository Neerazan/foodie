import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const SignIn = () => {
  return (
    <View>
      <Text className='mt-10'>SignIn</Text>
      <Button
        title='sign-in'
        onPress={() => router.push('/')}
      />
    </View>
  )
}

export default SignIn