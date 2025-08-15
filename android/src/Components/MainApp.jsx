import { ImageBackground, StyleSheet, useColorScheme, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Details from './Details';
import Profile from './Profile';


import { SafeAreaView } from 'react-native-safe-area-context';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
const HomeStack = () => (
    <Stack.Navigator screenOptions={{
        headerShown:
            false,
        animation: 'fade_from_bottom', 
    }}><Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
);

const MainApp = () => {
    const isDarkMode = useColorScheme() === "dark";


    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={CustomDrawerContent}

                drawerStyle={{
                    width: 250, // Adjust the width of the drawer
                    // backgroundColor: isDarkMode ? 'black' : '#fff', // Background color of the drawer
                }}

                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: isDarkMode ? '#00bcd4' : 'gray', // Color when item is active
                    drawerInactiveTintColor: '#888', // Color for inactive items
                    drawerActiveTintColor: '#fff', // Color for active item text

                }}
            >
                <Drawer.Screen name="HomeScreen"
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home" size={24} color={color} />
                        ),

                    }}
                    component={HomeStack}
                />


            </Drawer.Navigator>
        </NavigationContainer>

    );
}
const CustomDrawerContent = () => {
    const [userName, setUserName] = useState('');
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                const image = await AsyncStorage.getItem('userImage');
                if (name !== null) {
                    setUserName(JSON.parse(name));
                }
                if (image !== null) {
                    setImage(JSON.parse(image));
                }

            } catch (error) {
                console.log('Error', error);
                Alert.alert('Error', 'Failed to retrieve data from AsyncStorage');
            }
        }
        getData();

    }, [])
    return (
        <SafeAreaView style={styles.mainView}>

            <Image source={image?.path ? { uri: image?.path } : require('../images/profile.png')}
                style={styles.imageView}
            />

            <Text style={styles.userText}>
                {
                    userName ? `Hello 👋 Mr. ${userName}` : 'User'
                }
            </Text>

            {/* Add more content here */}
        </SafeAreaView>
    );
}

export default MainApp


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#3f3f3f',
        borderRadius: 3,
        alignItems: 'center'
    },
    imageView: {
        height: 120,
        width: 120,
        borderRadius: 60,
        marginVertical: 20,
        borderWidth: 0.4,
        borderColor: '#fff',
    },
    userText: {
        fontSize: 20,
        padding: 10,
        color: '#fff', textAlign: "center",
        marginVertical: 20,
        fontWeight: '500',
    }

})
