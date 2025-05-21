import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
const LoginScreen = () => {
    const navigation = useNavigation();
    const handleRegister = () => {
        navigation.navigate("SignUp")
    }
    return (
        <View style={styles.container}>
            {/* <Text>LoginScreen</Text> */}
            <View style={styles.topImageContainer}>
                {/* <Image source={require("../screen/assests/")} style={styles.topImage}/> */}
            </View>
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Hello</Text>
            </View>
            <View>
                <Text style={styles.signInText}>Sign in to your account</Text>
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome name={"user"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='Email' style={styles.textInput} />
            </View>
            <View style={styles.inputContainer}>
                <Fontisto name={"locked"} size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput placeholder='Password' style={styles.textInput} secureTextEntry={true} />

            </View>
            <Text style={styles.textForgot}>Forgot your Password?</Text>
            <View style={styles.signInBtnContainer}>
                <Text style={styles.singInText}>Sign In</Text>
                <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
                    <AntDesign name={"arrowright"} size={24} color="white" style={styles.inputIcon} />
                </LinearGradient>
            </View>
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.footerText}>Dont have an account? <Text style={styles.createText}>Create</Text></Text>
            </TouchableOpacity>

            <View style={styles.leftVectorContainer}>
                {/* <ImageBackground source={require("../screen/assests/")} style={styles.leftVectorImage}/> */}
            </View>
        </View>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop:50,
        position: "relative",
    },
    topImageContainer: {

    },
    topImage: {
        width: "100%",
        height: 130,
    },
    helloContainer: {
        // borderWidth: 1,
    },
    helloText: {

        textAlign: "center",
        fontSize: 70,
        fontWeight: "bold"
    },
    signInText: {

        textAlign: "center",
        fontSize: 18,
        // color:""
        marginBottom: 30,
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        color: "red",
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 20,
        alignItems: "center",
        height: 50,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    inputIcon: {
        marginLeft: 14,
    },
    textForgot: {
        textAlign: "right",
        color: "#BEBEBE",
        // marginRight:20,
        width: "90%",
        fontSize: 15,
    },
    signInBtnContainer: {
        flexDirection: "row",
        marginTop: 120,
        width: "90%",
        justifyContent: "flex-end",

    },
    color: "#262626",
    singInText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    linearGradient: {
        height: 34,
        width: 56,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    footerText: {
        color: "black",
        textAlign: "center",
        fontSize: 18,
        marginTop: 120,
    },
    createText: {
        textDecorationLine: "underline"
    },
    leftVectorContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,

    },
    leftVectorImage: {
        height: 250,
        width: 100,
    }
})