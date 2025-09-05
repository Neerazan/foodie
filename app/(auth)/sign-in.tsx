import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { signIn } from '@/lib/appwrite'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) return Alert.alert('Please enter valid email address and password');
    
    setIsSubmitting(true);
    try {
      await signIn({email, password})
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
      <CustomButton title='Sign In' style='mt-3' onPress={submit} isLoading={isSubmitting} />
      
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Don&apos;t have an account?
        </Text>
        <Link href={'/sign-up'} className='base-bold text-primary'>Sign Up</Link>
      </View>
    </View>
  )
}

export default SignIn