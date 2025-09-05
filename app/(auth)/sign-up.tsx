import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const SignUp = () => {
  return (
    <View>
      <Text className='mt-10'>Sign Up</Text>
            <Button
              title='sign-in'
              onPress={() => router.push('/sign-in')}
            />
    </View>
  )
}

export default SignUp