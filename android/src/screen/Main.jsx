import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        title: "",
        // headerStyle: {
          
        //   backgroundColor: "white",
        
        // },
        headerShown:false,
        headerTintColor: "skyblue",
        headerTitleStyle: {
          fontSize: 30,
        }
      }}
      initialRouteName='SignUp'
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main

const styles = StyleSheet.create({})
