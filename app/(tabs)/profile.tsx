import { View, Alert } from 'react-native'
import React from 'react'
import CustomButton from "@/components/CustomButton";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";

const Profile = () => {

  const { setIsAuthenticated, setLoading, setUser } = useAuthStore();

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      router.replace('/sign-in');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View className='flex-1 justify-center items-center px-10'>
      <CustomButton
        style="mt-5"
        title="logout"
        onPress={logOut}
      />
    </View>
  )
}

export default Profile