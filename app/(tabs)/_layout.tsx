import { Redirect, Slot } from 'expo-router';
import React from 'react';
import useAuthStore from '@/store/auth.store';

const TabLayout = () => {
  const { isAuthenticated } = useAuthStore();
  console.log('isAuthenticated::::: ', isAuthenticated);  

  if (isAuthenticated) return <Slot />

  return <Redirect href={'/sign-in'}/>
}

export default TabLayout