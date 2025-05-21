import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { use, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home')
        }, 1000);
        return () => {
            if (timer) clearTimeout(timer); // Clear the timeout if it exists
        };
    }, []);
    return (
        <SafeAreaView style={styles.mainView}>
            <StatusBar backgroundColor={'#5f61f1'} barStyle={'light-content'} />
            <Image source={require('../images/Weather.png')}
                style={{
                    height: 200,
                    width: 200,
                }}
                resizeMode="cover"

            />

        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5f61f1"
    },
})