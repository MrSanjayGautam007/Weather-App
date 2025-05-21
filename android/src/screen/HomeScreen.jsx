import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const HomeScreen = () => {
    const [todos ,setTodos]=useState([])
    console.log(todos);
    const [task ,setTask]=useState('')
  
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})