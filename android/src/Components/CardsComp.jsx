import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { deviceHeight, deviceWidth } from './Dimensions'
import { SafeAreaView } from 'react-native-safe-area-context'

const CardsComp = ({ name, image, navigation }) => {
    return (
        <SafeAreaView>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Details', { name, image })}
                style={{
                    marginHorizontal: 5,
                }}

            >
                <ImageBackground source={image} style={{
                    height: deviceHeight / 5,
                    width: deviceWidth / 2 - 50,
                    flex: 1,
                }}
                    imageStyle={{ borderRadius: 18, }} />
                <View style={styles.imageView}>
                    <Text style={styles.imageText}>
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CardsComp
const styles = StyleSheet.create({
    imageView: {
        position: "absolute",
        height: "100%",
        width: '100%',
    },
    imageText: {
        fontSize: 25,
        textAlign: "center",
        textAlignVertical: "center",
        color: "#fff",
        height: "100%",
        width: '100%',
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    }
})

