import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, TextInput, Alert, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { deviceHeight, deviceWidth } from './Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
const Profile = (props) => {
    const [userName, setUserName] = useState('');
    const [badName, setBadName] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const isDarkMode = true;
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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
    const selectImage = () => {

        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                setModalVisible(false);
                // Alert.alert('Warning', 'User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage || 'Image selection failed.');
                setModalVisible(false);
                // StatusBar.setHidden(false);
            } else if (response.assets && response.assets.length > 0) {
                const selectedUri = response.assets[0].uri;
                console.log("Selected URI:", selectedUri);
                setModalVisible(false);
                // Open cropper with selected image
                ImageCropPicker.openCropper({
                    path: selectedUri,
                    freeStyleCropEnabled: true,
                    cropperToolbarTitle: 'Crop your image',
                    hideBottomControls: false,
                    width: 300,
                    height: 300,
                    // Quality-related settings:
                    compressImageQuality: 1, // 1 means 100% quality

                    // Add this if you want original EXIF orientation preserved
                    includeExif: true,
                })
                    .then((croppedImage) => {
                        console.log("Cropped Image:", croppedImage);
                        setImage(croppedImage);
                        setModalVisible(false);
                    })
                    .catch((error) => {
                        console.log('Crop cancelled or failed:', error);

                    });
            } else {
                console.log('No image selected');
                // Alert.alert('Warning', 'No image selected');
            }
        });
    }


    const handleDeleteImage = async () => {
        try {
            await AsyncStorage.removeItem('userImage');
            setImage(null);
            setModalVisible(false);
            Alert.alert('Success', 'Image deleted successfully');
        } catch (error) {
            console.log('Error deleting image:', error);
        }

    }
    const saveName = async () => {
        let timer; // Declare the timer variable
        try {
            if (!userName) {
                setBadName(true);
                return;
            }
            if (userName.length < 3) {
                setBadName(true);
                return;
            }
            if (!image) {
                Alert.alert('Warning', 'Please Select Image');
                return;

            }
            else {
                await AsyncStorage.setItem('userName', JSON.stringify(userName));
                await AsyncStorage.setItem('userImage', JSON.stringify(image));

                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);

                    navigation.navigate('Home');


                }, 1000);



            }
        } catch (error) {
            console.log('Error', error);
        }
        return () => {
            if (timer) clearTimeout(timer); // Clear the timeout if it exists
        };
    }
    const textFill = (text, type) => {
        if (type === 'userName') {
            setUserName(text);
            setBadName(false);
        }

    }
    return (
        <ImageBackground source={require('../images/imageSpace2.jpg')}
            style={{
                height: deviceHeight > deviceWidth,
                width: '100%',
                flex: 1,
            }}
            imageStyle={{ opacity: 0.7, backgroundColor: 'black' }}
            resizeMode='cover'
        >
            <SafeAreaView style={styles.mainView}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor={'transparent'}
                />
                <View style={styles.insideContainer}>
                    <View style={styles.menuIconView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.openDrawer()}
                        >
                            <Ionicons name='menu' size={45} color='#fff' />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* image */}
                <ScrollView
                    contentContainerStyle={{
                        // flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 20,
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.imageView}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onLongPress={() => setImagePreview(true)}
                        >
                            <Image source={image?.path ? { uri: image?.path } : require('../images/profile.png')}
                                style={styles.imageStyle}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            activeOpacity={0.8}
                            style={styles.iconBtnStyle}
                        >
                            {
                                image ? <Entypo name='pencil' size={22} color='#fff' /> :
                                    <Entypo name='plus' size={22} color='#fff' />
                            }
                            {/* <Entypo name='pencil' size={22} color='#fff' /> */}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.inputView}>
                        <TextInput
                            placeholder='Enter Your Name'
                            placeholderTextColor={'black'}
                            style={styles.input}
                            value={userName}
                            onChangeText={(text) => textFill(text, 'userName')}
                        />

                    </View>
                    <Text
                        style={styles.badText}
                    >{badName && 'Please Enter Name'}</Text>
                    <TouchableOpacity
                        onPress={saveName}
                        style={styles.saveBtn}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.btnText}>Save Profile</Text>
                    </TouchableOpacity>
                    <Modal transparent={true}
                        visible={showSuccessMessage}
                        onRequestClose={() => setShowSuccessMessage(false)}
                        animationType="fade"
                        hardwareAccelerated={true}
                        statusBarTranslucent={true}
                        presentationStyle="overFullScreen"

                    >
                        <View style={styles.centerView}>
                            <View style={[styles.modalView, { backgroundColor: '#fff', flexDirection: 'row' }]}>
                                <Text style={[styles.modalText, { color: 'black', textAlign: "center", fontSize: 20 }]}>Profile Saved! ✅</Text>

                            </View>

                        </View>
                    </Modal>
                    <Modal
                        transparent={true}
                        visible={imagePreview}
                        onRequestClose={() => setImagePreview(false)}
                        animationType="fade"
                        hardwareAccelerated={true}
                        statusBarTranslucent={true}
                        presentationStyle="overFullScreen">

                        <View style={[styles.centerView,]}>

                            {/* <View style={[styles.modalView, { backgroundColor: '#fff', flexDirection: 'row' }]}>
                                <Text style={[styles.modalText, { color: 'black', textAlign: "center", fontSize: 20 }]}>Profile Saved! ✅</Text>

                            </View> */}
                            <View style={styles.imageModalView}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setImagePreview(false)}
                                    style={styles.closeBtnView}
                                >

                                    <Ionicons name='close' size={30} color='#fff' />

                                </TouchableOpacity>
                                <Image source={image?.path ? { uri: image?.path } : require('../images/profile.png')}
                                    style={styles.previewImageStyle}
                                    resizeMode='cover'
                                    zoomScale={1.5}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Modal transparent visible={modalVisible} animationType="fade"
                        onRequestClose={() => setModalVisible(false)}
                        hardwareAccelerated={true}
                        statusBarTranslucent={true}
                        presentationStyle="overFullScreen"
                    >
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={styles.overlay}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.modal}>
                                        <Text style={styles.title}>Select Option</Text>

                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={styles.button} onPress={selectImage}>
                                            <Text style={styles.buttonText}>Choose from Gallery</Text>
                                        </TouchableOpacity>
                                        {
                                            image &&
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                style={styles.button} onPress={handleDeleteImage}>
                                                <Text style={[styles.buttonText, { color: 'red' }]}>Delete Image</Text>
                                            </TouchableOpacity>
                                        }

                                        <TouchableOpacity
                                            activeOpacity={0.7}

                                            style={styles.button}

                                            onPress={() => setModalVisible(false)}>
                                            <Text style={styles.buttonText}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Profile

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    menuIconView: {

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: deviceWidth - 20,
    },
    //Modal Style 
    centerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: "white",
        padding: 20,

        borderRadius: 10,
        shadowColor: "#000",
        // For android
        elevation: 10,
        //for ios
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,

    },
    modalText: {
        fontSize: 18,

    },
    imageView: {
        borderRadius: 80,
        borderWidth: 7,
        height: 135,
        width: 135,
        borderColor: 'rgba(0,0,0,0.5)',
        borderColor: 'skyblue',
        justifyContent: "center",
        alignItems: "center",

    },
    imageStyle: {
        height: 125,
        width: 125,
        borderRadius: 80,
    },
    insideContainer: {
        padding: 10,
        backgroundColor: 'transparent',
        justifyContent: "center",
        // alignItems: "center",
    },
    inputView: {
        justifyContent: "center",
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 60,
        width: '80%',
        backgroundColor: '#fff',
        elevation: 10,
        height: 50,
    },
    input: {
        color: 'black',
        flex: 1,
        marginLeft: 14,
    },
    badText: {
        color: 'yellow',
        marginLeft: 30,
        marginTop: 10,
        alignSelf: 'flex-start',
        fontSize: 15,
    },
    saveBtn: {
        backgroundColor: '#fff',
        width: '30%',
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
        elevation: 10,
    },
    btnText: {
        fontSize: 16,
        color: 'black',
    },
    iconBtnStyle: {
        position: 'absolute',
        bottom: 0,
        right: -5,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 50,

        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 35,


    },
    closeBtn: {
        fontSize: 35,
        color: 'white',
        fontWeight: '400',
        padding: 5,
        borderRadius: 50,
    },
    imageModalView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        width: '90%',
        height: '90%',

    },
    closeBtnView: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 50,
        padding: 5,
    },
    previewImageStyle: {
        height: 210,
        width: 210,
        borderRadius: 130,
    },
    // modal customStyles 
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
        // margin: 20,

    },
    title: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: '600',
    },
    button: {
        marginVertical: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#007AFF',
    },

})