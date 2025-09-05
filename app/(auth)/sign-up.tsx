import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Button, Text, View } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    if (!form.email || !form.password || !form.name) return Alert.alert('Please enter valid email address and password');
    setIsSubmitting(true);
    try {
      Alert.alert('Success', 'User signed up successfully')
      setIsSubmitting(false);
      router.replace('/')
    } catch (error:any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <View className='gap-1 bg-white rounded-lg p-5 mt-5'>
      <CustomInput
        placeholder='Enter you full Name'
        value={form.name}
        label='Full Name'
        onChangeText={(name) => setForm({...form, name: name})}
        keyboardType='email-address'
      />
      <CustomInput
        placeholder='Enter you email'
        value={form.email}
        label='Email'
        onChangeText={(text) => setForm({...form, email: text})}
        keyboardType='email-address'
      />
      <CustomInput
        placeholder='Enter you password'
        value={form.password}
        label='Password'
        onChangeText={(password) => setForm({ ...form, password: password })}
        secureTextEntry={true}
      />
      <CustomButton title='Sign In' style='mt-3' onPress={submit}/>
      
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Already have an account?
        </Text>
        <Link href={'/sign-in'} className='base-bold text-primary'>Sign in</Link>
      </View>
    </View>
  )
}

export default SignUp