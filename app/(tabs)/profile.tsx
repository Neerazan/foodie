import { View, Alert } from 'react-native'
import React from 'react'
import CustomButton from "@/components/CustomButton";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";

const Profile = () => {

  const { logout } = useAuthStore();

  const logOut = async () => {
    try {
      await signOut();
      logout();
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