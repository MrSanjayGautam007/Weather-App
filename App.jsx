import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainApp from './android/src/Components/MainApp'

const App = () => {
  return (
   <SafeAreaProvider>
    <MainApp/>
   </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})