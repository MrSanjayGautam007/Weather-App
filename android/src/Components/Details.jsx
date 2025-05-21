import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, RefreshControl, ScrollView, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { deviceHeight, deviceWidth } from './Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { API_KEY } from './Constant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = (props) => {
    const { name, image } = props.route.params;
    const [data, setData] = useState();
    const [notFound, setNotFound] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigation = useNavigation();
    const [userImage, setUserImage] = useState(null);
    const [userName, setUserName] = useState('');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`;
    useEffect(() => {
        getAPICall();
        const getData = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                const image = await AsyncStorage.getItem('userImage');
                if (name !== null) {
                    setUserName(JSON.parse(name));
                }
                if (image !== null) {
                    setUserImage(JSON.parse(image));
                }

            } catch (error) {
                console.log('Error', error);
            }
        }
        getData();
    }, []);
    const getAPICall = async () => {
        let timer; // Declare the timer variable

        try {
            //fetch api
            const response = await fetch(url,);
            // Check if the API response status is 'ok'
            if (response.ok) {
                // Parse the JSON response
                setIsRefreshing(true);
                const result = await response.json();
                // Log the result and set the data
                console.log(name, 'Result :', result);
                setData(result);
            }

            else {
                // If the response is not OK, log 'City not found'
                console.log(`City '${name}' not found`);
                setNotFound(`City '${name}' not found`);
                timer = setTimeout(() => {
                    navigation.replace('Home');
                }, 3000);

            }
            setIsRefreshing(false);

        } catch (error) {
            console.log('Network error:', error);
            // console.log(error);
            // setIsRefreshing(false);
            Alert.alert('Network Error', 'There was a problem with your internet connection.');
        }
        finally {
            setIsRefreshing(false);
        }
        return () => {
            if (timer) clearTimeout(timer); // Clear the timeout if it exists
        };
    };
    const Data = ({ title, value }) => {

        return (
            <View style={styles.dataContainer}>
                <Text style={styles.dataTitle}>{title} </Text>
                <Text style={styles.dataValueText}>{value}</Text>

            </View>)
    };
    const handleRefresh = () => {
        getAPICall();
        console.log('Refresh CLicked');
    };
    const onRefresh = () => {
        getAPICall(); // Refresh data when pull-to-refresh is triggered
    };
    return (
        <ImageBackground source={
            // check if image is exist 
            image ? image : require('../images/imageSpace2.jpg')}
            style={{
                height: deviceHeight > deviceWidth ,
                width: '100%',
                flex: 1,
            }}
            imageStyle={{ opacity: 0.7, backgroundColor: 'black' }}
            resizeMode='cover'
        >
            <SafeAreaView style={{
                flex: 1,
            }}>
                <View style={{ padding: 10, }}>
                    <View style={styles.menuIconView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.openDrawer()}
                        >
                            <Ionicons name='menu' size={45} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.navigate('Profile')}
                        >
                            <Image source={userImage?.path ? { uri: userImage?.path } : require('../images/profile.png')}
                                style={styles.userImageStyle}
                            />
                        </TouchableOpacity>

                    </View>

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                                tintColor="#0000ff" // Color of the spinner
                                title="Refreshing..."
                                titleColor="#ff0000" // Color of the title text
                            />
                        }
                        showsVerticalScrollIndicator={false}
                    >
                        {/* <View> */}

                        {
                            data ? (<View style={styles.dataView}>
                                <View >
                                    {/* <View>
                                    <TouchableOpacity onPress={handleRefresh}>
                                        <Text>Refresh</Text>
                                    </TouchableOpacity>
                                </View> */}
                                    <View style={styles.nameView}>


                                        <Ionicons name='location-sharp' size={34} color="red"
                                            style={{ marginTop: 3, }} />
                                        <Text style={styles.nameText}>{name}</Text>
                                    </View>
                                    <Text style={styles.dataMainText}>
                                        {data['weather'][0]['main']}</Text>
                                </View>
                                <Text style={styles.tempText}>
                                    {(data['main']['temp'] - 273.15).toFixed(0)}&deg; C
                                </Text>

                                {/* <View> */}

                                <View style={styles.weatherDetailsView}>
                                    <Text style={styles.weatherDetailsText}>
                                        Weather Details
                                    </Text>
                                    <Data value={`${(data['main']['feels_like'] - 273.15).toFixed(0)} °C`} title='Feels like :' />
                                    <Data value={`${data['wind']['speed']} Km`} title='Wind :' />
                                    <Data value={`${data['main']['pressure']} hPa`} title='Pressure :' />
                                    <Data value={`${data['main']['humidity']}%`} title='Humidity :' />
                                    <Data value={`${(data['visibility'] / 1000).toFixed(1)} Km`} title='Visibility :' />

                                </View>
                                {/* </View> */}
                            </View>) : <View
                                style={styles.notFoundView}

                            ><Text style={styles.notFoundText}>{notFound}</Text></View>
                        }
                        {/* </View> */}
                    </ScrollView>
                </View >


            </SafeAreaView>
        </ImageBackground>
    )
}

export default Details

const styles = StyleSheet.create({
    menuIconView: {
        // padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },
    userImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    dataView: {
        // backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        height: deviceHeight - 300,
        justifyContent: "space-between",
        alignItems: "center",
        // marginTop: deviceWidth - 190,
    },
    nameView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    nameText:
    {
        color: "white",
        fontSize: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
        marginLeft: 7,

    },
    dataMainText: {
        color: "white",
        fontSize: 23,
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    },
    tempText: {
        color: "white",
        fontSize: 64,
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    },
    weatherDetailsText: {
        color: "white",
        fontSize: 23,
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
        textAlign: "center",
    },
    weatherDetailsView: {
        justifyContent: "space-between",
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
        borderRadius: 20,
        marginVertical: 20,

    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
        marginTop: deviceWidth - 190,

    },
    notFoundText: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    },
    dataContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '85%',
    },
    dataTitle: {
        color: "#FFF",
        fontSize: 21,
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    },
    dataValueText: {
        color: "#FFF",
        fontSize: 21,
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow position
        textShadowRadius: 6, // Shadow blur radius
    },
})