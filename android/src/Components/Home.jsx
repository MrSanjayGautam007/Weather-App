import { Button, StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Alert, FlatList, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deviceHeight, deviceWidth } from './Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import CardsComp from './CardsComp';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
    const [city, setCity] = useState('');
    const [badCity, setBadCity] = useState(null);
    const navigation = useNavigation();
    // const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
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
            }
        }
        getData();

    }, [])

    const cities = [
        {
            name: 'New Delhi',
            image: require('../images/NewDelhi.jpg')
        },
        {
            name: 'Mumbai',
            image: require('../images/image4.jpg')
        },
        {
            name: 'London',
            image: require('../images/image5.jpg')
        },
        {
            name: 'San Francisco',
            image: require('../images/image6.jpg')
        },
        {
            name: 'New Jersey',
            image: require('../images/NewJersey1.jpg')
        },
        {
            name: 'New York',
            image: require('../images/NewYork.jpg')
        },
    ]
    const handleSearch = () => {
        if (!city.trim()) {
            // Alert.alert('Error', 'Please Enter City');
            setBadCity(true);

            return;
        }
        else {
            props.navigation.navigate('Details', { name: city });
            setCity('');

        }
    };
    const textFill = (text, field) => {
        if (field === 'city') {
            setCity(text);
            setBadCity(false);
        }

    }
    return (

        <ImageBackground
            source={require('../images/imageSpace.jpg')}
            style={{
                height: deviceHeight > deviceWidth,
                width: '100%',
                flex: 1,
                // padding: 10,
            }}
            imageStyle={{ opacity: 0.7, backgroundColor: 'black' }}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.mainView}>
                {/* StatusBar Styling */}
                <StatusBar
                    barStyle="light-content" // Use 'dark-content' if the image is light-colored
                    translucent={true} // Makes the status bar translucent
                    backgroundColor="transparent" // Background color of status bar (transparent to blend with image)
                />
                <View
                    style={{ flex: 1 }}
                >
                    <View style={{ padding: 10, }}>
                        <View style={styles.menuIconView}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => props.navigation.openDrawer()}
                            >
                                <Ionicons name='menu' size={45} color='white' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('Profile')}
                            >
                                <Image source={image?.path ? { uri: image?.path } : require('../images/profile.png')}
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{
                            paddingHorizontal: 18,
                            marginTop: 90,
                        }}
                            showsVerticalScrollIndicator={false}

                        >

                            <Text style={styles.userNameText}>
                                Welcome! {userName ? `Mr. ${userName}` : 'User'}
                            </Text>
                            <Text
                                style={styles.searchCity}>
                                Search the city by name
                            </Text>

                            <View style={styles.inputView}>
                                <TextInput placeholder='Search'
                                    placeholderTextColor={'white'}
                                    value={city}
                                    onChangeText={(text) => textFill(text, 'city')}
                                    // autoFocus={true}
                                    style={styles.inputField}
                                    onSubmitEditing={() => handleSearch()}

                                />

                                {
                                    city && (<TouchableOpacity
                                        activeOpacity={0.7}
                                        style={{ marginRight: 10, }}
                                        onPress={() => setCity('')}>
                                        <Feather name="x" size={25} color="#fff" />
                                    </TouchableOpacity>)
                                }

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={handleSearch}>
                                    <Ionicons name="search" size={25} color="#fff" />
                                </TouchableOpacity>
                            </View>


                            {
                                badCity && (<View>
                                    <Text style={styles.badCityText}>

                                        Please Enter City</Text>
                                </View>)
                            }

                            <View style={styles.topCityView}>
                                <Text style={styles.topCityText}>
                                    Top Cities
                                </Text>
                            </View>

                            <FlatList
                                horizontal
                                data={cities}
                                // keyExtractor={(item) => item.id} 
                                renderItem={({ item }) => (
                                    <CardsComp name={item.name} image={item.image} navigation={props.navigation} />
                                )}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingBottom: 20,
                                    paddingLeft: 10,
                                    marginBottom: 20,
                                }}
                            />

                        </ScrollView>


                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )

};


export default Home

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    menuIconView: {
        // padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },
    inputView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: "#fff",
        backgroundColor: "transparent",
        elevation: 30,
        marginTop: 30,
        paddingHorizontal: 20,
    },
    inputField: {
        // paddingHorizontal: 10,
        flex: 1,
        color: "white",
        marginLeft: 5,
        fontSize: 17,
    },
    userNameText: {
        fontSize: 25,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
        marginVertical: 20,
        fontWeight: "500",
        // fontStyle: 'italic'
    },
    searchCity: {
        fontSize: 20,
        color: '#fff',
        fontWeight: "600",
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
        marginLeft: 20,
    },
    badCityText: {
        color: 'red',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 20,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
    },
    topCityView: {
        marginTop: 20,
        marginBottom: 10,
        paddingLeft: 20,
    },
    topCityText: {
        fontSize: 27,
        color: '#fff',
        fontWeight: "600",
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    },

})