import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StackNavigation from './src/navigations/StackNavigation'
import SplashScreen from './src/comonents/spash/SplashScreen'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },3000)
  },[])

  if (isLoading) {
    return (
        <>
        <SplashScreen/>
        </>
    );
}
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <StackNavigation />
      </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})